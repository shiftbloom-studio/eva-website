import { FiArrowRight } from 'react-icons/fi'
import { GiAnvil, GiCrossedSwords, GiScrollUnfurled, GiCrown } from 'react-icons/gi'
import Image from 'next/image'

export default {
    title: 'Features',
    description: 'Erbe von Arda bietet ein umfassendes Rollenspiel-Erlebnis auf Basis von Mount & Blade 2: Bannerlord',
    features: [
        {
            title: 'Immersives Mittelerdegebiet',
            description:
                'Erkunde eine authentische Nachbildung von Tolkiens Welt mit bekannten Orten aus den Büchern und Filmen.',
            icon: GiScrollUnfurled,
        },
        {
            title: 'Völker und Kulturen',
            description:
                'Wähle zwischen verschiedenen Völkern wie Menschen, Elben, Zwergen und mehr - jedes mit einzigartigen Fähigkeiten.',
            icon: GiCrown,
        },
        {
            title: 'Handwerkssystem',
            description:
                'Erlerne verschiedene Handwerksberufe und stelle wertvolle Waren für den Handel oder Kampf her.',
            icon: GiAnvil,
        },
        {
            title: 'Rollenspiel-Events',
            description:
                'Nimm an regelmäßigen Events teil, die von erfahrenen Spielleitern geleitet werden und die Geschichte vorantreiben.',
            icon: GiCrossedSwords,
        },
        {
            title: 'Einzigartige Geschichte',
            description:
                'Erlebe eine einzigartige Geschichte, die von erfahrenen Spielleitern geleitet wird und die Geschichte vorantreibt.',
            icon: GiScrollUnfurled,
        },
        {
            title: 'Und vieles mehr',
            description:
                'Entdecke alle Aspekte unseres einzigartigen Rollenspiels basierend auf Mount & Blade 2: Bannerlord.',
            icon: FiArrowRight,
        },
    ]
} 