import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import colors from './foundations/colors'
import { fontSizes } from './foundations/typography'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const customTheme = {
  ...baseTheme,
  config,
  colors,
  components,
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  fontSizes,
  shadows: {
    outline: '0 0 0 3px var(--chakra-colors-primary-300)',
  },
}

const theme = extendTheme(customTheme)

export default theme
