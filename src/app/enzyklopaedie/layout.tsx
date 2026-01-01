import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Enzyklopädie',
    template: '%s | Enzyklopädie',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function EncyclopediaLayout(props: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-[100svh]">
      {/* Encyclopedia backdrop: same palette, slightly “tome” flavored. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-void-950" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_18%,rgba(186,138,45,0.14),transparent_58%),radial-gradient(900px_circle_at_86%_24%,rgba(153,67,36,0.10),transparent_62%),radial-gradient(1100px_circle_at_55%_95%,rgba(69,44,31,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void-950/25 via-transparent to-void-950/88" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_14px)]" />
      </div>

      <div className="relative z-10">{props.children}</div>
    </div>
  )
}
