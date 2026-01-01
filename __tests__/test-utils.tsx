/* eslint-disable react/display-name */

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { render as rtlRender, type RenderOptions } from '@testing-library/react'
import * as React from 'react'
import { vi } from 'vitest'

// Mock audio context
const mockAudioLayerApi = {
  consent: 'unknown' as const,
  enabled: false,
  muted: false,
  volume: 0.85,
  gateOpen: false,
  openGate: vi.fn(),
  closeGate: vi.fn(),
  isScrollActive: false,
  enable: vi.fn(),
  deny: vi.fn(),
  disable: vi.fn(),
  setVolume: vi.fn(),
  setMuted: vi.fn(),
  playSfx: vi.fn(),
  playVoice: vi.fn(),
  stopAll: vi.fn(),
}

// Create a simple theme for Chakra
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

// Mock AudioLayerContext
const MockAudioLayerContext = React.createContext(mockAudioLayerApi)

// Mock provider component
function MockAudioProvider({ children }: { children: React.ReactNode }) {
  return (
    <MockAudioLayerContext.Provider value={mockAudioLayerApi}>
      {children}
    </MockAudioLayerContext.Provider>
  )
}

// Mock the useAudioLayer hook module
vi.mock('#lib/audio', () => ({
  useAudio: () => mockAudioLayerApi,
  useAudioLayer: () => mockAudioLayerApi,
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: React.forwardRef((props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => <div ref={ref} {...props} />),
      p: React.forwardRef((props: React.HTMLAttributes<HTMLParagraphElement>, ref: React.Ref<HTMLParagraphElement>) => <p ref={ref} {...props} />),
      a: React.forwardRef((props: React.AnchorHTMLAttributes<HTMLAnchorElement>, ref: React.Ref<HTMLAnchorElement>) => <a ref={ref} {...props} />),
      span: React.forwardRef((props: React.HTMLAttributes<HTMLSpanElement>, ref: React.Ref<HTMLSpanElement>) => <span ref={ref} {...props} />),
      section: React.forwardRef((props: React.HTMLAttributes<HTMLElement>, ref: React.Ref<HTMLElement>) => <section ref={ref} {...props} />),
      button: React.forwardRef((props: React.ButtonHTMLAttributes<HTMLButtonElement>, ref: React.Ref<HTMLButtonElement>) => <button ref={ref} {...props} />),
      create: () => React.forwardRef((props: React.HTMLAttributes<HTMLElement>, ref: React.Ref<HTMLElement>) => React.createElement('div', { ref, ...props })),
    },
    useMotionValue: () => ({
      set: vi.fn(),
      get: () => 0,
    }),
    useSpring: () => ({
      set: vi.fn(),
      get: () => 0,
    }),
    useReducedMotion: () => false,
    useInView: () => true,
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
    }),
  }
})

interface WrapperProps {
  children: React.ReactNode
}

function AllProviders({ children }: WrapperProps) {
  return (
    <ChakraProvider theme={theme}>
      <MockAudioProvider>{children}</MockAudioProvider>
    </ChakraProvider>
  )
}

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: AllProviders, ...options })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render, mockAudioLayerApi }
