export type KnowledgeType = 'ic' | 'ooc' | 'mixed'

export type ArticleSource = 'local' | 'supabase'

export type CategoryId = 'characters' | 'locations' | 'factions' | 'items' | 'events' | 'lore' | 'timeline' | 'misc'

export interface ArticleMeta {
  title: string
  tags: string[]
  aliases: string[]
  related: string[]
  knowledgeType: KnowledgeType
  category: CategoryId
}

export interface ArticleRecord extends ArticleMeta {
  slug: string
  source: ArticleSource
  content: string
  excerpt: string
  filePath?: string
}

export interface EncyclopediaIndex {
  articles: ArticleRecord[]
  bySlug: Map<string, ArticleRecord>
  wikilinkMap: Map<string, string>
  tags: Map<string, number>
}
