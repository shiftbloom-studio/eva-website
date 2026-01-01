import type { CategoryId } from './types'

export const CATEGORY_DEFS: Array<{
  id: CategoryId
  label: string
  description: string
}> = [
  {
    id: 'characters',
    label: 'Charaktere',
    description: 'Grenzgänger, Chronisten, Eidträger – die Gesichter der Geschichten.',
  },
  {
    id: 'locations',
    label: 'Orte',
    description: 'Küstenreiche, Grenzstädte, Sümpfe – Karten, die gern lügen.',
  },
  {
    id: 'factions',
    label: 'Fraktionen & Orden',
    description: 'Siegel, Banner, Bündnisse – und die Preise hinter den Namen.',
  },
  {
    id: 'items',
    label: 'Artefakte',
    description: 'Werkzeuge und Relikte – Magie, die bezeugt, nicht die tut.',
  },
  {
    id: 'events',
    label: 'Ereignisse',
    description: 'Belagerungen, Brüche, Chroniken – die Narben der Welt.',
  },
  {
    id: 'lore',
    label: 'Lore',
    description: 'Atem, Schwüre, Gesetze – die Regeln hinter dem Rauch.',
  },
  {
    id: 'timeline',
    label: 'Zeitleisten',
    description: 'Zeitalter, Jahre, Folgen – was wann zerbrach.',
  },
  {
    id: 'misc',
    label: 'Sonstiges',
    description: 'Randnotizen, Fragmente, ungelöste Verweise.',
  },
]

export function getCategoryDef(id: CategoryId) {
  return CATEGORY_DEFS.find((c) => c.id === id) ?? CATEGORY_DEFS.find((c) => c.id === 'misc')!
}
