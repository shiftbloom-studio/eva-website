export interface TestimonialItem {
  id: string
  name: string
  role: string
  from: string
  story: string[]
}

export const testimonials: TestimonialItem[] = [
  {
    id: 'eira-falkenwind',
    name: 'Eira Falkenwind',
    role: 'Händlerin & Karawanenführerin',
    from: 'Aus dem Reisetagebuch der Falkenwind‑Karawane',
    story: [
      'Wenn die Räder im Schlamm stecken, zählt kein Ruhm – nur Ruhe im Blick und ein Plan im Kopf. Ich habe gelernt: Eine Route ist keine „Farm“. Sie ist ein Versprechen. Und jedes Versprechen hat seinen Preis.',
      'Heute haben wir Zoll gezahlt, um schneller durchzukommen. Morgen verhandeln wir mit einem Haus, das unsere Fässer zu billig findet. Und in der Nacht? Da hörst du Wölfe – oder Männer, die sich wie Wölfe bewegen.',
      'Aber wenn die Tore sich öffnen und der Markt den Atem anhält, weißt du: Du hast es nicht bekommen. Du hast es dir genommen.',
    ],
  },
  {
    id: 'caelan-von-hartholz',
    name: 'Sir Caelan von Hartholz',
    role: 'Ratsmann eines Grenzfürsten',
    from: 'Briefentwurf, nie abgeschickt',
    story: [
      'Manchmal ist das gefährlichste Schwert ein Satz, sauber formuliert und kalt versiegelt. Ich sitze zwischen zwei Bannern, die beide behaupten, sie wollten Frieden – und beide meinen damit: Sieg.',
      'Ein Handel kann eine Grenze verschieben. Ein Versprechen kann eine Armee stoppen. Und ein Blick im Ratssaal reicht, um zu wissen, wer morgen „zufällig“ die falsche Tür offen lässt.',
      'Hier gewinnt nicht, wer am lautesten ist. Sondern wer die Folgen zuerst sieht – und sie trotzdem wählt.',
    ],
  },
  {
    id: 'run-schildtraeger',
    name: 'Rûn der Schildträger',
    role: 'Hauptmann einer Freischar',
    from: 'Am Feuer nach der Schlacht',
    story: [
      'Der Klang von Stahl ist nie so klar wie in den Sekunden davor. Dann bricht die Linie, ein Mann schreit deinen Namen, und du verstehst: Mut ist oft nur die Entscheidung, nicht wegzusehen.',
      'Wir haben zurückgesetzt. Nicht weil wir feige waren – sondern weil wir leben wollten, um morgen wieder zu stehen. Ein Sieg, der dich auslöscht, ist nur ein anderes Wort für Niederlage.',
      'Und wenn die Schlacht vorbei ist, bleiben Geschichten. Manche werden gesungen. Andere tragen wir still in die Nacht.',
    ],
  },
]
