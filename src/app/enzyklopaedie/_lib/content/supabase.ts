import matter from 'gray-matter'

import { createClient } from '../supabase/server'
import { slugify } from './slug'
import type { ArticleRecord, CategoryId, KnowledgeType } from './types'

function isTruthyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeStringArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.map(String).map((v) => v.trim()).filter(Boolean)
  if (isTruthyString(value)) return [value.trim()]
  return []
}

function normalizeTags(value: unknown): string[] {
  return normalizeStringArray(value)
    .flatMap((entry) => entry.split(','))
    .map((t) => t.trim().replace(/^#/, '').toLowerCase())
    .filter(Boolean)
}

function extractInlineTags(markdown: string): string[] {
  const tags = new Set<string>()
  const re = /(^|\s)#([a-zA-Z][\w-]*)/g
  let match: RegExpExecArray | null
  while ((match = re.exec(markdown)) !== null) {
    const tag = match[2]?.toLowerCase()
    if (tag) tags.add(tag)
  }
  return Array.from(tags)
}

function normalizeKnowledgeType(value: unknown): KnowledgeType {
  const raw = String(value ?? '').trim().toLowerCase()
  if (raw === 'ic' || raw === 'ooc' || raw === 'mixed') return raw
  return 'mixed'
}

function normalizeCategory(value: unknown): CategoryId {
  const raw = String(value ?? '').trim().toLowerCase()
  if (
    raw === 'characters' ||
    raw === 'locations' ||
    raw === 'factions' ||
    raw === 'items' ||
    raw === 'events' ||
    raw === 'lore' ||
    raw === 'timeline' ||
    raw === 'misc'
  ) {
    return raw
  }
  return 'misc'
}

function makeExcerpt(markdown: string, maxLen = 180): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target: string, label?: string) => String(label ?? target))
    .replace(/[*_>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLen) return text
  return `${text.slice(0, maxLen - 1).trim()}…`
}

export async function loadSupabaseArticles(): Promise<ArticleRecord[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('encyclopedia_articles')
    .select('slug,title,content,category,tags,aliases,related,knowledge_type')

  if (error || !data) return []

  return (data as any[]).map((row) => {
    const rawSlug = isTruthyString(row.slug) ? row.slug : ''
    const slug = slugify(rawSlug)

    const rawContent = isTruthyString(row.content) ? row.content : ''
    const parsed = matter(rawContent)

    const title = isTruthyString(row.title) ? row.title : isTruthyString(parsed.data?.title) ? String(parsed.data.title) : slug

    const tags = Array.from(new Set([...normalizeTags(row.tags), ...extractInlineTags(parsed.content)])).filter(Boolean)
    const aliases = normalizeStringArray(row.aliases)
    const related = normalizeStringArray(row.related)
    const knowledgeType = normalizeKnowledgeType(row.knowledge_type ?? (parsed.data as any)?.knowledge_type)
    const category = normalizeCategory(row.category)

    return {
      slug,
      title,
      tags,
      aliases,
      related,
      knowledgeType,
      category,
      source: 'supabase' as const,
      content: parsed.content.trim(),
      excerpt: makeExcerpt(parsed.content),
    }
  })
}
