import type { ReactNode } from 'react'

import { EncyclopediaNav } from '../_components/EncyclopediaNav'
import { PageTransition } from '../_components/PageTransition'

export default function EncyclopediaAppLayout(props: { children: ReactNode }) {
  return (
    <>
      <EncyclopediaNav />
      <PageTransition>{props.children}</PageTransition>
    </>
  )
}
