// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import Image from 'next/image'
import { cn } from '@/lib/cn'

interface AvatarProps {
  src?: string
  name: string
  glow?: boolean
  size?: number
}

export const Avatar = ({ src, name, glow = true, size = 96 }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  return (
    <div
      className={cn(
        'relative rounded-full ring-2 ring-white/10 overflow-hidden shrink-0',
        glow && 'shadow-[0_0_32px_var(--accent)]',
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover"
        />
      ) : (
        <div
          className="flex items-center justify-center w-full h-full text-xl font-bold text-white"
          style={{ background: 'var(--accent)' }}
        >
          {initials}
        </div>
      )}
    </div>
  )
}
