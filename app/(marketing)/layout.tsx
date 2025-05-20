import { MarketingLayout } from '#components/layout'
import { Metadata } from 'next'

export default function Layout(props: { children: React.ReactNode }) {
  return <MarketingLayout>{props.children}</MarketingLayout>
}

export const metadata: Metadata = {
  title: 'Erbe von Arda',
  description: 'Ein Mount & Blade 2: Bannerlord Rollenspiel-Server in der Welt von Arda',
  icons: {
    icon: '/static/favicons/favicon.ico',
  },
  openGraph: {
    title: 'Erbe von Arda',
    description: 'Ein Mount & Blade 2: Bannerlord Rollenspiel-Server in der Welt von Arda',
    images: '/static/images/eva-logo-wide-bg.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erbe von Arda',
    description: 'Ein Mount & Blade 2: Bannerlord Rollenspiel-Server in der Welt von Arda',
    images: '/static/images/eva-logo-wide-bg.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.erbe-von-arda.de',
  },
  metadataBase: new URL('https://www.erbe-von-arda.de'),
}
