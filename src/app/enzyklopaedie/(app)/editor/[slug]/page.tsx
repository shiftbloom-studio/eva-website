import { ArticleEditor } from '../../../_components/ArticleEditor'
import { getEncyclopediaIndex } from '../../../_lib/content'
import { slugify } from '../../../_lib/content/slug'
import { requireEncyclopediaUser } from '../../../_lib/supabase/require-user'

export default async function EncyclopediaEditorSlugPage(props: {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ error?: string }>
}) {
  const { slug: rawSlug } = await props.params
  const slug = slugify(rawSlug)

  await requireEncyclopediaUser(`/enzyklopaedie/editor/${slug}`)

  const searchParams = await props.searchParams
  const error = searchParams?.error

  const index = await getEncyclopediaIndex()
  const wikilinkMapEntries = Array.from(index.wikilinkMap.entries())
  const article = index.bySlug.get(slug) ?? null

  return (
    <ArticleEditor
      nextPath={`/enzyklopaedie/editor/${slug}`}
      error={error}
      wikilinkMapEntries={wikilinkMapEntries}
      defaults={{
        source: article?.source ?? 'new',
        slug,
        title: article?.title ?? '',
        category: article?.category ?? 'misc',
        knowledgeType: article?.knowledgeType ?? 'mixed',
        tags: article?.tags ?? [],
        aliases: article?.aliases ?? [],
        related: article?.related ?? [],
        content: article?.content ?? '',
      }}
    />
  )
}
