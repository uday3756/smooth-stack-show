
## Goal

Each theme in the switcher should be a **single solid skin color** applied everywhere (page background, header, footer, section surfaces) — not a multi-color palette. "White" = fully white app, "Black" = fully black app, "Red" = fully red app, etc. Text, cards, and content must remain clearly visible on every skin.

## Approach

Rework `src/styles.css` so every `:root[data-theme="..."]` block uses **one skin hue** for `--background`, `--surface`, `--surface-alt`, `--foreground`, `--border`, `--muted`, `--primary`, `--secondary`, `--accent` — all derived from that single color instead of assorted brand hues.

Rules per theme:
- `--background` = the skin color (pure).
- `--surface` / `--surface-alt` = same skin color, nudged 4–8% lighter or darker than the background so cards read as raised.
- `--foreground` / `--muted` = automatic contrast color (near-black on light skins, near-white on dark skins) with enough delta to hit WCAG AA.
- `--primary` / `--secondary` / `--accent` = the same contrast color (so buttons/CTAs are visible without introducing a second hue).
- `--border` = skin color shifted for a faint outline.
- Cards keep the existing glow, but the glow uses `color-mix(--foreground …)` instead of a brand hue so it works on any monochrome skin.

## Theme list (mapped to single skins)

| Theme id | Skin | Text/CTA color |
|---|---|---|
| snow | #ffffff | near-black |
| noir | #000000 | near-white |
| sunset | solid orange | near-white |
| forest | solid green | near-white |
| ocean | solid blue | near-white |
| coral | solid coral/red | near-white |
| berry | solid pink/magenta | near-white |
| cloud | solid sky blue | near-white |
| midnight | solid deep purple | near-white |
| default (Violet) | solid violet | near-white |
| obsidian | near-black w/ lime accent kept only for CTA legibility | near-white |
| neobrutalist | solid yellow | near-black |

For each: background, header, footer, and every section share the exact skin color — no more contrasting `bg-foreground text-background` bands. Cards sit on a slightly shifted shade of the same skin so they stay visible.

## Files touched

- `src/styles.css` — rewrite every theme block to monochrome tokens; update `.stack-card` glow to use `--foreground` mix so it works on any skin.
- `src/components/CategoryBrowse.tsx` and `src/components/ServicesExplorer.tsx` — replace hard `bg-foreground text-background` section wrappers with `bg-background text-foreground` so sections inherit the single skin color instead of inverting to the contrast color.
- `src/lib/theme.ts` — update `HERO_GRADIENT_COLORS` per theme to use variations of the single skin color (so the animated gradient background stays monochrome per theme).

## Out of scope

- No layout, spacing, animation, component, or feature changes.
- Theme switcher UI and available theme options stay the same.
- Default theme stays `snow` (white).

## Verification

After build: switch to White → whole app white with dark text/cards; switch to Black → whole app black with light text/cards; switch to Red → whole app red with white text and slightly darker red cards; repeat for each theme and confirm nothing becomes invisible.
