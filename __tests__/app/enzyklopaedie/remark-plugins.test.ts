import { describe, expect, test } from 'vitest'

import { remarkEncyclopediaCallouts } from '../../../src/app/enzyklopaedie/_lib/mdx/remark-callouts'
import { remarkEncyclopediaWikilinks } from '../../../src/app/enzyklopaedie/_lib/mdx/remark-wikilinks'

// Note: These tests operate directly on minimal mdast-like trees.

describe('remarkEncyclopediaCallouts', () => {
  test('transforms callout blockquotes into Callout nodes', () => {
    const tree: any = {
      type: 'root',
      children: [
        {
          type: 'blockquote',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: '[!INFO] Hintergründe' }],
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', value: 'Dies ist eine Info.' }],
            },
          ],
        },
      ],
    }

    const plugin = remarkEncyclopediaCallouts()
    plugin(tree)

    const node = tree.children[0]
    expect(node.type).toBe('mdxJsxFlowElement')
    expect(node.name).toBe('Callout')
    expect(node.attributes).toEqual(
      expect.arrayContaining([
        { type: 'mdxJsxAttribute', name: 'type', value: 'info' },
        { type: 'mdxJsxAttribute', name: 'title', value: 'Hintergründe' },
      ]),
    )
  })

  test('maps note to info and preserves non-callouts', () => {
    const noteTree: any = {
      type: 'root',
      children: [
        {
          type: 'blockquote',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: '[!NOTE]' }],
            },
          ],
        },
      ],
    }

    const plugin = remarkEncyclopediaCallouts()
    plugin(noteTree)

    const noteNode = noteTree.children[0]
    expect(noteNode.type).toBe('mdxJsxFlowElement')
    expect(noteNode.attributes).toEqual(
      expect.arrayContaining([{ type: 'mdxJsxAttribute', name: 'type', value: 'info' }]),
    )

    const unsupportedTree: any = {
      type: 'root',
      children: [
        {
          type: 'blockquote',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: '[!UNKNOWN] Test' }],
            },
          ],
        },
      ],
    }

    plugin(unsupportedTree)

    expect(unsupportedTree.children[0].type).toBe('blockquote')
  })
})

describe('remarkEncyclopediaWikilinks', () => {
  test('converts wikilinks into link nodes', () => {
    const tree: any = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'Siehe [[Gondor|das Reich]] und [[Rohan]].' },
          ],
        },
      ],
    }

    const plugin = remarkEncyclopediaWikilinks({
      resolveHref: (target) => `/wiki/${target.toLowerCase()}`,
    })

    plugin(tree)

    const paragraph = tree.children[0]
    const links = paragraph.children.filter((child: any) => child.type === 'link')

    expect(links).toHaveLength(2)
    expect(links[0].url).toBe('/wiki/gondor')
    expect(links[0].children[0].value).toBe('das Reich')
    expect(links[1].url).toBe('/wiki/rohan')
    expect(links[1].children[0].value).toBe('Rohan')
  })

  test('does not transform wikilinks inside existing links', () => {
    const tree: any = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'link',
              url: '/wiki/ignore',
              children: [{ type: 'text', value: '[[Ignore]]' }],
            },
          ],
        },
      ],
    }

    const plugin = remarkEncyclopediaWikilinks({
      resolveHref: (target) => `/wiki/${target.toLowerCase()}`,
    })

    plugin(tree)

    const paragraph = tree.children[0]
    expect(paragraph.children[0].type).toBe('link')
    expect(paragraph.children[0].children[0].value).toBe('[[Ignore]]')
  })
})
