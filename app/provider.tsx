'use client'

import { AuthProvider } from '@saas-ui/auth'
import { SaasProvider } from '@saas-ui/react'

import theme from '#theme'
import { ChakraProvider, ThemeProvider } from '@chakra-ui/react'

export function Provider(props: { children: React.ReactNode }) {
  return (
    <SaasProvider theme={theme}>
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <AuthProvider>{props.children}</AuthProvider>
        </ThemeProvider>
      </ChakraProvider>
    </SaasProvider>
  )
}
