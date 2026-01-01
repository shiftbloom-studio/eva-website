import { MessageCircle, ScrollText, ServerCog } from 'lucide-react'

import { Reveal, RevealGroup, RevealGroupItem } from '#components/scroll'
import { BentoCard, BentoGrid } from '#components/ui/bento-grid'
import { marketingImages } from '#lib/marketing-images'

export interface BentoSectionProps {
  discordUrl?: string
}

export function BentoSection({ discordUrl = 'https://discord.gg/6B3WHTJaRA' }: BentoSectionProps) {
  return (
    <section id="bento" className="relative mx-auto max-w-7xl scroll-mt-28 px-6 pb-28 pt-10">
      <Reveal preset="rise-blur" amount={0.5}>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
            Der Pfad in die Legende
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base font-serif">
            Hinter den Mauern warten Intrigen, Handel und das Klirren von Stahl. Wähle deinen Einstieg in eine Welt,
            die niemals vergisst.
          </p>
        </div>
      </Reveal>

      <RevealGroup className="mt-10">
        <BentoGrid>
          <RevealGroupItem
            id="status"
            className="scroll-mt-28 md:col-span-7"
            data-eva-audio-autoplay=""
            data-eva-audio-voice="voice_server_status"
            data-eva-audio-sfx="sfx_forge_strike"
          >
            <BentoCard
              eyebrow="Server Status"
              title="Die Schmiede des Schicksals"
              description="Die Welt erwacht. Wir schmieden die Gesetze, härten den Stahl und bereiten den Boden für die ersten großen Häuser. Sei dabei, wenn das Fundament gelegt wird."
              icon={<ServerCog className="h-5 w-5 text-sunbronze" strokeWidth={1.5} />}
              image={marketingImages.cardFields}
              imageClassName="brightness-[1.05] contrast-[1.14] saturate-[1.06]"
              footer={
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-sunbronze/20 bg-sunbronze/10 px-3 py-1 text-xs text-vellum-100 shadow-[0_0_10px_rgba(186,138,45,0.1)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-sunbronze animate-pulse" />
                    In Entwicklung
                  </span>
                  <span className="text-xs text-vellum-200/60 font-medium">
                    Whitelist offen • RP-Eröffnung geplant: Q3 2026
                  </span>
                </div>
              }
            />
          </RevealGroupItem>

          <RevealGroupItem
            id="lore"
            className="scroll-mt-28 md:col-span-5"
            data-eva-audio-autoplay=""
            data-eva-audio-voice="voice_lore"
            data-eva-audio-sfx="sfx_parchment_open"
          >
            <BentoCard
              eyebrow="Lore & Geschichte"
              title="Chroniken der Alten Welt"
              description="Von den Nebeln des Nordens bis zu den goldenen Feldern des Südens – jede Region atmet Geschichte. Lerne die alten Eide kennen, bevor du sie brichst."
              icon={<ScrollText className="h-5 w-5 text-bloodstone" strokeWidth={1.5} />}
              image={marketingImages.cardMarket}
              imageClassName="brightness-[1.08] contrast-[1.10] saturate-[1.05] sepia-[0.18]"
              footer={
                <p className="text-xs leading-relaxed text-vellum-200/60 italic font-serif">
                  „Wer die Geschichte nicht ehrt, wird von ihr verschlungen.“
                </p>
              }
            />
          </RevealGroupItem>

          <RevealGroupItem
            id="community"
            className="md:col-span-12"
            data-eva-audio-autoplay=""
            data-eva-audio-voice="voice_community"
          >
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
            >
              <BentoCard
                eyebrow="Gemeinschaft"
                title="Die Halle der Gefährten"
                description="Tritt dem Rat bei. Hier werden Allianzen geschmiedet, Charaktere geboren und die Zukunft des Servers diskutiert. Dein Platz am Feuer ist bereit."
                icon={<MessageCircle className="h-5 w-5 text-vellum-50" strokeWidth={1.5} />}
                footer={
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-sunbronze group-hover:text-vellum-50 transition-colors">
                    Discord beitreten{' '}
                    <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                }
              />
            </a>
          </RevealGroupItem>
        </BentoGrid>
      </RevealGroup>
    </section>
  )
}
