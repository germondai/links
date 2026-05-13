# Contributing to @germondai/links

## Prerequisites

- [Bun](https://bun.sh) installed (latest stable)
- Git

## Local setup

```sh
git clone https://github.com/germondai/links
cd links
bun install
cp links.config.example.ts links.config.ts
# edit links.config.ts with your info, then:
bun dev
```

Open [http://localhost:3000](http://localhost:3000).  
Run `bun dev -- --hostname 0.0.0.0` to test from a phone on the same network.

## Build pipeline

```sh
bun run build   # prebuild (icons + font) → next build (OG image) → postbuild (extract-og)
bun run icons   # regenerate favicon + PWA icons without a full build
```

`prebuild` runs two scripts in sequence:

1. `scripts/generate-icons.ts` — downloads `profile.avatar` and resizes it to favicon sizes using `sharp` (bundled with Next.js, no extra install)
2. `scripts/generate-font.ts` — reads `appearance.font` from your config and writes `src/lib/_font.ts` with a single `next/font/google` call for that font; Next.js downloads and self-hosts the font at build time

## Code style

We use **Biome** for linting and formatting — no ESLint, no Prettier.

```sh
bun run check:write   # auto-fix everything
bun run check         # check only (CI mode)
```

Husky runs `check:write` + `bun test` automatically on every commit.

## Commit messages

Follow [Conventional Commits](https://conventionalcommits.org):

| Prefix      | Use for                               |
| ----------- | ------------------------------------- |
| `feat:`     | New feature                           |
| `fix:`      | Bug fix                               |
| `docs:`     | Documentation only                    |
| `chore:`    | Maintenance / deps                    |
| `refactor:` | Code restructure, no behaviour change |

## Branch naming

| Prefix   | Use for       |
| -------- | ------------- |
| `feat/`  | New features  |
| `fix/`   | Bug fixes     |
| `docs/`  | Documentation |
| `chore/` | Maintenance   |

## PR process

1. Fork the repo
2. Create a branch from `dev` (not `main`)
3. Make your changes
4. Run `bun run check:write && bun test`
5. Open a PR targeting the `dev` branch
6. Fill in the PR template

## Adding new fonts

1. Add the key to the `FontName` union in `src/types/config.ts`
2. Add a `FONT_FAMILY` entry in `src/lib/font-meta.ts` — map the key to the CSS font-family string (e.g. `Space_Grotesk → 'Space Grotesk'`)
3. If the font is **not variable** (i.e. requires explicit weights), add a `WEIGHTS` entry in `scripts/generate-font.ts`
4. Rebuild — `scripts/generate-font.ts` picks up the new font key automatically
5. Update the fonts table in `README.md`

## Adding new themes

1. Add the key to the `Theme` union in `src/types/config.ts`
2. Add a `ThemeTokens` entry in `src/lib/themes.ts` (from, via, to, accent, beam, particle)
3. Add the accent + bg colors to the `ACCENTS` / `BG_COLORS` maps in `scripts/generate-icons.ts`
4. `ALL_THEMES` in `src/components/dev/DevPanel.tsx` picks it up automatically via `Object.keys(THEMES)`
5. Update the themes table in `README.md`

## Adding new social platforms

1. Add the platform key to the `SocialPlatform` union in `src/types/config.ts`
2. Add a `PROVIDER_SLUGS` entry in `src/components/profile/SocialIcons.tsx` if the platform has a brand icon on icons.germondai.com, otherwise add a lucide fallback to `FALLBACK_ICONS` and `LABELS`
3. Add to `ALL_PLATFORMS` in `src/components/dev/DevPanel.tsx`
4. Update the platforms table in `README.md`

## AGPL-3.0

All contributions are licensed under AGPL-3.0. Every new source file must include the SPDX header:

```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai
```
