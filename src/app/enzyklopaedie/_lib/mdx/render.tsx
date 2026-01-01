import Link from 'next/link'
import * as React from 'react'

import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import { resolveWikilinkTargetToSlug } from '../content'
import { Callout } from '../../_components/Callout'
import { remarkEncyclopediaCallouts } from './remark-callouts'
import { remarkEncyclopediaWikilinks } from './remark-wikilinks'

function MdxLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string; children?: React.ReactNode },
) {
  const href = props.href ?? ''
  const className =
    'underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40'

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {props.children}
      </Link>
    )
  }

  return (
    <a
      {...props}
      href={href}
      className={className}
      target={props.target ?? '_blank'}
      rel={props.rel ?? 'noopener noreferrer'}
    />
  )
}

export async function renderEncyclopediaMdx(source: string, opts: { wikilinkMap: Map<string, string> }) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [
            remarkEncyclopediaWikilinks,
            {
              resolveHref(target: string) {
                const slug = resolveWikilinkTargetToSlug(target, opts.wikilinkMap)
                return `/enzyklopaedie/article/${slug}`
              },
            },
          ],
          remarkEncyclopediaCallouts,
        ],
      },
    },
    components: {
      Callout,
      a: MdxLink,
      h1: (p) => (
        <h1 className="mt-10 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl" {...p} />
      ),
      h2: (p) => (
        <h2 className="mt-10 font-display text-2xl tracking-[-0.02em] text-vellum-50 sm:text-3xl" {...p} />
      ),
      h3: (p) => <h3 className="mt-8 font-display text-xl text-vellum-50" {...p} />,
      p: (p) => <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base" {...p} />,
      ul: (p) => <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-vellum-200/80 sm:text-base" {...p} />,
      ol: (p) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-vellum-200/80 sm:text-base" {...p} />,
      li: (p) => <li className="leading-relaxed" {...p} />,
      hr: (p) => <hr className="my-8 border-white/10" {...p} />,
      blockquote: (p) => (
        <blockquote className="my-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-vellum-200/80" {...p} />
      ),
      strong: (p) => <strong className="font-semibold text-vellum-50/90" {...p} />,
      code: (p) => (
        <code
          className="rounded border border-white/10 bg-void-950/40 px-1.5 py-0.5 font-mono text-[0.9em] text-vellum-50/90"
          {...p}
        />
      ),
      pre: (p) => (
        <pre
          className="my-6 overflow-x-auto rounded-3xl border border-white/10 bg-void-950/40 p-4 text-sm text-vellum-50/90"
          {...p}
        />
      ),
    },
  })

  return content
}
