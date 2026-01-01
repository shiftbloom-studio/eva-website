import { visit } from 'unist-util-visit'

const WIKILINK_RE = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g

type ResolveHref = (target: string) => string

export function remarkEncyclopediaWikilinks(options: { resolveHref: ResolveHref }) {
  return (tree: any) => {
    visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (!parent || typeof index !== 'number') return
      if (parent.type === 'link') return

      const value = String(node.value ?? '')
      if (!value.includes('[[')) return

      const parts: any[] = []
      let last = 0

      // Reset global regex cursor for each node.
      WIKILINK_RE.lastIndex = 0
      let match: RegExpExecArray | null
      while ((match = WIKILINK_RE.exec(value)) !== null) {
        const start = (match as any).index ?? 0
        const raw = match[0] ?? ''
        const target = String(match[1] ?? '').trim()
        const label = String(match[2] ?? target).trim()

        if (start > last) {
          parts.push({ type: 'text', value: value.slice(last, start) })
        }

        if (!target) {
          parts.push({ type: 'text', value: raw })
        } else {
          parts.push({
            type: 'link',
            url: options.resolveHref(target),
            children: [{ type: 'text', value: label }],
          })
        }

        last = start + raw.length
      }

      if (last < value.length) {
        parts.push({ type: 'text', value: value.slice(last) })
      }

      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts)
      }
    })
  }
}
