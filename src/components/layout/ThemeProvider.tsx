// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    {children}
  </NextThemesProvider>
)
