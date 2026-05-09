// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const Beam = ({ index }: { index: number }) => {
  const angle = (index * 137.5) % 360
  const delay = index * 0.8
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `linear-gradient(${angle}deg, transparent 40%, var(--beam-color) 50%, transparent 60%)`,
        opacity: 0,
      }}
      animate={{ opacity: [0, 0.06, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
}

export const BeamEffect = ({ count = 5 }: { count?: number }) => {
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <Beam key={`beam-${i}`} index={i} />
      ))}
    </div>
  )
}
