// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useFlareStore } from '@/store/flare'

export const LightFlare = () => {
  const events = useFlareStore((s) => s.events)
  const clear = useFlareStore((s) => s.clear)
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      <AnimatePresence>
        {events.map((e) => (
          <motion.div
            key={e.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: e.x,
              top: e.y,
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
              width: 200,
              height: 200,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => clear(e.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
