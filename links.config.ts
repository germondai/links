// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { LinksConfig } from './src/types/config'

const config: LinksConfig = {
  profile: {
    name: 'Germond',
    username: 'germondai',
    bio: 'Aspiring Full-Stack Web Developer',
    avatar: 'https://github.com/germondai.png',
    verified: true,
  },

  socials: [
    { platform: 'website', url: 'https://germondai.com' },
    { platform: 'github', url: 'https://github.com/germondai' },
    { platform: 'instagram', url: 'https://instagram.com/germondai' },
    { platform: 'discord', url: 'https://discord.gg/6xU897X' },
    { platform: 'youtube', url: 'https://youtube.com/@germondai?sub_confirmation=1' },
    { platform: 'twitch', url: 'https://twitch.tv/germondai' },
    { platform: 'email', url: 'mailto:germondai@gmail.com' },
  ],

  links: [
    {
      title: 'Portfolio',
      url: 'https://germondai.com',
      icon: 'https://germondai.com/skull.ico',
      description: 'My personal portfolio web',
      slug: 'portfolio',
    },
    {
      title: 'Mentorize',
      url: 'https://mentorize.me',
      icon: 'https://mentorize.me/favicon.ico',
      description: 'Where mentors help you memorize',
      slug: 'mentorize',
    },
    {
      title: 'Chronitask',
      url: 'https://chronitask.germondai.com',
      icon: 'https://chronitask.germondai.com/assets/img/chronitask.ico',
      description: 'Your personal time keeper',
      slug: 'chronitask',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/germondai',
      icon: 'icon:github:mono:fff',
      description: 'Open source projects & contributions',
      slug: 'gh',
    },
    {
      title: '@germondai/links',
      url: 'https://github.com/germondai/links',
      icon: 'icon:nextjs:mono:fff',
      description: 'This project - fork it and make it yours',
      style: 'neon',
    },
  ],

  appearance: {
    theme: 'phantom',
    font: 'Poppins',
    linkStyle: 'default',
    glassOpacity: 0.08,
    blur: 20,
    avatarGlow: true,
    backgroundAnimation: true,
  },

  effects: {
    beams: true,
    particles: true,
    lensFlares: true,
    noiseTexture: true,
  },

  seo: {
    title: "Germond's Links",
    description: 'Aspiring Full-Stack Web Developer.',
    twitterHandle: '@germondai',
    keywords: ['germondai', 'links', 'portfolio', 'web developer', 'full-stack'],
    locale: 'en_US',
    canonicalUrl: 'https://links.germondai.com',
    mainSiteUrl: 'https://germondai.com',
  },
}

export default config
