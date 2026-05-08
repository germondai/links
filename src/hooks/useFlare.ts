// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { useCallback } from 'react'
import { useFlareStore } from '@/store/flare'

export const useFlare = () => {
  const trigger = useFlareStore((s) => s.trigger)
  return useCallback((x: number, y: number) => trigger(x, y), [trigger])
}
