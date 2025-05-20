import { Link } from '@chakra-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'Erbe von Arda',
    description: 'Mount & Blade 2 Bannerlord Multiplayer Rollenspiel Mod im Herr der Ringe Setting',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'features',
        label: 'Features',
      },
      {
        id: 'pillars',
        label: 'Konzept',
      },
      {
        id: 'wirtschaft',
        label: 'Wirtschaft',
      },
      {
        id: 'politik',
        label: 'Politik',
      },
      {
        id: 'kampf',
        label: 'Kampf',
      },
      {
        id: 'faq',
        label: 'FAQ',
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
        href: 'mailto:kontakt@erbevonarda.de',
        label: 'Kontakt',
      },
      {
        href: 'https://discord.gg/erbevonarda',
        label: <FaDiscord size="14" />,
      },
      {
        href: 'https://github.com/erbevonarda',
        label: <FaGithub size="14" />,
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
