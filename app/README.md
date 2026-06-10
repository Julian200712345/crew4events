# Crew4Events — App UI (volledige inrichting)

Een complete, klikbare HTML-prototype van de Crew4Events-app, met branding 1:1 afgeleid
van crew4events.nl. Geschikt om te tonen, te itereren, te importeren in Figma
(via html.to.design) en als basis voor de echte bouw.

## Snel bekijken

Open **`index.html`** in je browser. Dat is het overzicht met alle 15 schermen.
Klik een scherm aan om het los te openen.

## Structuur

```
app/
├── index.html              ← overzicht van alle schermen (start hier)
├── styles.css              ← design system: alle tokens, componenten
├── screens/                ← elk scherm als losstaand HTML-bestand
│   ├── 01-login.html
│   ├── 02-home.html
│   ├── ... t/m 15-notifications.html
├── snapshots/              ← PNG-screenshots van elk scherm
├── qa-check.js             ← automatische layout/contrast-controle
├── run-qa.sh               ← draait QA op alle schermen
└── snap-all.sh             ← maakt snapshots van alle schermen
```

## De 15 schermen

**Crewlid (de ZZP'er):**
1. Inloggen — splash met festivalfoto en "binnen 30 min"-belofte
2. Home — volgende shift, beschikbaarheid togglen, feed om je op aan te melden
3. Shifts zoeken — zoeken, filteren, aanmelden
4. Shift detail — alle info + aanmeld-CTA (Crew4Events keurt goed)
5. Inchecken — GPS/QR check-in op locatie
6. Agenda — weekplanning en beschikbaarheid
7. Verdiensten — saldo, uitbetalingen, historie
8. Profiel — certificaten, AVB-status, instellingen
14. Afronden & rating — uitchecken + wederzijdse review
15. Meldingen — shifts, uitbetalingen, compliance

**Klant (festival/organisatie):**
9. Klant home — lopende aanvragen + bemanningsstatus
10. Aanvraag plaatsen — crew aanvragen met live prijsindicatie
11. Uren goedkeuren — basis voor facturatie

**Team (Crew4Events backoffice):**
12. Admin dashboard (desktop) — KPI's, aanvragen die crew nodig hebben,
    compliance-signalen (AVB, Waadi, DBA, VBAR-grens)
13. Crew matchen — geschikte crew tonen + push naar de pool

## Branding tokens (uit crew4events.nl)

| Token | Waarde | Gebruik |
|---|---|---|
| Oranje | `#F2A007` | Accent, CTA's, actieve staten |
| Oranje-ink | `#8A5510` | Donkere oranje tekst (contrast) |
| Ink | `#1A1A1A` | Primaire tekst, tekst op oranje knoppen |
| Soft | `#F7F7F5` | Sectie-achtergronden |
| Lijn | `#E5E5E5` | Randen |
| Groen | `#0E7A42` | Status "bevestigd/uitbetaald" |
| Font | Inter | Alles |

Belangrijke designkeuze: tekst op oranje knoppen is **donker** (`#1A1A1A`), niet wit.
Wit op `#F2A007` haalt geen AA-contrast (2.1:1); donker wel (7.9:1) en oogt premiumer.

## In Figma krijgen

1. Figma → Plugins → **html.to.design** (gratis)
2. Importeer per scherm de HTML (of de hele map via een lokale server)
3. Alles wordt bewerkbare Figma-lagen met de juiste kleuren en auto-layout

## Iteratie-workflow (zo is dit gebouwd)

1. Bouw/wijzig een scherm in `screens/`
2. `bash run-qa.sh` — controleert overflow, tap-targets, lege elementen en contrast
3. `bash snap-all.sh` — maakt verse snapshots
4. Herhaal tot QA schoon is

QA-resultaat nu: **0 structurele problemen** op alle 15 schermen. Resterende
contrast-meldingen zijn bewust (decoratieve sterren, het merk-wordmark "4",
avatar-initialen).

## Wat hierna kan

- Dark-mode variant
- Echte interactiviteit (de schermen zijn nu statisch; klikbaar maken met JS of een framework)
- Omzetten naar React/Vue componenten met dezelfde tokens
- Koppelen aan een backend (auth, shifts, betalingen via Mollie/Stripe Connect)
