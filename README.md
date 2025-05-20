# Erbe von Arda - Website

Eine moderne Next.js Website für das "Erbe von Arda" Mount & Blade 2: Bannerlord Rollenspiel im Mittelerde-Setting.

## Über das Projekt

"Erbe von Arda" ist ein umfassendes Rollenspiel-Erlebnis auf Basis von Mount & Blade 2: Bannerlord, das in der Welt von J.R.R. Tolkiens Mittelerde angesiedelt ist. Diese Website dient als Informations- und Anmeldeplattform für interessierte Spieler.

## Features der Website

- **Responsives Design**: Optimiert für Desktop und mobile Geräte
- **Marketing-Seiten**: Übersichtliche Darstellung der Spielfeatures
- **Authentifizierung**: Login- und Registrierungssystem
- **FAQ-Bereich**: Häufig gestellte Fragen zum Rollenspiel
- **Mehrere Themenbereiche**:
  - Wirtschaftssystem
  - Politik & Diplomatie
  - Kampf & Schlachten
  - Handwerk & Berufe

## Spielfeatures

- **Immersives Mittelerdegebiet**: Authentische Nachbildung von Mittelerde mit bekannten Orten
- **Völker und Kulturen**: Spielbare Völker wie Menschen, Elben, Zwerge und mehr
- **Handwerkssystem**: Verschiedene Handwerksberufe und Warenerstellung
- **Rollenspiel-Events**: Regelmäßige Events mit Spielleitern
- **Dynamisches Wirtschaftssystem**: Handel mit Angebot und Nachfrage
- **Politik & Diplomatie**: Verhandlungen, Allianzen und Intrigen

## Technologie

- **Frontend**: 
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
- **UI Frameworks**:
  - Chakra UI
  - Saas UI
  - Framer Motion
- **Authentifizierung**: @saas-ui/auth
- **Deployment**: Vercel/Netlify kompatibel

## Entwicklung

### Voraussetzungen

- Node.js (18.x oder höher)
- npm oder pnpm

### Installation

1. Repository klonen
   ```bash
   git clone [repository-url]
   cd eva-website
   ```

2. Abhängigkeiten installieren
   ```bash
   npm install
   # oder mit pnpm
   pnpm install
   ```

3. Entwicklungsserver starten
   ```bash
   npm run dev
   # oder
   pnpm dev
   ```

4. Browser öffnen unter [http://localhost:3000](http://localhost:3000)

### Projektstruktur

- `app/`: Next.js App Router mit Routing und Seitenkomponenten
  - `(auth)/`: Authentifizierungsseiten (Login/Signup)
  - `(marketing)/`: Marketing-/Landingpages
- `components/`: Wiederverwendbare UI-Komponenten
- `data/`: Konfigurationsdateien, Content und Daten
- `hooks/`: React Hooks
- `public/`: Statische Assets
- `theme/`: Chakra UI Theming und Styling

## Konfiguration

Die wichtigsten Konfigurationseinstellungen befinden sich in den Dateien im `/data` Verzeichnis:

- `config.tsx`: Allgemeine Website-Konfiguration
- `features.tsx`: Dargestellte Features
- `faq.tsx`: FAQ-Einträge
- `pillars.tsx`: Konzeptsäulen des Spiels
- `testimonials.tsx`: Spielerstimmen und Erfahrungsberichte

## Beitragen

Wenn du zum Projekt beitragen möchtest, erstelle bitte einen Fork des Repositories und reiche einen Pull Request ein.

## Kontakt

- **Discord**: [https://discord.gg/3EPrp4rw5k](https://discord.gg/3EPrp4rw5k)
- **E-Mail**: support@erbe-von-arda.de

## Lizenz

MIT

---

Entwickelt vom Team Erbe von Arda
