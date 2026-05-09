// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ResolvedConfig } from '@/lib/config'
import { Avatar } from './Avatar'
import { LinkButton } from './LinkButton'
import { SocialIcons } from './SocialIcons'

export const ProfileCard = ({ config }: { config: ResolvedConfig }) => {
  const { profile, socials = [], links, appearance } = config
  const variant = appearance.linkStyle

  return (
    <motion.div
      className={cn(
        'relative z-10 w-full max-w-md mx-auto px-4 py-8',
        'flex flex-col items-center gap-6',
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Avatar
          {...(profile.avatar !== undefined ? { src: profile.avatar } : {})}
          name={profile.name}
          glow={appearance.avatarGlow}
          size={96}
        />
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
            {profile.verified && (
              <BadgeCheck
                size={20}
                className="text-[var(--accent)] shrink-0"
                aria-label="Verified"
              />
            )}
          </div>
          {profile.username && <p className="text-sm text-white/50 mt-0.5">@{profile.username}</p>}
          {profile.bio && (
            <p className="text-sm text-white/70 mt-2 max-w-xs leading-relaxed">{profile.bio}</p>
          )}
        </div>
        {socials.length > 0 && <SocialIcons socials={socials} />}
      </div>

      <div className="flex flex-col gap-3 w-full">
        {links.map((link, index) => (
          <motion.div
            key={link.url}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
          >
            <LinkButton link={link} variant={link.style ?? variant} />
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-white/20 select-none mt-1">
        Made by{' '}
        <a
          href="https://github.com/germondai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-white/60 underline underline-offset-2 decoration-white/20 transition-colors"
        >
          @germondai
        </a>
      </p>
    </motion.div>
  )
}
