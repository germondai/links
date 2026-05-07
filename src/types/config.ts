// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

export type FontName =
  // sans-serif — geometric / grotesque
  | 'Inter'
  | 'Geist'
  | 'Roboto'
  | 'Montserrat'
  | 'Urbanist'
  | 'Hanken_Grotesk'
  | 'Bricolage_Grotesque'
  // sans-serif — humanist / friendly
  | 'Poppins'
  | 'Nunito'
  | 'Nunito_Sans'
  | 'Raleway'
  | 'Lato'
  | 'Open_Sans'
  | 'Cabin'
  | 'Work_Sans'
  | 'Mulish'
  | 'Quicksand'
  | 'Josefin_Sans'
  | 'Figtree'
  | 'Manrope'
  // sans-serif — professional / neutral
  | 'DM_Sans'
  | 'Outfit'
  | 'Plus_Jakarta_Sans'
  | 'Rubik'
  | 'Lexend'
  // sans-serif — techy / display sans
  | 'Space_Grotesk'
  | 'Syne'
  | 'Barlow'
  | 'Oxanium'
  // monospace
  | 'JetBrains_Mono'
  | 'Fira_Code'
  | 'IBM_Plex_Mono'
  | 'Source_Code_Pro'
  // serif
  | 'Playfair_Display'
  | 'Merriweather'
  | 'Lora'
  | 'EB_Garamond'
  | 'Cormorant_Garamond'
  | 'DM_Serif_Display'
  // display
  | 'Bebas_Neue'
  | 'Anton'

export type Theme =
  | 'phantom'
  | 'aurora'
  | 'midnight'
  | 'rose'
  | 'emerald'
  | 'sunset'
  | 'obsidian'
  | 'neon'
  | 'ocean'
  | 'forest'
  | 'crimson'
  | 'golden'
  | 'arctic'
  | 'candy'
  | 'cosmic'

export type BackgroundType = 'gradient' | 'color' | 'image' | 'video'

export interface Background {
  type: BackgroundType
  src?: string // hex color for 'color', URL for 'image' / 'video'
  overlayOpacity?: number // 0–1 darkening overlay for image / video (default 0.5)
  fit?: 'cover' | 'contain' // image only (default 'cover')
  // gradient overrides - leave unset to use theme defaults
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
  gradientAngle?: number // degrees, default 135
}

export type LinkStyle = 'default' | 'pill' | 'outline' | 'neon'

export type SocialPlatform =
  // core
  | 'github'
  | 'twitter'
  | 'bluesky'
  | 'threads'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'tiktok'
  | 'twitch'
  | 'linkedin'
  | 'discord'
  | 'telegram'
  | 'whatsapp'
  | 'reddit'
  | 'spotify'
  // creator / portfolio
  | 'patreon'
  | 'kofi'
  | 'producthunt'
  | 'dribbble'
  | 'behance'
  // dev
  | 'devto'
  | 'hashnode'
  | 'medium'
  | 'steam'
  // generic
  | 'website'
  | 'email'

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

export interface Link {
  title: string
  url: string
  // emoji, 'icon:slug' (icons.germondai.com), or 'https://...' image URL
  icon?: string
  description?: string
  style?: LinkStyle
  enabled?: boolean
  // optional short-URL slug — yourdomain.com/slug → this link's URL
  // lowercase letters, numbers and hyphens only
  slug?: string
}

export interface Effects {
  beams: boolean
  particles: boolean
  lensFlares: boolean
  noiseTexture: boolean
}

export interface Appearance {
  theme: Theme
  font?: FontName
  background?: Background
  accentColor?: string
  glassOpacity?: number
  linkStyle?: LinkStyle
  blur?: number
  avatarGlow?: boolean
  backgroundAnimation?: boolean
}

export interface LinksConfig {
  profile: {
    name: string
    username: string
    bio?: string
    avatar?: string
    verified?: boolean
  }
  socials?: SocialLink[]
  links: Link[]
  appearance?: Appearance
  effects?: Partial<Effects>
  seo?: {
    title?: string
    description?: string
    ogImage?: string
    twitterHandle?: string
    keywords?: string[]
    locale?: string
    canonicalUrl?: string
    // Your main website URL. Used in JSON-LD so search engines associate this page
    // with the right primary entity (e.g. "https://germondai.com").
    // Auto-derived by stripping the first subdomain from canonicalUrl if omitted
    // (links.germondai.com → germondai.com). Set explicitly for .co.uk / .com.au etc.
    mainSiteUrl?: string
  }
}
