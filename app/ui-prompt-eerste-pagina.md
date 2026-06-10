# UI-generatieprompt — Crew4Events App (eerste pagina)

Plak de prompt hieronder in je UI-generator (v0, Lovable, Figma Make, Claude, etc.).
De design tokens komen 1-op-1 uit crew4events.nl, zodat de app naadloos bij de site past.

---

## DE PROMPT (kopieer alles hieronder)

You are a senior product designer. Design a polished, production-ready **mobile-first** UI for the **home/landing screen of the Crew4Events crew app** — the screen a freelance crew member (ZZP'er) sees right after logging in. Crew4Events is a Dutch staffing intermediary that supplies event crew (sitecrew, build/teardown, hosts, machine operators) to festivals and events in NL & BE. The promise is "binnen 30 minuten geregeld" — fast, reliable, professional.

### Brand system (use these exact values)

**Colors**
- Primary accent / orange: `#F2A007` (CTAs, highlights, active states, icons)
- Accent darker (hover/gradient): `#C9821F`
- Ink (primary text): `#1A1A1A`
- Ink-2 (secondary text): `#4A4A4A`
- Muted text: `#7A7A7A`
- Hairline / borders: `#E5E5E5`
- Soft background (sections): `#F7F7F5`
- Pure white surfaces: `#FFFFFF`
- Near-black (hero overlays): `#0A0A0A`
- Error/alert red: `#DC2626`

**Typography**
- Font family: **Inter** (ui-sans-serif fallback), antialiased
- Wordmark style: weight 900, letter-spacing 0.02em — render the logo as "Crew4Events" with the "4" in orange `#F2A007`, rest in ink `#1A1A1A`
- Headings bold to black weight, tight tracking; body in ink-2

**Shape & elevation**
- Corner radius: cards and buttons use rounded-xl (≈12–16px); inputs and pills rounded-xl
- Shadows (soft, never harsh):
  - card: `0 4px 20px rgba(0,0,0,0.06)`
  - soft: `0 10px 40px rgba(0,0,0,0.08)`
  - large: `0 20px 60px rgba(0,0,0,0.12)`
- Focus state: 2px orange outline, 2px offset
- Hero image overlay: left-to-right dark gradient `rgba(10,10,10,0.75) → 0.15`

**Tone of visuals**
- Clean, confident, slightly editorial. White space generous. Real festival/event crew photography behind the hero with the dark gradient overlay so white text stays legible. Avoid clip-art. Feels like a premium gig-work app (think Temper/YoungOnes quality) but with the Crew4Events orange-on-near-black identity.

### Screen: Crew home (after login)

Design a single mobile screen (390×844 baseline) plus note responsive behavior up to desktop. Include these sections top to bottom:

1. **Top bar**
   - Crew4Events wordmark (left), small notification bell with unread dot (right), and a circular profile avatar.
   - Thin hairline border below (`#E5E5E5`).

2. **Greeting + status strip**
   - "Hoi, [Voornaam]" in bold ink.
   - A compact availability toggle/pill: "Beschikbaar deze week" (orange when active). One tap.
   - Small trust/earnings line: e.g. "Deze maand verdiend: €640" and rating "4.9 ★".

3. **Primary card — Volgende shift** (the hero of this screen)
   - A prominent white card with soft-lg shadow showing the crew member's next confirmed shift: event name, role (e.g. "Sitecrew"), date + time window, location with distance, pay rate (e.g. "€32,50 p/u"), and crew-mates count.
   - A big orange primary button: **"Inchecken"** (only active near start time) and a secondary ghost button "Details".
   - If no upcoming shift, show an empty-state variant inviting them to claim a shift.

4. **Open shifts feed — "Beschikbare shifts"**
   - A vertically scrollable list of 3–4 shift cards the crew can claim. Each card: event/role, date, location + distance, pay rate badge in orange, a one-tap **"Claim"** button, and a small urgency tag where relevant ("Nog 2 plekken", "Start binnen 30 min").
   - Include filter chips at the top of the feed: "Dichtbij", "Deze week", "Op- & afbouw", "Sitecrew".

5. **Compliance / readiness nudge (subtle)**
   - A slim banner only if action needed: e.g. "Je AVB-verzekering verloopt over 14 dagen — upload nieuwe polis." Use a soft amber/orange tint, not alarming red unless expired.

6. **Bottom navigation bar (fixed)**
   - 4–5 tabs with icons + labels: Home, Shifts, Agenda, Verdiensten, Profiel. Active tab in orange `#F2A007`, inactive in muted. Account for safe-area; the site reserves ~88px bottom padding on mobile.

### Interaction & detail requirements
- Everything important reachable in **1–2 taps**: claim a shift, check in, toggle availability.
- One clear primary action per section; never two competing orange buttons in the same view.
- Status always visible (e.g. shift card shows "Bevestigd", "Wacht op klant", "Ingecheckt").
- Large touch targets (min 44×44), high contrast, usable with one wet thumb on a festival site (outdoor legibility).
- Respect reduced-motion; keep animations subtle.
- WCAG AA contrast for text on orange and on photo overlays.

### Deliverable
- A single high-fidelity mobile screen, pixel-clean, plus a short note on the responsive/desktop adaptation (sidebar nav instead of bottom bar, two-column shift feed).
- Show realistic Dutch copy (festival/event context, NL locations like Eindhoven, Biddinghuizen, Amsterdam).
- Provide the layout using the exact brand tokens above. Do not invent new brand colors.

---

## Varianten die je kunt toevoegen aan het einde van de prompt

- **Klant-versie:** "Now design the same home screen but for the CLIENT (festival organiser): focus on placing a new crew request, seeing fill status (3/6 bemand), and approving hours."
- **Light/dark:** "Also provide a dark-mode variant using `#0A0A0A` surfaces with orange `#F2A007` accents."
- **Desktop-first:** "Redesign as a desktop admin dashboard for the Crew4Events team: open requests, unconfirmed shifts, no-show alerts, outstanding invoices, and a compliance warnings panel."
