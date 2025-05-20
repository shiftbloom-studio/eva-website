import { ThemeConfig } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import colors from './foundations/colors'
import { fontSizes } from './foundations/typography'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const customTheme = {
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

const theme = {
  ...baseTheme,
  ...customTheme,
  components: {
    ...baseTheme.components,
    ...customTheme.components,
  },
  styles: {
    ...baseTheme.styles,
    ...customTheme.styles,
    global: {
      ...(baseTheme.styles?.global || {}),
      ...(customTheme.styles?.global || {}),
      body: {
        ...(baseTheme.styles?.global?.body || {}),
        ...(customTheme.styles?.global?.body || {}),
      },
    },
  },
  colors: {
    ...baseTheme.colors,
    ...customTheme.colors,
  },
  fonts: {
    ...baseTheme.fonts,
    ...customTheme.fonts,
  },
  fontSizes: {
    ...baseTheme.fontSizes,
    ...customTheme.fontSizes,
  },
  shadows: {
    ...baseTheme.shadows,
    ...customTheme.shadows,
  },
  config: {
    ...baseTheme.config,
    ...customTheme.config,
  }
};

export default theme
