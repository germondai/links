// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai
//
// ─────────────────────────────────────────────────────────────────────────────
//  links.config.example.ts - fully documented reference
//
//  1. Copy this file to links.config.ts
//  2. Replace the values with your own
//  3. Run `bun dev` - that's it.
// ─────────────────────────────────────────────────────────────────────────────

import type { LinksConfig } from './src/types/config'

const config: LinksConfig = {
  // ── Profile ───────────────────────────────────────────────────────────────
  profile: {
    // Your display name - shown as the large heading on the page
    name: 'Germond',

    // Your @handle - shown below the name (without the @)
    username: 'germondai',

    // Short one-liner bio shown under the handle (optional)
    bio: 'Aspiring Full-Stack Web Developer',

    // Avatar image - any public HTTPS URL or a path inside /public.
    // If omitted, falls back to initials derived from `name`.
    // The build script downloads and resizes this into all favicon sizes automatically.
    avatar: 'https://github.com/germondai.png',

    // Renders a ✓ badge next to your name (optional, default: false)
    verified: true,
  },

  // ── Social Icons ──────────────────────────────────────────────────────────
  // Small branded icon row rendered beneath the bio.
  //
  // Each entry automatically creates a redirect route at build time:
  //   yourdomain.com/github    → your GitHub URL   (302)
  //   yourdomain.com/instagram → your Instagram URL (302)
  // email is excluded - mailto: cannot be an HTTP redirect target.
  //
  // Supported platforms (25):
  //   Social:      twitter | bluesky | threads | instagram | facebook | reddit
  //   Video/Music: youtube | tiktok | twitch | spotify
  //   Professional:linkedin | github
  //   Messaging:   discord | telegram | whatsapp
  //   Creator:     patreon | kofi | producthunt
  //   Design:      dribbble | behance
  //   Dev:         devto | hashnode | medium | steam
  //   Generic:     website | email
  //
  // Brand icons are served by icons.germondai.com where available.
  // Generic platforms fall back to lucide icons.
  socials: [
    { platform: 'website', url: 'https://germondai.com' },
    { platform: 'github', url: 'https://github.com/germondai' },
    { platform: 'instagram', url: 'https://instagram.com/germondai' },
    { platform: 'discord', url: 'https://discord.gg/6xU897X' },
    { platform: 'youtube', url: 'https://youtube.com/@germondai?sub_confirmation=1' },
    { platform: 'twitch', url: 'https://twitch.tv/germondai' },
    { platform: 'email', url: 'mailto:germondai@gmail.com' },
  ],

  // ── Links ─────────────────────────────────────────────────────────────────
  // Each entry renders as a full-width clickable button card.
  links: [
    {
      // Button label (required)
      title: 'Portfolio',

      // Target URL - opens in a new tab (required)
      url: 'https://germondai.com',

      // icon accepts three formats:
      //
      //   1. Emoji / plain text
      icon: '🌐',
      //
      //   2. Tech icon from icons.germondai.com - prefix with 'icon:'
      //      Browse slugs: https://icons.germondai.com/icons/all
      //      Append :mono:fff for white monochrome (recommended on dark themes):
      //        icon: 'icon:react:mono:fff'
      //
      //   3. Any image URL (favicon, logo, etc.):
      //        icon: 'https://germondai.com/skull.ico'

      // Sub-text shown below the button label (optional)
      description: 'My personal portfolio web',

      // Optional short-URL slug — yourdomain.com/portfolio → this link's URL.
      // Acts as a personal link shortener for any link, not just socials.
      // Lowercase letters, numbers and hyphens only. Leave unset to skip.
      // Socials always take priority if a slug clashes with a platform name.
      slug: 'portfolio',
    },
    {
      title: 'Mentorize',
      url: 'https://mentorize.me',
      icon: 'https://mentorize.me/favicon.ico', // external image URL
      description: 'Where mentors help you memorize',
      slug: 'mentorize',
    },
    {
      title: 'Chronitask',
      url: 'https://chronitask.germondai.com',
      icon: 'https://chronitask.germondai.com/assets/img/chronitask.ico',
      description: 'Your personal time keeper',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/germondai',
      icon: 'icon:github:mono:fff', // tech icon, white mono
      description: 'Open source projects & contributions',
    },
    {
      // Set `enabled: false` to hide a link without deleting it (default: true)
      title: '@germondai/links',
      url: 'https://github.com/germondai/links',
      icon: 'icon:nextjs:mono:fff',
      description: 'This project - fork it and make it yours',

      // Per-link style override - overrides appearance.linkStyle for this entry only.
      // Options: 'default' | 'pill' | 'outline' | 'neon'
      style: 'neon',
    },
  ],

  // ── Appearance ────────────────────────────────────────────────────────────
  appearance: {
    // Color theme - sets the background gradient and accent color.
    // 15 built-in options:
    //   Dark:     phantom |
    //             aurora | midnight | obsidian | cosmic | neon
    //   Warm:     rose | sunset | crimson | golden | candy
    //   Cool:     emerald | forest | ocean | arctic
    theme: 'aurora',

    // Font family (optional, default: 'Inter').
    // The font is downloaded at build time, self-hosted locally, and served
    // with next/font fallback metrics (ascent/descent/size-adjust overrides)
    // to prevent CLS — no Google CDN requests at runtime.
    //
    // Available (41 fonts):
    //   Geometric sans:     Inter | Geist | Roboto | Montserrat | Urbanist |
    //                       Hanken_Grotesk | Bricolage_Grotesque
    //   Humanist sans:      Poppins | Nunito | Nunito_Sans | Raleway | Lato |
    //                       Open_Sans | Cabin | Work_Sans | Mulish | Quicksand |
    //                       Josefin_Sans | Figtree | Manrope
    //   Professional sans:  DM_Sans | Outfit | Plus_Jakarta_Sans | Rubik | Lexend
    //   Techy / disp. sans: Space_Grotesk | Syne | Barlow | Oxanium
    //   Monospace:          JetBrains_Mono | Fira_Code | IBM_Plex_Mono | Source_Code_Pro
    //   Serif:              Playfair_Display | Merriweather | Lora | EB_Garamond |
    //                       Cormorant_Garamond | DM_Serif_Display
    //   Display:            Bebas_Neue | Anton
    // font: 'Poppins',

    // Hex override for the accent color (optional).
    // Replaces the theme's default accent everywhere - avatar glow, neon links, beams, etc.
    // accentColor: '#ff6b6b',

    // Custom background - overrides the theme gradient (optional).
    // background: { type: 'color',  src: '#09090b' }
    // background: { type: 'image',  src: 'https://example.com/bg.jpg', overlayOpacity: 0.5 }
    // background: { type: 'video',  src: 'https://example.com/bg.mp4', overlayOpacity: 0.4 }
    // background: { type: 'gradient', gradientFrom: '#0d0d0d', gradientTo: '#1a0a3e', gradientAngle: 160 }

    // Default style applied to all link buttons (per-link `style` overrides this).
    // Options: 'default' | 'pill' | 'outline' | 'neon'
    linkStyle: 'default',

    // Glass card background opacity - 0 (transparent) to 1 (opaque). Default: 0.1
    glassOpacity: 0.08,

    // Backdrop blur strength in px. Default: 20
    blur: 20,

    // Glowing ring around the avatar image. Default: true
    avatarGlow: true,

    // Enables beam + particle background animations. Default: true
    // Set false for a static background (accessibility / performance preference).
    backgroundAnimation: true,
  },

  // ── Effects ───────────────────────────────────────────────────────────────
  // Toggle each visual effect independently. All default to true.
  effects: {
    beams: true, // sweeping light beams across the background
    particles: true, // floating particle dots that drift upward
    lensFlares: true, // radial light burst triggered on link click
    noiseTexture: true, // subtle SVG film-grain overlay
  },

  // ── SEO & GEO ─────────────────────────────────────────────────────────────
  seo: {
    // Browser tab <title> + OG/Twitter title.
    // Default: "{profile.name} - Links"
    title: "Germond's Links",

    // Meta description + OG/Twitter description.
    // Default: profile.bio
    description: 'Aspiring Full-Stack Web Developer.',

    // Optional static OG image URL.
    // Leave unset to use the auto-generated opengraph-image.tsx (recommended).
    // ogImage: 'https://example.com/custom-og.png',

    // Twitter/X @handle for twitter:creator meta tag (include the @)
    twitterHandle: '@germondai',

    // Meta keywords array
    keywords: ['germondai', 'links', 'portfolio', 'web developer', 'full-stack'],

    // BCP 47 locale tag - sets OG locale and <html lang>. Default: 'en_US'
    locale: 'en_US',

    // Full canonical URL of your deployed site.
    // Used for sitemap.xml, robots.txt, canonical <link>, JSON-LD, and PWA manifest.
    canonicalUrl: 'https://links.germondai.com',

    // Your PRIMARY website URL - tells search engines which domain is your main entity
    // so they rank it first, not your links subdomain.
    // Auto-derived from canonicalUrl by stripping the first subdomain:
    //   links.germondai.com → germondai.com
    //   www.germondai.com   → germondai.com
    // Set explicitly for country TLDs like .co.uk or .com.au.
    mainSiteUrl: 'https://germondai.com',
  },
}

export default config
