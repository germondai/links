# @germondai/links

Self-hostable personal link page — a FOSS alternative to Linktree. Single profile, no database, no auth, no dashboard. Everything lives in `links.config.ts`. Fork it, edit the config, deploy your own instance.

Bun everywhere — no npm/npx/yarn/pnpm in scripts, Dockerfile, CI, or docs.

## Stack

Next.js 16 (App Router, React 19, Turbopack, standalone output), TypeScript 6 strict, Tailwind CSS v4, Framer Motion v12, Radix UI, Biome v2, Bun test, Zustand, CVA, next-themes, lucide-react, takumi-js, sharp.

## Structure

```
@germondai/links/
├── links.config.ts              # only file users need to edit
├── links.config.example.ts      # fully documented reference
├── scripts/
│   ├── generate-icons.ts        # prebuild: avatar → 4 WebP sizes via sharp
│   ├── generate-font.ts         # prebuild: writes src/lib/_font.ts
│   └── extract-og.ts            # postbuild: copies OG image to public/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # metadata, JSON-LD, font, theme injection
│   │   ├── page.tsx             # SSG entry
│   │   ├── page-client.tsx      # client root: effects, CSS var sync, DevPanel
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── opengraph-image.tsx  # 1200x630 OG via Takumi (Rust renderer)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   └── [slug]/route.ts      # social + custom link shortener
│   ├── components/
│   │   ├── dev/DevPanel.tsx     # live config panel, dev only
│   │   ├── effects/             # Background, BeamEffect, ParticleField, LightFlare, NoiseBg, EffectsLayer
│   │   ├── layout/ThemeProvider.tsx
│   │   ├── profile/             # Avatar, LinkButton (4 CVA variants), ProfileCard, SocialIcons
│   │   └── ui/                  # Icon, badge, button, separator, switch, tooltip
│   ├── hooks/
│   │   ├── useFlare.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── _font.ts             # auto-generated — do not edit
│   │   ├── cn.ts
│   │   ├── config.ts            # defaults + resolveConfig
│   │   ├── font-meta.ts         # client-safe CSS family map for DevPanel
│   │   ├── icon-colors.ts       # accent/bg maps derived from THEMES + circleSvg
│   │   ├── seo.ts               # deriveMainDomain, stripProtocol
│   │   ├── slugs.ts             # slug resolution + buildSlugParams
│   │   └── themes.ts            # 15 theme token sets + getThemeTokens
│   ├── store/
│   │   ├── config.ts            # Zustand: raw + resolved config
│   │   └── flare.ts             # Zustand: lens flare events
│   ├── types/config.ts
│   └── __tests__/               # cn, config, font-meta, generate-font, icons, seo, slugs, themes
├── .github/
│   ├── workflows/               # ci.yml, release.yml
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── Dockerfile
├── vercel.json
├── netlify.toml
├── biome.json
├── next.config.ts
├── tsconfig.json
├── bunfig.toml
├── README.md
├── LICENSE                      # AGPL-3.0
├── SECURITY.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── CHANGELOG.md
```

## Key design decisions

**Single config file.** All user-facing configuration goes in `links.config.ts`. Types are strict so editors give autocomplete and catch mistakes before build.

**Font system.** `next/font/google` requires static, module-level calls that Turbopack can analyse. To support config-driven font selection, `scripts/generate-font.ts` runs as `prebuild` and writes `src/lib/_font.ts` with exactly one font call. 41 fonts available. Non-variable fonts (Roboto, Poppins, Lato, Barlow, IBM Plex Mono, Bebas Neue, Anton, DM Serif Display) need an explicit weight array. Fonts are self-hosted at build time — zero Google CDN at runtime. `font-meta.ts` is a separate client-safe map used by the DevPanel live picker.

**Icon generation.** `scripts/generate-icons.ts` downloads `profile.avatar` and resizes it to 4 WebP sizes via sharp. Falls back to a themed SVG circle when no avatar is set. `icon-colors.ts` derives accent and background colors directly from `THEMES` so they can never drift out of sync.

**OG image.** `opengraph-image.tsx` is rendered at build time by Takumi (Rust, full CSS support). Result is copied to `public/og.webp` by `extract-og.ts` postbuild. Satori was considered but rejected due to display:flex constraints.

**Link shortener.** Social platforms auto-get a redirect route at their platform name. Any link with a `slug` field also gets one. Pure resolution logic lives in `src/lib/slugs.ts`, independently tested. Socials take priority on slug collision. All routes are static via `generateStaticParams`.

**Dev panel.** Floating gear button, dev only. Editing any field updates the Zustand store which re-renders the page live. Font and theme changes update CSS vars directly without a rebuild. Drag-to-reorder via framer-motion Reorder. "Copy links.config.ts" serializes current state to clipboard.

**Themes.** 15 built-in themes in `themes.ts`. Each has from/via/to gradient + accent/beam/particle tokens injected as CSS vars on `<body>`. `phantom` is the default personal theme matching germondai.com.

**SEO.** JSON-LD ProfilePage + Person schema. `seo.mainSiteUrl` auto-derived by stripping the first subdomain from `canonicalUrl` (`deriveMainDomain` in `seo.ts`) — set explicitly for .co.uk / .com.au TLDs.

## Build pipeline

```
prebuild  ->  generate-icons.ts + generate-font.ts
build     ->  next build  (also renders opengraph-image.tsx)
postbuild ->  extract-og.ts
```

## Testing

Bun test, 100% coverage on all lib files. Each lib module has a dedicated test file. `generate-font.test.ts` imports `buildFontContent` directly and verifies the generated output for variable vs static fonts. `icons.test.ts` verifies ICON_ACCENTS/BG_COLORS match THEMES so color drift is caught automatically.

## Deployment

Docker multi-stage build (`oven/bun:1.3.14-slim`), non-root `bun` user, OCI labels. One-click Vercel and Netlify via `vercel.json` and `netlify.toml`. No env vars required.

## License

AGPL-3.0. Full text in `LICENSE`. SPDX header on every source file.
