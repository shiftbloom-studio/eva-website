import { ArticleEditor } from '../../../_components/ArticleEditor'
import { getEncyclopediaIndex } from '../../../_lib/content'
import { requireEncyclopediaUser } from '../../../_lib/supabase/require-user'
import type { CategoryId } from '../../../_lib/content/types'

export default async function EncyclopediaEditorNewPage(props: {
  searchParams?: Promise<{ slug?: string; error?: string }>
}) {
  await requireEncyclopediaUser('/enzyklopaedie/editor/new')

  const searchParams = await props.searchParams
  const slug = searchParams?.slug?.trim() ?? ''
  const error = searchParams?.error

  const index = await getEncyclopediaIndex()
  const wikilinkMapEntries = Array.from(index.wikilinkMap.entries())

  return (
    <ArticleEditor
      nextPath="/enzyklopaedie/editor/new"
      error={error}
      wikilinkMapEntries={wikilinkMapEntries}
      defaults={{
        source: 'new',
        slug,
        title: '',
        category: 'misc' as CategoryId,
        knowledgeType: 'mixed',
        tags: [],
        aliases: [],
        related: [],
        content: '',
      }}
    />
  )
}
