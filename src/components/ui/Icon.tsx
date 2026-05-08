// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

// Renders a link icon from three sources:
//   'icon:slug'       → tech icon from icons.germondai.com (e.g. 'icon:typescript')
//   'https://...'     → external image URL
//   anything else     → emoji / plain text span

const ICONS_BASE = 'https://icons.germondai.com/icons'

const isIconSlug = (s: string) => s.startsWith('icon:')
const isUrl = (s: string) => s.startsWith('https://') || s.startsWith('http://')

interface IconProps {
  icon: string
  size?: number
  className?: string
}

export const Icon = ({ icon, size = 20, className }: IconProps) => {
  if (isIconSlug(icon)) {
    const slug = icon.slice(5)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${ICONS_BASE}?i=${slug}&theme=transparent&size=40&perline=1&pad=0`}
        alt={slug}
        width={size}
        height={size}
        loading="lazy"
        className={className}
        aria-hidden="true"
      />
    )
  }

  if (isUrl(icon)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={className}
        aria-hidden="true"
      />
    )
  }

  return (
    <span style={{ fontSize: size }} aria-hidden="true" className={className}>
      {icon}
    </span>
  )
}
