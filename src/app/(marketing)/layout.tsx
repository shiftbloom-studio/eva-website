import { MarketingLayout } from '#components/layout'
import { Metadata } from 'next'

export default function Layout(props: { children: React.ReactNode }) {
  return <MarketingLayout>{props.children}</MarketingLayout>
}

export const metadata: Metadata = {
  title: {
    default: 'Erbe von Arda – Ein Zeitalter der Helden',
    template: '%s | Erbe von Arda',
  },
  description:
    'Tritt ein in die Legenden von Mittelerde. Erlebe ein Rollenspiel von ungeahnter Tiefe auf Deutschlands führendem Bannerlord-Server.',
  icons: {
    icon: '/static/favicons/favicon.ico',
  },
  openGraph: {
    title: 'Erbe von Arda – Ein Zeitalter der Helden',
    description:
      'Wo Schatten fallen und Hoffnung keimt, beginnt deine Reise. Schmiede dein Schicksal in einer lebendigen Welt voller Intrigen, Handel und epischer Schlachten. Das ultimative Mittelerde-Erlebnis erwartet dich.',
    url: 'https://www.erbe-von-arda.de',
    siteName: 'Erbe von Arda',
    images: [
      {
        url: '/static/marketing/hero-wide.webp',
        width: 1200,
        height: 630,
        alt: 'Erbe von Arda - Episches Rollenspiel in Mittelerde',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erbe von Arda – Ein Zeitalter der Helden',
    description:
      'Wo Schatten fallen und Hoffnung keimt, beginnt deine Reise. Das ultimative Mittelerde-Erlebnis erwartet dich.',
    images: ['/static/marketing/hero-wide.webp'],
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
