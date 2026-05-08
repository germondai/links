// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { create } from 'zustand'

interface FlareEvent {
  x: number
  y: number
  id: number
}

interface FlareStore {
  events: FlareEvent[]
  trigger: (x: number, y: number) => void
  clear: (id: number) => void
}

export const useFlareStore = create<FlareStore>((set) => ({
  events: [],
  trigger: (x, y) =>
    set((state) => ({
      events: [...state.events, { x, y, id: Date.now() }],
    })),
  clear: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}))
