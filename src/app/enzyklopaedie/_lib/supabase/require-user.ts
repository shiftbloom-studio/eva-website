import { redirect } from 'next/navigation'

import { createClient } from './server'

export async function requireEncyclopediaUser(nextPath: string) {
  let supabase
  try {
    supabase = await createClient()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Supabase ist nicht konfiguriert.'
    redirect(`/enzyklopaedie/login?error=${encodeURIComponent(message)}&next=${encodeURIComponent(nextPath)}`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/enzyklopaedie/login?next=${encodeURIComponent(nextPath)}`)
  }

  return user
}
