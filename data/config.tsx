import { Link } from '@chakra-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'Erbe von Arda',
    description: 'Mount & Blade 2 Bannerlord Rollenspiel im Mittelerde Setting',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'features',
        label: 'Features',
        href: '/#features',
      },
      {
        id: 'pillars',
        label: 'Konzept',
        href: '/#pillars',
      },
      {
        id: 'wirtschaft',
        label: 'Wirtschaft',
        href: '/#wirtschaft',
      },
      {
        id: 'politik',
        label: 'Politik',
        href: '/#politik',
      },
      {
        id: 'kampf',
        label: 'Kampf',
        href: '/#kampf',
      },
      {
        id: 'faq',
        label: 'FAQ',
        href: '/#faq',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Entwickelt von{' '}
        <Link href="#">Team Erbe von Arda</Link>
      </>
    ),
    links: [
      {
        href: 'mailto:support@erbe-von-arda.de',
        label: 'Kontakt',
      },
      {
        id: 'impressum',
        label: 'Impressum',
        href: '#',
      },
      {
        id: 'datenschutz',
        label: 'Datenschutz',
        href: '#',
      },
      {
        href: 'https://discord.gg/3EPrp4rw5k',
        label: <FaDiscord size="14" />,
      },
    ],
  },
  signup: {
    title: 'Jetzt Teil von Erbe von Arda werden',
    features: [
      {
        icon: null,
        title: 'Wirtschaft',
        description: 'Dynamisches Marktsystem mit Angebot und Nachfrage.',
      },
      {
        icon: null,
        title: 'Konflikte & Schlachten',
        description:
          'Spannende PvP-Kämpfe mit strategischen Elementen und Fraktionskriegen.',
      },
      {
        icon: null,
        title: 'Politik & Diplomatie',
        description:
          'Verhandlungen führen, Allianzen schmieden und Intrigen spinnen.',
      },
      {
        icon: null,
        title: 'Rollenspiel',
        description:
          'Tiefgründiges Rollenspiel-Erlebnis in der Welt von Mount & Blade 2: Bannerlord.',
      },
    ],
  },
}

export default siteConfig
