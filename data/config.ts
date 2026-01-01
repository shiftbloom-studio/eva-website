export interface SiteNavLink {
  id: string
  label: string
  href: string
}

export interface SiteConfig {
  seo: {
    title: string
    description: string
  }
  header: {
    links: SiteNavLink[]
  }
  footer: {
    copyright: string
    links: Array<{
      id: string
      label: string
      href: string
    }>
  }
  signup: {
    title: string
    features: Array<{
      title: string
      description: string
    }>
  }
  logo: unknown
  termsUrl: string
  privacyUrl: string
}

const siteConfig: SiteConfig = {
  seo: {
    title: 'Erbe von Arda',
    description: 'Ein Mount & Blade 2: Bannerlord Rollenspiel-Server in der Welt von Arda',
  },
  header: {
    links: [
      { id: 'lore', label: 'Lore', href: '#lore' },
      { id: 'status', label: 'Status', href: '#status' },
      { id: 'bento', label: 'Einstieg', href: '#bento' },
      { id: 'systeme', label: 'Systeme', href: '#systeme' },
      { id: 'stimmen', label: 'Stimmen', href: '#stimmen' },
      { id: 'faq', label: 'FAQ', href: '#faq' },
    ],
  },
  footer: {
    copyright: '© Erbe von Arda',
    links: [
      { id: 'impressum', label: 'Impressum', href: '/impressum' },
      { id: 'datenschutz', label: 'Datenschutz', href: '/datenschutz' },
      { id: 'barrierefreiheit', label: 'Barrierefreiheit', href: '/barrierefreiheit' },
    ],
  },
  signup: {
    title: 'Discord beitreten',
    features: [
      {
        title: 'Whitelist & Einstieg',
        description: 'Kurze Regeln, klare Rollen – dann geht’s los.',
      },
      {
        title: 'RP-first',
        description: 'Geschichten, Intrigen und Events stehen im Vordergrund.',
      },
      {
        title: 'Community',
        description: 'Bau mit: Feedback, Systeme, Lore – gemeinsam.',
      },
    ],
  },
  logo: { text: 'Erbe von Arda' },
  termsUrl: '/impressum',
  privacyUrl: '/datenschutz',
}

export default siteConfig

