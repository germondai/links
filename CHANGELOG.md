# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-01

### Added

#### Core
- `links.config.ts` — single TypeScript file drives the entire page: profile, socials, links, appearance, effects, SEO
- `links.config.example.ts` — fully documented reference config based on a real deployment
- Static site generation (SSG) — every page pre-rendered at build time, zero server latency
- Live dev panel — floating ⚙ button in dev mode; edit all config fields visually with drag-to-reorder, export to `links.config.ts` via clipboard

#### Themes & appearance
- 15 built-in themes: `phantom`, `aurora`, `midnight`, `rose`, `emerald`, `sunset`, `obsidian`, `neon`, `ocean`, `forest`, `crimson`, `golden`, `arctic`, `candy`, `cosmic`
- `appearance.font` — 12 configurable Google Fonts (`Inter`, `Geist`, `Roboto`, `Poppins`, `Raleway`, `Nunito`, `Montserrat`, `Lato`, `Space_Grotesk`, `DM_Sans`, `Outfit`, `Playfair_Display`); downloaded at build time via `next/font/google`, self-hosted with no Google CDN at runtime; fallback metric overrides (`ascent-override`, `descent-override`, `size-adjust`) prevent CLS; live font picker in dev panel
- Custom background system — `gradient`, `color`, `image`, `video`; gradient supports custom from/via/to and angle
- Four link button styles via CVA: `default`, `pill`, `outline`, `neon` — global default and per-link override
- Glass morphism card with configurable opacity and blur
- Avatar glow, verified badge, animated beam/particle/lens-flare effects, SVG noise texture overlay

#### Icons
- Three icon formats on link buttons: emoji/text, `icon:slug` tech icons, external image URL
- Tech icons powered by [icons.germondai.com](https://icons.germondai.com) — white mono variant via `:mono:fff`
- Social icon row uses brand icons from the service where available, lucide fallbacks otherwise

#### Build-time asset generation
- `scripts/generate-icons.ts` (`prebuild`) — downloads `profile.avatar` and resizes to 32/180/192/512 px using `sharp`; generates a themed accent-colour circle when no avatar is set
- `src/app/opengraph-image.tsx` — 1200×630 OG image rendered by [Takumi](https://takumi.kane.tw) (Rust, full CSS); shows avatar, name, handle, bio, URL, theme gradient
- `scripts/extract-og.ts` (`postbuild`) — copies the built OG PNG to `public/og.png`
- Favicon, Apple touch icon, Android PWA icons — all derived from the same avatar source at build time
- Dynamic `<link rel="icon">` and manifest icons point to `profile.avatar` URL in production

#### Socials & routing
- 25 supported social platforms across 8 groups
- Every social entry auto-generates a redirect route at build time — `yourdomain.com/github` → GitHub URL (302)
- Optional `slug` field on any link button — `yourdomain.com/gh` → the link's URL; acts as a personal link shortener for any entry, not just socials

#### SEO & PWA
- JSON-LD `ProfilePage` + `Person` schema — `Person.url` points to the configured main site to signal the primary entity to search engines
- `seo.mainSiteUrl` — auto-derived by stripping the first subdomain from `canonicalUrl`; set explicitly for `.co.uk`/`.com.au` TLDs
- Full metadata: canonical URL, OG profile type, Twitter Card, `max-image-preview: large`, `publisher`, description fallback chain
- PWA manifest with `scope`, `orientation`, `categories`, maskable icon
- Sitemap, robots.txt, preconnect hints for external origins, HSTS, immutable cache headers for static assets

#### Infrastructure
- Docker multi-stage build with Bun runtime; `.dockerignore` keeps build context minimal
- Vercel and Netlify one-click deploy configs with `NEXT_TELEMETRY_DISABLED`
- GitHub Actions CI: Biome check → tsc → bun test → bun build
- GitHub Actions release: tag → GitHub Release with auto-generated notes
- Husky pre-commit hook: `bun run check:write && bun test`
- Biome v2 for linting and formatting
- TypeScript 6, React 19, Next.js 16, Tailwind CSS v4, Framer Motion v12, Bun runtime
