"use client"

import * as React from "react"

export interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  return <>{children}</>
}
