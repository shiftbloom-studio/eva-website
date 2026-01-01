export interface SystemItem {
  id: 'wirtschaft' | 'politik' | 'krieg' | 'rollenspiel'
  eyebrow: string
  title: string
  description: string
  detail?: string
}

export const systems: SystemItem[] = [
  {
    id: 'wirtschaft',
    eyebrow: 'Wirtschaft',
    title: 'Wirtschaft, die atmet',
    description:
      'Kein NPC-Goldregen. Keine toten Menüs. Waren entstehen aus Händen – und Preise aus Knappheit.',
    detail:
      'Alles, was du kaufst, wurde hergestellt, gesammelt oder erbeutet. Knappheit ist real – und Karawanen sind Ziele. Werkzeuge, Berufe, Spezialisierung: Wer besser schmiedet, besser handelt, besser plant, prägt die Welt. Gilden entstehen, zerbrechen – und schreiben Geschichte.',
  },
  {
    id: 'politik',
    eyebrow: 'Politik',
    title: 'Räte, Eide, Intrigen',
    description:
      'Diplomatie ist keine Deko. Verträge werden verhandelt – und gebrochen. Allianzen sind Werkzeuge, keine Versprechen.'
  },
  {
    id: 'krieg',
    eyebrow: 'Krieg',
    title: 'Krieg ist Taktik',
    description:
      'Bannerlord bleibt Bannerlord: Timing, Positionierung, Disziplin. Sieg ist Formation, nicht Ausrüstung.',
    detail:
      'Schlachten haben Phasen. Befestigungen, Nachschub, Moral. Kämpfe sind nicht “Content” – sie brauchen Gründe, Worte, Eide. Du kannst Schild an Schild stehen – oder als Hauptmann die Linie halten. Und jede Schlacht verändert Grenzen.',
  },
  {
    id: 'rollenspiel',
    eyebrow: 'Rollenspiel',
    title: 'Rollenspiel, das trägt',
    description:
      'Keine vorgefertigte Story. Keine “Multiple Endings”. Nur Entscheidungen – und Menschen, die sich erinnern.',
    detail:
      'Eine Quest kann man wiederholen. Ein Schwur nicht. In Tavernen, Audienzen, auf Straßen und an Lagerfeuern entsteht eine Geschichte, die niemand geplant hat – weil ihr sie schreibt. Lore-nah, doch offen für deinen Klang: solange du ihn mit Taten trägst.',
  },
]
