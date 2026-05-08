// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { create } from 'zustand'
import { type ResolvedConfig, resolveConfig } from '@/lib/config'
import type { LinksConfig } from '@/types/config'
import rawConfig from '../../links.config'

interface ConfigStore {
  raw: LinksConfig
  resolved: ResolvedConfig
  update: (fn: (prev: LinksConfig) => LinksConfig) => void
}

export const useConfigStore = create<ConfigStore>((set) => ({
  raw: rawConfig,
  resolved: resolveConfig(rawConfig),
  update: (fn) =>
    set((s) => {
      const next = fn(s.raw)
      return { raw: next, resolved: resolveConfig(next) }
    }),
}))
