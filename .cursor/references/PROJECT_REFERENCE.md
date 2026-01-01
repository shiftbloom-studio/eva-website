## Project reference (for coding agents)

This repo contains both runtime code and non-runtime reference material. This file consolidates the previously scattered markdown docs.

### Tech stack (current)

- **Next.js**: 16 (App Router)
- **React**: 19
- **Node.js**: >= 20.9.0
- **Styling/UI**: Chakra UI, Saas UI, Tailwind CSS v4
- **Animations**: Framer Motion
- **Linting** (Next 16): ESLint CLI + flat config (`eslint.config.mjs`)

### Local commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Notes:
- **Bundler**: We use `--webpack` in dev/build because the project has a custom `webpack()` config (SVGR).
- **Lint**: Next.js 16 removed `next lint`; use `eslint` directly.

---

## Concept text (previously `concept_text.md`)

# CONCEPT

# **The 3 pillars**

The core of the server concept consists of 3 pillars, all of which interact and are interdependent. All 3 pillars are underpinned by the underlying role-playing game.

## Economy

The first pillar of the server concept is represented by a complex, constantly changing economy. In addition to market prices that adjust according to supply and demand, the need to expand one's own tools and improve one's own skills is also a fundamental point.

## Conflict and Battles (PvP)

The second pillar of the server concept is a PvP system that is closely intertwined with the other mechanics. Conflicts arise from economic and political tensions and require careful planning and strategic action. Battles always take place in an RP context and require clear justifications to ensure an immersive and rule-compliant implementation.

## Politics and Diplomacy

The third pillar of the server concept adds depth to the role-playing game through a system of diplomacy and political intrigue. Factions can strengthen their position through negotiations, alliances, or skillful power plays. A flexible electoral system allows for regular changes in leadership positions within factions, whether through democratic voting, council decisions, or succession rules, in order to promote power struggles and political dynamics.

# ECONOMY

# **The foundation of interaction**

The economy is the foundation of server-wide interactions and influences every other pillar of the concept. It is shaped by the players and requires strategic action to be successful.

## Resources and production

The core of the economy lies in the procurement and processing of resources. Players can mine raw materials such as wood, ore, or food and process them into goods. Production chains must be planned sensibly, as high-quality goods require complex materials and skills.

## Trade and market

A dynamic marketplace allows goods to be bought, sold, or traded. Prices adjust based on supply and demand, forcing players to react to market fluctuations. Trade routes and caravans can be protected or plundered by factions, which has a direct impact on the economy.

## Progress and Specialization

Improving tools and skills is essential for more efficient production. Players can specialize in certain professions, such as blacksmith, merchant, or farmer, giving them unique advantages for their faction or server.

## Interaction with other pillars

The economy is closely linked to the other pillars. Resources can decide wars, and trade is often influenced by political decisions. Players must always plan their economic activities in the context of server-wide dynamics.

#

# CONFLICTS & BATTLES

# **The heart of conflicts**

The PvP pillar is the central element for conflicts and battles and is closely linked to the other pillars of the concept. Battles are not isolated events, but arise organically from economic, political, and diplomatic tensions.

## Faction Conflicts and Wars

Conflicts between factions are triggered by resource shortages, border disputes, or intrigues. These conflicts can take the form of border skirmishes or large-scale sieges. Structured planning and clear reasoning in role-playing are prerequisites for any act of war.

## Roles and Tactics

Successful battles require clear role assignments and coordinated teamwork. Factions can appoint commanders to lead their fighters, while tactical elements such as siege weapons, terrain utilization, and troop strength determine victory or defeat.

## Rewards and consequences

Victorious factions can gain territory, resources, or political advantages. At the same time, conflicts carry risks: defeats lead to losses of raw materials, positions of power, or influence, which can have long-term effects on the faction.

## Interaction with other pillars

Combat influences and is influenced by economic and political factors. Resources secure a faction's military strength, while diplomacy can prevent or fuel wars. Players must therefore consider their PvP activities in the context of the overall server-wide dynamics.

# POLITICS & DIPLOMACY

# **The Power of Words**

The power of words and strategic decisions shapes the third pillar of the server concept. Politics and diplomacy allow players to resolve conflicts, forge alliances, or spin intrigues. These mechanics are directly linked to the economy and combat, so decisions in this area have far-reaching consequences.

## Negotiations and Alliances

Players can act as diplomats or faction leaders to negotiate and form alliances to strengthen their position. Trade agreements or military alliances can not only bring short-term benefits, but also influence the long-term dynamics between factions.

## Power games and intrigue

Politics is not only a matter of alliances, but also of intrigue and power games. Players can disrupt the plans of other factions through covert actions such as espionage or targeted sabotage. At the same time, this requires a high degree of discretion and strategic skill.

## Elections and leadership roles

An electoral system allows factions to determine their leadership. Whether monarchy, democracy, or another system, the structure of leadership can vary depending on the faction. This encourages role-playing and allows players to actively decide the direction of their community.

## Interaction with other pillars

Political decisions influence economic resources and can fuel or prevent conflicts. Similarly, wars can be avoided through diplomatic skill or directed toward an opponent through clever negotiations. Players must always factor these interactions into their strategy.

Translated with DeepL.com (free version)

---

## Audio assets (previously `public/audio/README.md`)

# Audio Assets (`public/audio/`)

Dieses Projekt lädt Audio-Dateien **clientseitig** über die Web Audio API.

## Naming

Lege die folgenden Dateien in `public/audio/` ab (Dateiendung: `.mp3` **oder** `.ogg` **oder** `.wav`).
Die Runtime versucht automatisch `.mp3 → .ogg → .wav`.

### Voice (DE)

- `voice_welcome`
- `voice_wirtschaft`
- `voice_politik`
- `voice_krieg`
- `voice_rollenspiel`

### SFX (EN)

- `sfx_hover_card`
- `sfx_click_confirm`
- `sfx_toggle_off`
- `sfx_scroll_whoosh`
- `sfx_section_stinger`
- `sfx_link_hint`

## Beispiel

- `public/audio/voice_welcome.mp3`
- `public/audio/sfx_hover_card.ogg`

