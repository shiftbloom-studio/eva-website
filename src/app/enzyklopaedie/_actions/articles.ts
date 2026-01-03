'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../_lib/supabase/server'
import { slugify } from '../_lib/content/slug'
import type { CategoryId, KnowledgeType } from '../_lib/content/types'
import { CATEGORY_DEFS } from '../_lib/content/categories'

function safeString(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value : ''
}

function splitList(value: string): string[] {
  return value
    .split(/[\n,]+/g)
    .map((v) => v.trim())
    .filter(Boolean)
}

function parseTags(value: string): string[] {
  const raw = splitList(value)
    .flatMap((v) => v.split(/\s+/g))
    .map((t) => t.trim().replace(/^#/, '').toLowerCase())
    .filter(Boolean)

  // Deduplicate while keeping order.
  const seen: Record<string, true> = {}
  const out: string[] = []
  for (let i = 0; i < raw.length; i += 1) {
    const t = raw[i]!
    if (seen[t]) continue
    seen[t] = true
    out.push(t)
  }
  return out
}

function isCategoryId(value: string): value is CategoryId {
  for (let i = 0; i < CATEGORY_DEFS.length; i += 1) {
    if (CATEGORY_DEFS[i]!.id === value) return true
  }
  return false
}

function normalizeCategory(value: string): CategoryId {
  return isCategoryId(value) ? value : 'misc'
}

function normalizeKnowledgeType(value: string): KnowledgeType {
  const raw = value.trim().toLowerCase()
  if (raw === 'ic' || raw === 'ooc' || raw === 'mixed') return raw
  return 'mixed'
}

export async function saveEncyclopediaArticle(formData: FormData) {
  const slugInput = safeString(formData.get('slug'))
  const titleInput = safeString(formData.get('title')).trim()
  const categoryInput = safeString(formData.get('category'))
  const knowledgeTypeInput = safeString(formData.get('knowledge_type'))
  const tagsInput = safeString(formData.get('tags'))
  const aliasesInput = safeString(formData.get('aliases'))
  const relatedInput = safeString(formData.get('related'))
  const contentInput = safeString(formData.get('content'))

  const next = safeString(formData.get('next')).trim() || '/enzyklopaedie'
  const slug = slugify(slugInput)

  if (!slug) {
    redirect(`/enzyklopaedie/editor/new?error=${encodeURIComponent('Slug fehlt oder ist ungültig.')}`)
  }

  const title = titleInput || slug
  const category = normalizeCategory(categoryInput)
  const knowledgeType = normalizeKnowledgeType(knowledgeTypeInput)
  const tags = parseTags(tagsInput)
  const aliases = splitList(aliasesInput)
  const related = splitList(relatedInput)
  const content = contentInput.trim()

  if (!content) {
    redirect(
      `/enzyklopaedie/editor/${encodeURIComponent(slug)}?error=${encodeURIComponent('Inhalt darf nicht leer sein.')}`,
    )
  }

  let supabase
  try {
    supabase = await createClient()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Supabase ist nicht konfiguriert.'
    redirect(`/enzyklopaedie/login?error=${encodeURIComponent(message)}&next=${encodeURIComponent(next)}`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/enzyklopaedie/login?next=${encodeURIComponent(next)}`)
  }

  const { error } = await supabase
    .from('encyclopedia_articles')
    .upsert(
      {
        slug,
        title,
        content,
        category,
        tags,
        aliases,
        related,
        knowledge_type: knowledgeType,
      },
      { onConflict: 'slug' },
    )

  if (error) {
    redirect(`/enzyklopaedie/editor/${encodeURIComponent(slug)}?error=${encodeURIComponent(error.message)}`)
  }

  // Ensure encyclopedia pages pick up the latest version.
  revalidatePath('/enzyklopaedie', 'layout')
  revalidatePath(`/enzyklopaedie/article/${slug}`)
  revalidatePath(`/enzyklopaedie/kategorie/${category}`)

  redirect(`/enzyklopaedie/article/${slug}?saved=1`)
}
