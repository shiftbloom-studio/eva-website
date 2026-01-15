"use client"

import { evaSystem } from "#lib/chakra-system"
import { ChakraProvider } from "@chakra-ui/react"
import {
    ColorModeProvider,
    type ColorModeProviderProps,
} from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={evaSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
