// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useFlare } from '@/hooks/useFlare'
import { cn } from '@/lib/cn'
import type { Link } from '@/types/config'

const linkButtonVariants = cva(
  'relative flex items-center gap-3 w-full px-5 py-4 text-left font-medium transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
  {
    variants: {
      variant: {
        default:
          'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl backdrop-blur-sm',
        pill: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-full backdrop-blur-sm',
        outline:
          'bg-transparent hover:bg-white/5 text-white border-2 border-white/30 hover:border-white/60 rounded-xl',
        neon: 'bg-black/30 hover:bg-black/40 text-white border border-[var(--accent)] hover:shadow-[0_0_20px_var(--accent)] rounded-xl backdrop-blur-sm',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

interface LinkButtonProps extends VariantProps<typeof linkButtonVariants> {
  link: Link
}

export const LinkButton = ({ link, variant }: LinkButtonProps) => {
  const triggerFlare = useFlare()
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => triggerFlare(e.clientX, e.clientY)

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkButtonVariants({ variant }))}
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {link.icon && <Icon icon={link.icon} size={20} className="shrink-0" />}
      <div className="flex-1 min-w-0">
        <span className="block font-semibold truncate">{link.title}</span>
        {link.description && (
          <span className="block text-sm text-white/50 truncate mt-0.5">{link.description}</span>
        )}
      </div>
      <ExternalLink
        size={14}
        className="shrink-0 text-white/30 group-hover:text-white/60 transition-colors"
        aria-hidden="true"
      />
    </motion.a>
  )
}
