// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { cn } from '@/lib/cn'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  opacity?: number
  blur?: number
}

export const GlassCard = ({ children, className, opacity = 0.1, blur = 20 }: GlassCardProps) => (
  <div
    className={cn('rounded-2xl border border-white/10', className)}
    style={{
      background: `rgba(255,255,255,${opacity})`,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
    }}
  >
    {children}
  </div>
)
