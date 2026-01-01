import type { KnowledgeType } from '../_lib/content/types'

export function KnowledgeBadge(props: { type: KnowledgeType }) {
  const label = props.type === 'ic' ? 'IC' : props.type === 'ooc' ? 'OOC' : 'IC/OOC'

  const className =
    props.type === 'ic'
      ? 'border-moss-300/25 bg-moss-900/20 text-moss-200'
      : props.type === 'ooc'
        ? 'border-sunbronze/25 bg-sunbronze/10 text-sunbronze'
        : 'border-white/10 bg-white/[0.03] text-vellum-200/80'

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${className}`}>
      {label}
    </span>
  )
}
