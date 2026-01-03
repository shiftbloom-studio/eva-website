import { LogIn, LogOut, PenLine, ScrollText } from 'lucide-react'
import Link from 'next/link'

import { cn } from '#lib/cn'

import { encyclopediaLogout } from '../_actions/auth'
import { getOptionalEncyclopediaUser } from '../_lib/supabase/optional-user'

export async function EncyclopediaNav() {
  const publicMode = String(process.env.ENCYCLOPEDIA_PUBLIC ?? '').toLowerCase() === 'true'
  const user = await getOptionalEncyclopediaUser()
  const canEdit = Boolean(user)

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-void-950/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/enzyklopaedie" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sunbronze">
              <ScrollText className="h-5 w-5" strokeWidth={1.25} />
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Erbe von Arda</p>
              <p className="font-display text-lg tracking-[-0.02em] text-vellum-50">Enzyklopädie</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/enzyklopaedie"
              className={cn(
                'hidden items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90 sm:inline-flex',
                'transition hover:border-sunbronze/40 hover:shadow-glow-bronze',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
              )}
            >
              Hub
            </Link>

            {canEdit ? (
              <Link
                href="/enzyklopaedie/editor"
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90',
                  'transition hover:border-sunbronze/40 hover:shadow-glow-bronze',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                <PenLine className="h-4 w-4" strokeWidth={1.25} />
                Editor
              </Link>
            ) : null}

            {user ? (
              <form action={encyclopediaLogout}>
                <button
                  type="submit"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90',
                    'transition hover:border-bloodstone/40 hover:shadow-glow-blood',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloodstone/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                  )}
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.25} />
                  Logout
                </button>
              </form>
            ) : publicMode ? (
              <Link
                href="/enzyklopaedie/login"
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90',
                  'transition hover:border-sunbronze/40 hover:shadow-glow-bronze',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                <LogIn className="h-4 w-4" strokeWidth={1.25} />
                Login
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}
