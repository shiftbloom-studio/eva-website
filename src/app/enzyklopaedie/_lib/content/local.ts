import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'

import { normalizeLookupKey, slugify } from './slug'
import type { ArticleRecord, CategoryId, EncyclopediaIndex, KnowledgeType } from './types'

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')

const EXTENSIONS = new Set(['.md', '.mdx'])

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

function categoryFromRelativePath(relPath: string): CategoryId {
  const parts = relPath.split(/[\\/]/g).filter(Boolean)
  const dir = (parts[0] ?? '').toLowerCase()
  if (dir === 'characters') return 'characters'
  if (dir === 'locations') return 'locations'
  if (dir === 'factions') return 'factions'
  if (dir === 'items') return 'items'
  if (dir === 'events') return 'events'
  if (dir === 'lore') return 'lore'
  if (dir === 'timeline') return 'timeline'
  return 'misc'
}

function makeExcerpt(markdown: string, maxLen = 180): string {
  const text = markdown
    // Strip fenced code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Strip inline code
    .replace(/`[^`]*`/g, '')
    // Replace wikilinks with their label/target
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target: string, label?: string) => {
      return String(label ?? target)
    })
    // Remove markdown noise
    .replace(/[*_>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLen) return text
  return `${text.slice(0, maxLen - 1).trim()}…`
}

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(abs)))
      continue
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (EXTENSIONS.has(ext)) files.push(abs)
  }

  return files
}

export async function loadLocalEncyclopediaIndex(): Promise<EncyclopediaIndex> {
  const files = await walk(CONTENT_ROOT)
  const articles: ArticleRecord[] = []

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf8')
    const parsed = matter(raw)

    const rel = path.relative(CONTENT_ROOT, filePath)
    const fileStem = path.basename(filePath, path.extname(filePath))
    const data = parsed.data as Record<string, unknown>

    const slug = slugify(isTruthyString(data.slug) ? data.slug : fileStem)
    const title = isTruthyString(data.title) ? data.title : fileStem

    const fmTags = normalizeTags(data.tags)
    const inlineTags = extractInlineTags(parsed.content)
    const tags = Array.from(new Set([...fmTags, ...inlineTags]))

    const aliases = normalizeStringArray(data.aliases)
    const related = normalizeStringArray(data.related)
    const knowledgeType = normalizeKnowledgeType((data as any).knowledge_type)
    const category = categoryFromRelativePath(rel)

    articles.push({
      slug,
      title,
      tags,
      aliases,
      related,
      knowledgeType,
      category,
      source: 'local',
      content: parsed.content.trim(),
      excerpt: makeExcerpt(parsed.content),
      filePath,
    })
  }

  // Stable order: title asc
  articles.sort((a, b) => a.title.localeCompare(b.title, 'de'))

  const bySlug = new Map<string, ArticleRecord>()
  const wikilinkMap = new Map<string, string>()
  const tagCounts = new Map<string, number>()

  for (const article of articles) {
    bySlug.set(article.slug, article)

    // Link resolution keys: slug, title, aliases (slugified)
    wikilinkMap.set(normalizeLookupKey(article.slug), article.slug)
    wikilinkMap.set(normalizeLookupKey(article.title), article.slug)
    for (const alias of article.aliases) {
      wikilinkMap.set(normalizeLookupKey(alias), article.slug)
    }

    for (const tag of article.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }

  return {
    articles,
    bySlug,
    wikilinkMap,
    tags: tagCounts,
  }
}
