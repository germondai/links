<h1 align="center">
  <a href="https://github.com/germondai/links" target="_blank">
    <img align="center" src="https://icons.germondai.com/icons?i=nextjs" /><br/><br/>
    <span>Germond's Links</span>
  </a>
</h1>

## **Welcome** to <a href="https://github.com/germondai/links" target="_blank">**Germond's Links**</a>! 👋

> Your corner of the internet.

A high-performance, self-hostable personal link page - a FOSS alternative to Linktree.  
Everything configured in a single TypeScript file. No database, no auth, no dashboard.

[![CI](https://github.com/germondai/links/actions/workflows/ci.yml/badge.svg)](https://github.com/germondai/links/actions/workflows/ci.yml)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Bun](https://img.shields.io/badge/runtime-Bun-black)](https://bun.sh)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6)](https://www.typescriptlang.org)

---

## Features

- **Zero database** - everything lives in `links.config.ts`
- **Fully static (SSG)** - pre-rendered at build time, zero server latency
- **15 built-in themes** - from dark nebulas to warm amber and cyberpunk cyan
- **41 self-hosted Google Fonts** - downloaded at build time, zero CDN at runtime, CLS-safe fallback metrics
- **Custom backgrounds** - gradient, solid colour, image, or video
- **Tech icon support** - powered by [icons.germondai.com](https://icons.germondai.com) alongside emojis and URLs
- **Animated effects** - beam sweeps, particle field, light flare on click
- **Glass morphism UI** - backdrop blur, noise texture, accent glow
- **Built-in link shortener** - add a `slug` to any link and `domain.tld/slug` redirects to it; socials get their platform name as a slug automatically
- **Live dev panel** - edit config visually in-browser and export to `links.config.ts`
- **Auto-generated favicon, PWA icons & OG image** - all built from your config at every build, no manual steps
- **PWA-ready** - web manifest, OG/Twitter cards, sitemap, robots.txt
- **Docker + Vercel + Netlify** - deploy anywhere in minutes

---

## Quick start

```sh
git clone https://github.com/germondai/links
cd links
bun install
cp links.config.example.ts links.config.ts
# edit links.config.ts with your info, then:
bun dev
```

Open [http://localhost:3000](http://localhost:3000) - or run `bun dev -- --hostname 0.0.0.0` to test from your phone on the same network.

In dev mode a **⚙ gear button** appears in the bottom-right corner. Click it to open the live config panel - edit everything visually and hit **Copy links.config.ts** to export your settings.

Favicons, PWA icons, and the OG image are all generated automatically during `bun run build`. To regenerate just the icons without a full build:

```sh
bun run icons
```

---

## Configuration

All configuration lives in `links.config.ts`. See `links.config.example.ts` for a fully-commented reference.

### Profile

```ts
profile: {
  name: string        // display name
  username: string    // @handle shown below name
  bio?: string        // short bio
  avatar?: string     // image URL or /public path
  verified?: boolean  // shows ✓ badge next to name
}
```

### Links

```ts
links: [
  {
    title: string          // button label (required)
    url: string            // target URL (required)
    icon?: string          // see Icons section below
    description?: string   // sub-text below title
    style?: LinkStyle      // 'default' | 'pill' | 'outline' | 'neon'
    enabled?: boolean      // set false to hide without deleting
    slug?: string          // optional short-URL - yourdomain.com/slug → this link
  }
]
```

Any link can optionally have a `slug` to act as a short URL. See [Link shortener](#link-shortener) below.

### Socials

Rendered as a small branded icon row beneath the bio. Each entry also creates a redirect route - e.g. adding `github` makes `yourdomain.com/github` redirect straight to your profile.

```ts
socials: [
  { platform: 'github', url: 'https://github.com/you' },
  { platform: 'discord', url: 'https://discord.gg/...' },
]
```

**Supported platforms (25):**

| Group         | Platforms                                                               |
| ------------- | ----------------------------------------------------------------------- |
| Social        | `twitter` · `bluesky` · `threads` · `instagram` · `facebook` · `reddit` |
| Video / Music | `youtube` · `tiktok` · `twitch` · `spotify`                             |
| Professional  | `linkedin` · `github`                                                   |
| Messaging     | `discord` · `telegram` · `whatsapp`                                     |
| Creator       | `patreon` · `kofi` · `producthunt`                                      |
| Design        | `dribbble` · `behance`                                                  |
| Dev           | `devto` · `hashnode` · `medium` · `steam`                               |
| Generic       | `website` · `email`                                                     |

### Appearance

```ts
appearance: {
  theme: Theme                    // one of 14 built-in themes
  font?: FontName                 // one of 12 Google Fonts, self-hosted at build time (default: 'Inter')
  background?: Background         // gradient / color / image / video
  accentColor?: string            // hex override for accent
  linkStyle?: LinkStyle           // default link button style
  glassOpacity?: number           // 0–1, default 0.1
  blur?: number                   // backdrop-blur px, default 20
  avatarGlow?: boolean            // default true
  backgroundAnimation?: boolean   // beams + particles, default true
}
```

### Effects

```ts
effects: {
  beams: boolean        // sweeping light beams
  particles: boolean    // floating particle dots
  lensFlares: boolean   // radial burst on link click
  noiseTexture: boolean // subtle film grain overlay
}
```

---

## Icons

Three formats are supported wherever `icon` is accepted (link buttons):

| Format    | Example                          | Description                                                        |
| --------- | -------------------------------- | ------------------------------------------------------------------ |
| Emoji     | `'🔗'`                            | Any emoji or plain text                                            |
| Tech icon | `'icon:typescript'`              | Brand icon from [icons.germondai.com](https://icons.germondai.com) |
| Image URL | `'https://example.com/logo.png'` | External image                                                     |

### Tech icons

Powered by **[icons.germondai.com](https://icons.germondai.com)** - an open-source icon API by [@germondai](https://github.com/germondai). Source: [github.com/germondai/icons](https://github.com/germondai/icons).

To browse all available icon slugs, visit [icons.germondai.com/icons/all](https://icons.germondai.com/icons/all) or fetch the list:

```
GET https://icons.germondai.com/icons/list
```

**Examples:**

```ts
{ title: 'GitHub',      url: '...', icon: 'icon:github' }
{ title: 'My App',      url: '...', icon: 'icon:react' }
{ title: 'Backend',     url: '...', icon: 'icon:bun' }
{ title: 'Styled with', url: '...', icon: 'icon:tailwindcss' }
```

Append `:mono:fff` for a white monochrome variant - ideal on dark backgrounds:

```ts
{ title: 'GitHub', url: '...', icon: 'icon:github:mono:fff' }
```

Social icons in the icon row beneath the bio use this service automatically for platforms that have brand icons, with lucide fallbacks for the rest.

---

## Favicon & PWA icons

Icons are generated automatically from your config every time you run `bun run build`. No manual steps, no static files to commit.

### How it works

`scripts/generate-icons.ts` runs as a `prebuild` hook and produces four sizes:

| File                          | Size      | Used for                 |
| ----------------------------- | --------- | ------------------------ |
| `src/app/icon.png`            | 32 × 32   | Browser tab favicon      |
| `public/apple-touch-icon.png` | 180 × 180 | iOS home screen          |
| `public/icon-192.png`         | 192 × 192 | Android PWA install      |
| `public/icon-512.png`         | 512 × 512 | Splash screen / maskable |

### Source priority

**`profile.avatar` is set (HTTP URL)**  
Downloads the image and resizes it to all four sizes. Your actual photo or logo appears in every browser tab, bookmark, and home screen install.

**No avatar configured**  
Generates a circular icon using the theme's accent and background colours. The icon automatically matches whatever `appearance.theme` and `appearance.accentColor` you have set - no extra configuration needed.

```
aurora theme  → purple circle
neon theme    → cyan circle
crimson theme → red circle
…and so on
```

### Running manually

```sh
bun run icons   # regenerate icons without a full build
```

Useful after changing your avatar URL or switching themes mid-development.

### For forks

Every self-hosted fork generates its own icons at build time from its own `links.config.ts`. No one sees someone else's avatar - each instance is fully independent.

---

## Open Graph image

The OG image is generated automatically every time you run `bun run build` - no design tools, no static files to maintain, no external services.

### How it works

The full build pipeline runs three phases:

```
prebuild  →  scripts/generate-icons.ts   # downloads avatar, generates favicon PNGs
build     →  next build                  # renders opengraph-image.tsx → 1200×630 PNG
postbuild →  scripts/extract-og.ts      # copies the PNG to public/og.png
```

`src/app/opengraph-image.tsx` is a Next.js file-convention route. At build time Next.js renders it using [Takumi](https://takumi.kane.tw) - a Rust-based image renderer with full CSS support - and pre-generates the PNG as a static asset served at `/opengraph-image`. Next.js also injects the correct `<meta property="og:image">` and `<meta name="twitter:image">` tags automatically.

After the build, `scripts/extract-og.ts` copies the result to `public/og.png` so you can inspect it locally and use it as a static fallback URL if needed.

### What's rendered

The image is built from your config at build time:

| Element             | Source                                        |
| ------------------- | --------------------------------------------- |
| Background gradient | `appearance.theme` + `appearance.accentColor` |
| Avatar (circular)   | `profile.avatar`                              |
| Name                | `profile.name`                                |
| Handle              | `profile.username`                            |
| Bio                 | `profile.bio`                                 |
| URL                 | `seo.canonicalUrl` (stripped of `https://`)   |
| Accent bars         | top + bottom edge in the theme accent colour  |

### Custom OG image

Set `seo.ogImage` in your config to use a custom static image instead of the generated one:

```ts
seo: {
  ogImage: 'https://example.com/my-custom-og.png',
}
```

When `seo.ogImage` is set it takes priority over the generated image.

### For forks

Each self-hosted fork renders the OG image from its own config. The person's own name, avatar, bio, and theme appear automatically - no manual work required.

---

## Themes

15 built-in themes, each with a distinct gradient background and accent colour:

| Theme      | Accent               | Vibe          |
| ---------- | -------------------- | ------------- |
| `phantom`  | indigo `#5535d8`     | dark phantom  |
| `aurora`   | violet `#7c3aed`     | purple nebula |
| `midnight` | blue `#3b82f6`       | deep navy     |
| `rose`     | pink `#f43f5e`       | soft rose     |
| `emerald`  | teal-green `#10b981` | tropical      |
| `sunset`   | orange `#f97316`     | warm dusk     |
| `obsidian` | slate `#a1a1aa`      | pure dark     |
| `neon`     | cyan `#22d3ee`       | cyberpunk     |
| `ocean`    | azure `#0891b2`      | deep sea      |
| `forest`   | green `#16a34a`      | dark woodland |
| `crimson`  | red `#b91c1c`        | blood red     |
| `golden`   | amber `#d97706`      | warm gold     |
| `arctic`   | teal `#0d9488`       | icy cool      |
| `candy`    | fuchsia `#c026d3`    | vivid magenta |
| `cosmic`   | indigo `#4338ca`     | deep space    |

Override any theme's gradient and angle in the dev panel (Background → gradient controls), or via `appearance.accentColor`.

---

## Typography

Set `appearance.font` in your config to choose a font family:

```ts
appearance: {
  font: 'Poppins', // default: 'Inter'
}
```

**41 available fonts:**

| Key                   | Family              | Category             |
| --------------------- | ------------------- | -------------------- |
| `Inter`               | Inter               | Geometric sans       |
| `Geist`               | Geist               | Geometric sans       |
| `Roboto`              | Roboto              | Geometric sans       |
| `Montserrat`          | Montserrat          | Geometric sans       |
| `Urbanist`            | Urbanist            | Geometric sans       |
| `Hanken_Grotesk`      | Hanken Grotesk      | Geometric sans       |
| `Bricolage_Grotesque` | Bricolage Grotesque | Geometric sans       |
| `Poppins`             | Poppins             | Humanist sans        |
| `Nunito`              | Nunito              | Humanist sans        |
| `Nunito_Sans`         | Nunito Sans         | Humanist sans        |
| `Raleway`             | Raleway             | Humanist sans        |
| `Lato`                | Lato                | Humanist sans        |
| `Open_Sans`           | Open Sans           | Humanist sans        |
| `Cabin`               | Cabin               | Humanist sans        |
| `Work_Sans`           | Work Sans           | Humanist sans        |
| `Mulish`              | Mulish              | Humanist sans        |
| `Quicksand`           | Quicksand           | Humanist sans        |
| `Josefin_Sans`        | Josefin Sans        | Humanist sans        |
| `Figtree`             | Figtree             | Humanist sans        |
| `Manrope`             | Manrope             | Humanist sans        |
| `DM_Sans`             | DM Sans             | Professional sans    |
| `Outfit`              | Outfit              | Professional sans    |
| `Plus_Jakarta_Sans`   | Plus Jakarta Sans   | Professional sans    |
| `Rubik`               | Rubik               | Professional sans    |
| `Lexend`              | Lexend              | Professional sans    |
| `Space_Grotesk`       | Space Grotesk       | Techy / display sans |
| `Syne`                | Syne                | Techy / display sans |
| `Barlow`              | Barlow              | Techy / display sans |
| `Oxanium`             | Oxanium             | Techy / display sans |
| `JetBrains_Mono`      | JetBrains Mono      | Monospace            |
| `Fira_Code`           | Fira Code           | Monospace            |
| `IBM_Plex_Mono`       | IBM Plex Mono       | Monospace            |
| `Source_Code_Pro`     | Source Code Pro     | Monospace            |
| `Playfair_Display`    | Playfair Display    | Serif                |
| `Merriweather`        | Merriweather        | Serif                |
| `Lora`                | Lora                | Serif                |
| `EB_Garamond`         | EB Garamond         | Serif                |
| `Cormorant_Garamond`  | Cormorant Garamond  | Serif                |
| `DM_Serif_Display`    | DM Serif Display    | Serif                |
| `Bebas_Neue`          | Bebas Neue          | Display              |
| `Anton`               | Anton               | Display              |

### How it works

`scripts/generate-font.ts` runs as part of `prebuild` before every build. It reads `appearance.font` and writes `src/lib/_font.ts` - a file with a single `next/font/google` call for that font.

At build time, `next/font/google`:

- Downloads the font from Google Fonts **once**
- Self-hosts it under `/_next/static/media/` - **no Google CDN requests at runtime**
- Generates `@font-face` with `font-display: swap` plus fallback metric overrides (`ascent-override`, `descent-override`, `size-adjust`) to prevent layout shift - the same technique as [fontaine](https://github.com/unjs/fontaine) / [@nuxt/fonts](https://fonts.nuxt.com)

### Live preview

In dev mode, the **⚙ dev panel → Appearance** tab includes a font picker. Selecting a font updates the page instantly (via the `--font-base` CSS variable) without restarting the server. Hit **Copy links.config.ts** to export your choice.

> **Note:** the active `@font-face` is determined by `appearance.font` at **build time**. Live preview loads the font from the browser cache if available; to guarantee all fonts are present locally, rebuild after changing `font`.

---

## Link shortener

Every social and any link with a `slug` field gets its own redirect route, pre-generated at build time.

### Social redirects

Each social platform automatically uses its platform name as the slug:

```
yourdomain.com/github    → your GitHub URL   (302)
yourdomain.com/discord   → your Discord URL  (302)
yourdomain.com/instagram → your Instagram URL (302)
```

`email` is excluded - `mailto:` can't be an HTTP redirect target.

### Custom link slugs

Add a `slug` to any link button to give it a short URL:

```ts
links: [
  {
    title: 'Portfolio',
    url: 'https://germondai.com',
    slug: 'portfolio',   // yourdomain.com/portfolio → germondai.com
  },
  {
    title: 'GitHub',
    url: 'https://github.com/germondai',
    slug: 'gh',          // yourdomain.com/gh → github.com/germondai
  },
  {
    title: 'Newsletter', // no slug - this link won't get a short route
    url: 'https://example.substack.com',
  },
]
```

Slugs are optional per link - only the ones you set get a route. Lowercase letters, numbers and hyphens only. Social platform names always take priority if a slug clashes.

All routes are pre-generated as static redirects via `generateStaticParams` - no server logic at request time.

---

## Self-hosting

### Docker

```sh
docker build -t links .
docker run -d -p 3000:3000 --restart unless-stopped --name links links
```

Builds the image, starts the container on port 3000, and restarts automatically on crash or reboot. The container runs as a non-root user with a built-in health check.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/germondai/links)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/germondai/links)

No environment variables required - all config is in `links.config.ts`.

---

## Development

```sh
bun dev              # dev server (Turbopack)
bun run icons        # regenerate favicon + PWA icons from config
bun run build        # production build: icons → OG image → Next.js
bun start            # start production server
bun run check        # Biome lint + format (CI mode)
bun run check:write  # lint + format + auto-fix
bun test             # run test suite
bun test --coverage  # with coverage report
```

---

## Testing

Tests live in `src/__tests__/` and run with Bun's built-in test runner.

```sh
bun test
```

Covered: config resolution, 14 theme tokens, class merging.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

---

## License

[AGPL-3.0-or-later](https://www.gnu.org/licenses/agpl-3.0) © 2025 [germondai](https://github.com/germondai)

---

<p align="center">
    <span>Made with ❤️ by</span>
    <a href="https://github.com/germondai" target="_blank">@germondai</a>
</p>
