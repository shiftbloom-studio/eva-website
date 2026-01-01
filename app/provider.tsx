'use client'

import * as React from 'react'

import { CakeProvider, useCake } from '#components/birthday-cake'

const RichProvider = React.lazy(async () => {
  const mod = await import('./provider.rich')
  return { default: mod.RichProvider }
})

function ProviderBody(props: { children: React.ReactNode }) {
  const { profile } = useCake()

  const wantsRich = profile.tier === 'rich' || profile.tier === 'ultra'

  if (!wantsRich) return props.children

  // Keep the baseline content visible while the rich layer downloads, then upgrade in-place.
  return (
    <React.Suspense fallback={props.children}>
      <RichProvider>{props.children}</RichProvider>
    </React.Suspense>
  )
}

export function Provider(props: { children: React.ReactNode }) {
  return (
    <CakeProvider>
      <ProviderBody>{props.children}</ProviderBody>
    </CakeProvider>
  )
}
