'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

import { cn } from '#lib/cn'

export interface SearchBarProps {
  className?: string
  placeholder?: string
  autoFocus?: boolean
  param?: string
  debounceMs?: number
}

export function SearchBar({
  className,
  placeholder = 'Suchen…',
  autoFocus,
  param = 'q',
  debounceMs = 250,
}: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const current = searchParams.get(param) ?? ''
  const [value, setValue] = React.useState(current)

  React.useEffect(() => {
    setValue(current)
  }, [current])

  React.useEffect(() => {
    if (value === current) return
    const id = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString())
      const trimmed = value.trim()
      if (trimmed) next.set(param, trimmed)
      else next.delete(param)

      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname)
    }, debounceMs)

    return () => window.clearTimeout(id)
  }, [current, debounceMs, param, pathname, router, searchParams, value])

  return (
    <div
      className={cn(
        'relative flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_16px_60px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      <Search className="h-4 w-4 text-vellum-200/55" strokeWidth={1.5} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-transparent text-sm text-vellum-50 placeholder:text-vellum-200/40 focus:outline-none"
        aria-label="Suche"
      />
    </div>
  )
}
