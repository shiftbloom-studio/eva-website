import Link from 'next/link'

import { cn } from '#lib/cn'

export interface TagCloudProps {
  basePath: string
  tags: Array<{ tag: string; count: number }>
  selectedTag?: string
  q?: string
}

export function TagCloud({ basePath, tags, selectedTag, q }: TagCloudProps) {
  const selected = selectedTag?.trim().replace(/^#/, '').toLowerCase() ?? ''

  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => {
        const isActive = selected && tag === selected
        const params = new URLSearchParams()
        if (q) params.set('q', q)
        if (!isActive) params.set('tag', tag)

        const href = params.toString() ? `${basePath}?${params.toString()}` : basePath

        return (
          <Link
            key={tag}
            href={href}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
              isActive
                ? 'border-sunbronze/35 bg-sunbronze/12 text-vellum-50'
                : 'border-white/10 bg-white/[0.03] text-vellum-200/75 hover:border-sunbronze/25 hover:text-vellum-50',
            )}
          >
            <span>#{tag}</span>
            <span className={cn('text-[10px]', isActive ? 'text-vellum-50/80' : 'text-vellum-200/45')}>
              {count}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
