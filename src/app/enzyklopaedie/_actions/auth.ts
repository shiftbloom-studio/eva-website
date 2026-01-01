'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../_lib/supabase/server'

function safeString(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value : ''
}

export async function encyclopediaLogin(formData: FormData) {
  const email = safeString(formData.get('email')).trim()
  const password = safeString(formData.get('password'))
  const next = safeString(formData.get('next')).trim() || '/enzyklopaedie'

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(
      `/enzyklopaedie/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`,
    )
  }

  // Ensure server components re-render with the fresh session.
  revalidatePath('/enzyklopaedie', 'layout')
  redirect(next)
}

export async function encyclopediaLogout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/enzyklopaedie', 'layout')
  redirect('/enzyklopaedie/login')
}
