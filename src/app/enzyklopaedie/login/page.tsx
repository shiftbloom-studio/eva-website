import Link from 'next/link'

import { encyclopediaLogin } from '../_actions/auth'

export default async function EncyclopediaLoginPage(props: {
  searchParams?: Promise<{ error?: string; next?: string }>
}) {
  const searchParams = await props.searchParams
  const error = searchParams?.error
  const next = searchParams?.next ?? '/enzyklopaedie'

  const publicMode = String(process.env.ENCYCLOPEDIA_PUBLIC ?? '').toLowerCase() === 'true'
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  )

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 py-16">
      <div className="w-full">
        <div className="mx-auto max-w-md">
          <div className="rounded-4xl border border-white/10 bg-void-900/35 p-7 backdrop-blur-md sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">
                  Zugriff erforderlich
                </p>
                <h1 className="mt-3 font-display text-2xl tracking-[-0.02em] text-vellum-50">
                  Enzyklopädie von Arda
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-vellum-200/75">
                  Öffne das Buch der Schwüre. Melde dich an, um die Einträge zu lesen.
                </p>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sunbronze sm:inline-flex">
                {/* Decorative mark */}
                <span aria-hidden="true" className="text-lg">
                  ✦
                </span>
              </div>
            </div>

            {publicMode ? (
              <div className="mt-5 rounded-3xl border border-moss-300/20 bg-moss-900/20 p-4 text-sm text-vellum-200/80">
                Hinweis: <span className="font-medium text-vellum-50/90">ENCYCLOPEDIA_PUBLIC=true</span> ist aktiv —
                diese Enzyklopädie ist aktuell öffentlich lesbar. Du kannst dich trotzdem anmelden.
              </div>
            ) : null}

            {error ? (
              <div className="mt-5 rounded-3xl border border-bloodstone/30 bg-bloodstone/10 p-4 text-sm text-vellum-50/90">
                {error}
              </div>
            ) : null}

            {!supabaseConfigured ? (
              <div className="mt-5 rounded-3xl border border-bloodstone/30 bg-bloodstone/10 p-4 text-sm text-vellum-50/90">
                Supabase ist nicht konfiguriert. Lege <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL</span> und{' '}
                <span className="font-mono">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</span> in deiner{' '}
                <span className="font-mono">.env.local</span> an (siehe{' '}
                <span className="font-mono">docs/supabase-encyclopedia-setup.md</span>).
              </div>
            ) : null}

            <form className="mt-6 space-y-4">
              <input type="hidden" name="next" value={next} />

              <div>
                <label className="block text-xs font-medium text-vellum-200/70" htmlFor="email">
                  E-Mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 placeholder:text-vellum-200/40 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  placeholder="name@beispiel.de"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-vellum-200/70" htmlFor="password">
                  Passwort
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 placeholder:text-vellum-200/40 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  placeholder="••••••••"
                />
              </div>

              <button
                formAction={encyclopediaLogin}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sunbronze/30 bg-white/[0.03] px-4 py-3 text-sm font-medium text-vellum-50 shadow-glow-bronze transition hover:border-sunbronze/45 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
              >
                Öffnen <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-4 text-xs text-vellum-200/60">
              <Link
                href="/"
                className="underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
              >
                Zurück zur Website
              </Link>
              <Link
                href="/enzyklopaedie"
                className="underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
              >
                Zur Enzyklopädie
              </Link>
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-vellum-200/45">
            Hinweis: Inoffizielles Fanprojekt. Alle genannten Marken und Warenzeichen sind Eigentum ihrer jeweiligen Inhaber.
          </p>
        </div>
      </div>
    </main>
  )
}
