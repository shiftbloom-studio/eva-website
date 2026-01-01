import { visit } from 'unist-util-visit'

const CALLOUT_RE = /^\s*\[!\s*([a-zA-Z]+)\s*\]\s*(.*)$/

const SUPPORTED = new Set(['info', 'warning', 'lore', 'note', 'tip', 'important', 'caution'])

export function remarkEncyclopediaCallouts() {
  return (tree: any) => {
    visit(tree, 'blockquote', (node: any, index: number | undefined, parent: any) => {
      if (!parent || typeof index !== 'number') return

      const first = node.children?.[0]
      if (!first || first.type !== 'paragraph') return

      const firstText = first.children?.[0]
      if (!firstText || firstText.type !== 'text') return

      const m = String(firstText.value ?? '').match(CALLOUT_RE)
      if (!m) return

      const rawType = String(m[1] ?? '').toLowerCase()
      if (!SUPPORTED.has(rawType)) return

      const type = rawType === 'note' ? 'info' : rawType
      const title = String(m[2] ?? '').trim()

      const children = Array.isArray(node.children) ? node.children.slice(1) : []

      const calloutNode = {
        type: 'mdxJsxFlowElement',
        name: 'Callout',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'type', value: type },
          ...(title ? [{ type: 'mdxJsxAttribute', name: 'title', value: title }] : []),
        ],
        children,
      }

      parent.children.splice(index, 1, calloutNode)
    })
  }
}
