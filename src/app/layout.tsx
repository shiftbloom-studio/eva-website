import './globals.css'

import { Provider } from './provider'
import { Inter, Space_Grotesk } from 'next/font/google'

import { cn } from '#lib/cn'

const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      data-theme="dark"
      style={{ colorScheme: 'dark' }}
      className={cn('bg-void-950 text-vellum-50 antialiased', fontSans.variable, fontDisplay.variable)}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/manifest.json" />
      </head>
      <body className="min-h-[100svh]">
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
