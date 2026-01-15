'use client'

import * as React from 'react'

import { RichProvider } from './provider.rich'

export function Provider(props: { children: React.ReactNode }) {
  return <RichProvider>{props.children}</RichProvider>
}
