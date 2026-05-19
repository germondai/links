// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { Reorder, useDragControls } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  GripVertical,
  Plus,
  Settings,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/cn'
import { FONT_NAMES, fontLabel } from '@/lib/font-meta'
import { THEMES } from '@/lib/themes'
import { useConfigStore } from '@/store/config'
import type {
  Appearance,
  Background,
  BackgroundType,
  FontName,
  Link,
  LinkStyle,
  LinksConfig,
  SocialLink,
  SocialPlatform,
  Theme,
} from '@/types/config'

// ── constants ────────────────────────────────────────────────────────────────

const ALL_THEMES = Object.keys(THEMES) as Theme[]
const ALL_LINK_STYLES: LinkStyle[] = ['default', 'pill', 'outline', 'neon']
const ALL_PLATFORMS: SocialPlatform[] = [
  // core social
  'github',
  'twitter',
  'bluesky',
  'threads',
  'instagram',
  'facebook',
  'reddit',
  // video / music
  'youtube',
  'tiktok',
  'twitch',
  'spotify',
  // professional
  'linkedin',
  // messaging
  'discord',
  'telegram',
  'whatsapp',
  // creator
  'patreon',
  'kofi',
  'producthunt',
  // design
  'dribbble',
  'behance',
  // dev
  'devto',
  'hashnode',
  'medium',
  'steam',
  // generic
  'website',
  'email',
]

// ── serializer ───────────────────────────────────────────────────────────────

const serializeConfig = (config: LinksConfig): string => {
  const cleaned = JSON.parse(JSON.stringify(config)) as LinksConfig
  const ts = JSON.stringify(cleaned, null, 2).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/g, '$1:')
  return [
    '// SPDX-License-Identifier: AGPL-3.0-or-later',
    '// Copyright (C) 2025 germondai - https://github.com/germondai',
    '',
    "import type { LinksConfig } from './src/types/config'",
    '',
    `const config: LinksConfig = ${ts}`,
    '',
    'export default config',
  ].join('\n')
}

// ── small UI helpers ─────────────────────────────────────────────────────────

const INPUT = cn(
  'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white',
  'placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors',
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs text-white/40 block mb-1">{children}</span>
)

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-xs text-white/50 shrink-0">{label}</span>
    {children}
  </div>
)

const Section = ({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
      >
        {title}
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>
      {open && <div className="px-4 py-3 space-y-3">{children}</div>}
    </div>
  )
}

// ── drag-and-drop item sub-components ────────────────────────────────────────
// Each needs useDragControls, which is a hook - requires its own component.

const GRIP =
  'shrink-0 cursor-grab active:cursor-grabbing text-white/25 hover:text-white/50 transition-colors touch-none'

interface LinkCardProps {
  link: Link
  onUpdate: (fn: (l: Link) => Link) => void
  onRemove: () => void
}

const LinkCard = ({ link, onUpdate, onRemove }: LinkCardProps) => {
  const controls = useDragControls()
  return (
    <Reorder.Item
      value={link}
      dragListener={false}
      dragControls={controls}
      as="div"
      className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2"
    >
      <div className="flex gap-2">
        <button
          type="button"
          className={GRIP}
          onPointerDown={(e) => {
            e.preventDefault()
            controls.start(e)
          }}
        >
          <GripVertical size={13} />
        </button>
        <input
          className={cn(INPUT, 'w-16 text-center')}
          placeholder="🔗"
          value={link.icon ?? ''}
          onChange={(e) => {
            const val = e.target.value
            onUpdate((l) => (val ? { ...l, icon: val } : (({ icon: _, ...r }) => r)(l)))
          }}
        />
        <input
          className={cn(INPUT, 'flex-1')}
          placeholder="Title"
          value={link.title}
          onChange={(e) => onUpdate((l) => ({ ...l, title: e.target.value }))}
        />
        <button
          type="button"
          onClick={onRemove}
          className="text-white/25 hover:text-red-400 transition-colors shrink-0"
        >
          <Trash2 size={13} />
        </button>
      </div>
      <input
        className={INPUT}
        placeholder="https://"
        value={link.url}
        onChange={(e) => onUpdate((l) => ({ ...l, url: e.target.value }))}
      />
      <input
        className={INPUT}
        placeholder="Description (optional)"
        value={link.description ?? ''}
        onChange={(e) => {
          const val = e.target.value
          onUpdate((l) => (val ? { ...l, description: val } : (({ description: _, ...r }) => r)(l)))
        }}
      />
      <input
        className={INPUT}
        placeholder="slug (optional) - yourdomain.com/slug → this link"
        value={link.slug ?? ''}
        onChange={(e) => {
          // sanitise: lowercase, alphanumeric + hyphens only
          const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
          onUpdate((l) => (val ? { ...l, slug: val } : (({ slug: _, ...r }) => r)(l)))
        }}
      />
      <div className="flex gap-1.5">
        {ALL_LINK_STYLES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onUpdate((l) => ({ ...l, style: s }))}
            className={cn(
              'flex-1 py-0.5 rounded-md text-xs border transition-colors',
              (link.style ?? 'default') === s
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70',
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </Reorder.Item>
  )
}

interface SocialCardProps {
  social: SocialLink
  onUpdate: (patch: Partial<SocialLink>) => void
  onRemove: () => void
}

const SocialCard = ({ social, onUpdate, onRemove }: SocialCardProps) => {
  const controls = useDragControls()
  return (
    <Reorder.Item
      value={social}
      dragListener={false}
      dragControls={controls}
      as="div"
      className="flex gap-2 items-center"
    >
      <button
        type="button"
        className={GRIP}
        onPointerDown={(e) => {
          e.preventDefault()
          controls.start(e)
        }}
      >
        <GripVertical size={13} />
      </button>
      <select
        className={cn(INPUT, 'w-28 shrink-0')}
        value={social.platform}
        onChange={(e) => onUpdate({ platform: e.target.value as SocialPlatform })}
      >
        {ALL_PLATFORMS.map((pl) => (
          <option key={pl} value={pl}>
            {pl}
          </option>
        ))}
      </select>
      <input
        className={cn(INPUT, 'flex-1 min-w-0')}
        placeholder="URL"
        value={social.url}
        onChange={(e) => onUpdate({ url: e.target.value })}
      />
      <button
        type="button"
        onClick={onRemove}
        className="text-white/25 hover:text-red-400 transition-colors shrink-0"
      >
        <Trash2 size={13} />
      </button>
    </Reorder.Item>
  )
}

// ── helpers ──────────────────────────────────────────────────────────────────

type SeoFields = NonNullable<LinksConfig['seo']>

// Merge a partial SEO patch into the existing seo object (creates it if absent)
const patchSeo = (p: LinksConfig, patch: Partial<SeoFields>): LinksConfig => ({
  ...p,
  seo: { ...(p.seo ?? {}), ...patch },
})

// Remove a specific SEO field; drops the seo object entirely if it becomes empty
const clearSeoField = (p: LinksConfig, key: keyof SeoFields): LinksConfig => {
  if (!p.seo) return p
  const { [key]: _, ...rest } = p.seo
  if (Object.keys(rest).length) return { ...p, seo: rest }
  const { seo: __, ...withoutSeo } = p
  return withoutSeo
}

// `as Appearance` needed because spreading `Appearance | undefined` makes all
// keys optional in the inferred type, including the required `theme` field.
const patchApp = (p: LinksConfig, patch: Partial<Appearance>): Appearance =>
  ({ ...(p.appearance ?? { theme: 'aurora' as Theme }), ...patch }) as Appearance

const patchBg = (p: LinksConfig, patch: Partial<Background>): Background => ({
  ...(p.appearance?.background ?? { type: 'gradient' as BackgroundType }),
  ...patch,
})

// ── DevPanel ─────────────────────────────────────────────────────────────────

let uidCounter = 0
const uid = () => `_${++uidCounter}`

export const DevPanel = () => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { raw, update } = useConfigStore()

  // Stable per-session UIDs - survive platform/url changes without key churn
  const [linkIds, setLinkIds] = useState<string[]>(() => raw.links.map(uid))
  const [socialIds, setSocialIds] = useState<string[]>(() => (raw.socials ?? []).map(uid))

  const set = (fn: (prev: LinksConfig) => LinksConfig) => update(fn)

  const addLink = () => {
    setLinkIds((ids) => [...ids, uid()])
    set((p) => ({ ...p, links: [...p.links, { title: 'New Link', url: 'https://' }] }))
  }

  const removeLink = (i: number) => {
    setLinkIds((ids) => ids.filter((_, j) => j !== i))
    set((p) => ({ ...p, links: p.links.filter((_, j) => j !== i) }))
  }

  const handleLinksReorder = (newLinks: Link[]) => {
    const cur = raw.links
    setLinkIds((ids) =>
      newLinks.map((l) => {
        const idx = cur.indexOf(l)
        return idx >= 0 ? (ids.at(idx) ?? uid()) : uid()
      }),
    )
    set((p) => ({ ...p, links: newLinks }))
  }

  const addSocial = () => {
    setSocialIds((ids) => [...ids, uid()])
    set((p) => ({
      ...p,
      socials: [...(p.socials ?? []), { platform: 'website' as const, url: 'https://' }],
    }))
  }

  const removeSocial = (i: number) => {
    setSocialIds((ids) => ids.filter((_, j) => j !== i))
    set((p) => ({ ...p, socials: (p.socials ?? []).filter((_, j) => j !== i) }))
  }

  const handleSocialsReorder = (newSocials: SocialLink[]) => {
    const cur = raw.socials ?? []
    setSocialIds((ids) =>
      newSocials.map((s) => {
        const idx = cur.indexOf(s)
        return idx >= 0 ? (ids.at(idx) ?? uid()) : uid()
      }),
    )
    set((p) => ({ ...p, socials: newSocials }))
  }

  const copyConfig = async () => {
    await navigator.clipboard.writeText(serializeConfig(raw))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Dev Config"
        className={cn(
          'fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full',
          'flex items-center justify-center',
          'border backdrop-blur-sm transition-all duration-200',
          open
            ? 'bg-white/20 border-white/40 text-white'
            : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white/60 hover:text-white',
        )}
      >
        <Settings size={15} />
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed right-0 top-0 bottom-0 z-40 w-full sm:w-80 flex flex-col border-l border-white/10"
          style={{ background: 'rgba(9,9,11,0.94)', backdropFilter: 'blur(24px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
            <span className="text-sm font-semibold text-white">Dev Config</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">
            {/* ── Profile ── */}
            <Section title="Profile" defaultOpen>
              <div>
                <Label>Name</Label>
                <input
                  className={INPUT}
                  value={raw.profile.name}
                  onChange={(e) =>
                    set((p) => ({ ...p, profile: { ...p.profile, name: e.target.value } }))
                  }
                />
              </div>
              <div>
                <Label>Username</Label>
                <input
                  className={INPUT}
                  value={raw.profile.username}
                  onChange={(e) =>
                    set((p) => ({ ...p, profile: { ...p.profile, username: e.target.value } }))
                  }
                />
              </div>
              <div>
                <Label>Bio</Label>
                <textarea
                  className={cn(INPUT, 'resize-none h-16')}
                  value={raw.profile.bio ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) => {
                      const profile = val
                        ? { ...p.profile, bio: val }
                        : (({ bio: _, ...rest }) => rest)(p.profile)
                      return { ...p, profile }
                    })
                  }}
                />
              </div>
              <div>
                <Label>Avatar URL</Label>
                <input
                  className={INPUT}
                  placeholder="https://github.com/you.png"
                  value={raw.profile.avatar ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) => {
                      const profile = val
                        ? { ...p.profile, avatar: val }
                        : (({ avatar: _, ...rest }) => rest)(p.profile)
                      return { ...p, profile }
                    })
                  }}
                />
              </div>
              <Row label="Verified badge">
                <Switch
                  checked={raw.profile.verified ?? false}
                  onCheckedChange={(v) =>
                    set((p) => ({ ...p, profile: { ...p.profile, verified: v } }))
                  }
                />
              </Row>
            </Section>

            {/* ── Appearance ── */}
            <Section title="Appearance">
              <div>
                <Label>Theme</Label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_THEMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set((p) => ({ ...p, appearance: patchApp(p, { theme: t }) }))}
                      className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-colors',
                        (raw.appearance?.theme ?? 'aurora') === t
                          ? 'bg-white/20 border-white/40 text-white'
                          : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10',
                      )}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: THEMES[t].accent }}
                      />
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Link Style</Label>
                <div className="flex gap-1.5">
                  {ALL_LINK_STYLES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        set((p) => ({ ...p, appearance: patchApp(p, { linkStyle: s }) }))
                      }
                      className={cn(
                        'flex-1 py-1 rounded-lg text-xs border transition-colors',
                        (raw.appearance?.linkStyle ?? 'default') === s
                          ? 'bg-white/20 border-white/40 text-white'
                          : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10',
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Accent color override</Label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer shrink-0"
                    value={
                      raw.appearance?.accentColor ??
                      THEMES[raw.appearance?.theme ?? 'aurora'].accent
                    }
                    onChange={(e) =>
                      set((p) => ({
                        ...p,
                        appearance: patchApp(p, { accentColor: e.target.value }),
                      }))
                    }
                  />
                  <input
                    className={INPUT}
                    placeholder="Leave empty to use theme"
                    value={raw.appearance?.accentColor ?? ''}
                    onChange={(e) => {
                      const val = e.target.value
                      set((p) => {
                        if (val) return { ...p, appearance: patchApp(p, { accentColor: val }) }
                        const { accentColor: _, ...rest } = patchApp(p, {})
                        return { ...p, appearance: rest }
                      })
                    }}
                  />
                </div>
              </div>
              <div>
                <Label>Font</Label>
                <div className="flex flex-wrap gap-1.5">
                  {FONT_NAMES.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() =>
                        set((p) => ({ ...p, appearance: patchApp(p, { font: f as FontName }) }))
                      }
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-xs border transition-colors',
                        (raw.appearance?.font ?? 'Inter') === f
                          ? 'bg-white/20 border-white/40 text-white'
                          : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10',
                      )}
                    >
                      {fontLabel(f)}
                    </button>
                  ))}
                </div>
              </div>
              <Row label="Avatar glow">
                <Switch
                  checked={raw.appearance?.avatarGlow ?? true}
                  onCheckedChange={(v) =>
                    set((p) => ({ ...p, appearance: patchApp(p, { avatarGlow: v }) }))
                  }
                />
              </Row>
              <Row label="Background animation">
                <Switch
                  checked={raw.appearance?.backgroundAnimation ?? true}
                  onCheckedChange={(v) =>
                    set((p) => ({ ...p, appearance: patchApp(p, { backgroundAnimation: v }) }))
                  }
                />
              </Row>
            </Section>

            {/* ── Background ── */}
            <Section title="Background">
              {(() => {
                const bg = raw.appearance?.background ?? { type: 'gradient' as BackgroundType }
                const setBg = (patch: Partial<Background>) =>
                  set((p) => ({ ...p, appearance: patchApp(p, { background: patchBg(p, patch) }) }))

                return (
                  <>
                    <div>
                      <Label>Type</Label>
                      <div className="flex gap-1.5">
                        {(['gradient', 'color', 'image', 'video'] as BackgroundType[]).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setBg({ type: t })}
                            className={cn(
                              'flex-1 py-1 rounded-lg text-xs border transition-colors',
                              bg.type === t
                                ? 'bg-white/20 border-white/40 text-white'
                                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10',
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {bg.type === 'gradient' && (
                      <>
                        {(['gradientFrom', 'gradientVia', 'gradientTo'] as const).map((key) => {
                          const labels = {
                            gradientFrom: 'From',
                            gradientVia: 'Via',
                            gradientTo: 'To',
                          }
                          return (
                            <div key={key}>
                              <Label>{labels[key]}</Label>
                              <div className="flex gap-2 items-center">
                                <input
                                  type="color"
                                  className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer shrink-0"
                                  value={bg[key] ?? '#000000'}
                                  onChange={(e) => setBg({ [key]: e.target.value })}
                                />
                                <input
                                  className={INPUT}
                                  placeholder="theme default"
                                  value={bg[key] ?? ''}
                                  onChange={(e) => setBg({ [key]: e.target.value })}
                                />
                              </div>
                            </div>
                          )
                        })}
                        <div>
                          <Label>Angle - {bg.gradientAngle ?? 135}°</Label>
                          <input
                            type="range"
                            min={0}
                            max={360}
                            step={5}
                            className="w-full accent-[var(--accent)]"
                            value={bg.gradientAngle ?? 135}
                            onChange={(e) => setBg({ gradientAngle: Number(e.target.value) })}
                          />
                        </div>
                      </>
                    )}

                    {bg.type === 'color' && (
                      <div>
                        <Label>Color</Label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer shrink-0"
                            value={bg.src ?? '#09090b'}
                            onChange={(e) => setBg({ src: e.target.value })}
                          />
                          <input
                            className={INPUT}
                            placeholder="#09090b or rgba(...)"
                            value={bg.src ?? ''}
                            onChange={(e) => setBg({ src: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    {(bg.type === 'image' || bg.type === 'video') && (
                      <>
                        <div>
                          <Label>{bg.type === 'image' ? 'Image URL' : 'Video URL'}</Label>
                          <input
                            className={INPUT}
                            placeholder="https://..."
                            value={bg.src ?? ''}
                            onChange={(e) => setBg({ src: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>
                            Overlay opacity - {Math.round((bg.overlayOpacity ?? 0.5) * 100)}%
                          </Label>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            className="w-full accent-[var(--accent)]"
                            value={bg.overlayOpacity ?? 0.5}
                            onChange={(e) => setBg({ overlayOpacity: Number(e.target.value) })}
                          />
                        </div>
                        {bg.type === 'image' && (
                          <Row label="Fit">
                            <div className="flex gap-1.5">
                              {(['cover', 'contain'] as const).map((f) => (
                                <button
                                  key={f}
                                  type="button"
                                  onClick={() => setBg({ fit: f })}
                                  className={cn(
                                    'px-3 py-1 rounded-lg text-xs border transition-colors',
                                    (bg.fit ?? 'cover') === f
                                      ? 'bg-white/20 border-white/40 text-white'
                                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white',
                                  )}
                                >
                                  {f}
                                </button>
                              ))}
                            </div>
                          </Row>
                        )}
                      </>
                    )}
                  </>
                )
              })()}
            </Section>

            {/* ── Effects ── */}
            <Section title="Effects">
              {(['beams', 'particles', 'lensFlares', 'noiseTexture'] as const).map((fx) => (
                <Row
                  key={fx}
                  label={fx.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}
                >
                  <Switch
                    checked={raw.effects?.[fx] ?? true}
                    onCheckedChange={(v) =>
                      set((p) => ({ ...p, effects: { ...p.effects, [fx]: v } }))
                    }
                  />
                </Row>
              ))}
            </Section>

            {/* ── Links ── */}
            <Section title="Links">
              <div className="space-y-2">
                <Reorder.Group
                  axis="y"
                  values={raw.links}
                  onReorder={handleLinksReorder}
                  as="div"
                  className="space-y-2"
                >
                  {raw.links.map((link, i) => (
                    <LinkCard
                      key={linkIds.at(i) ?? String(i)}
                      link={link}
                      onUpdate={(fn) =>
                        set((p) => ({ ...p, links: p.links.map((l, j) => (j === i ? fn(l) : l)) }))
                      }
                      onRemove={() => removeLink(i)}
                    />
                  ))}
                </Reorder.Group>
                <button
                  type="button"
                  onClick={addLink}
                  className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-white/15 rounded-xl text-xs text-white/35 hover:text-white/60 hover:border-white/30 transition-colors"
                >
                  <Plus size={11} /> Add link
                </button>
              </div>
            </Section>

            {/* ── Socials ── */}
            <Section title="Socials">
              <div className="space-y-2">
                <Reorder.Group
                  axis="y"
                  values={raw.socials ?? []}
                  onReorder={handleSocialsReorder}
                  as="div"
                  className="space-y-2"
                >
                  {(raw.socials ?? []).map((social, i) => (
                    <SocialCard
                      key={socialIds.at(i) ?? String(i)}
                      social={social}
                      onUpdate={(patch) =>
                        set((p) => ({
                          ...p,
                          socials: (p.socials ?? []).map((s, j) =>
                            j === i ? { ...s, ...patch } : s,
                          ),
                        }))
                      }
                      onRemove={() => removeSocial(i)}
                    />
                  ))}
                </Reorder.Group>
                <button
                  type="button"
                  onClick={addSocial}
                  className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-white/15 rounded-xl text-xs text-white/35 hover:text-white/60 hover:border-white/30 transition-colors"
                >
                  <Plus size={11} /> Add social
                </button>
              </div>
            </Section>

            {/* ── SEO ── */}
            <Section title="SEO">
              <div>
                <Label>Page title</Label>
                <input
                  className={INPUT}
                  placeholder={`${raw.profile.name} - Links`}
                  value={raw.seo?.title ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) => (val ? patchSeo(p, { title: val }) : clearSeoField(p, 'title')))
                  }}
                />
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  className={cn(INPUT, 'resize-none h-16')}
                  placeholder={raw.profile.bio ?? 'Short description for search engines'}
                  value={raw.seo?.description ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) =>
                      val ? patchSeo(p, { description: val }) : clearSeoField(p, 'description'),
                    )
                  }}
                />
              </div>
              <div>
                <Label>Canonical URL</Label>
                <input
                  className={INPUT}
                  placeholder="https://links.you.com"
                  value={raw.seo?.canonicalUrl ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) =>
                      val ? patchSeo(p, { canonicalUrl: val }) : clearSeoField(p, 'canonicalUrl'),
                    )
                  }}
                />
              </div>
              <div>
                <Label>Main site URL</Label>
                <input
                  className={INPUT}
                  placeholder="auto-derived from canonical URL"
                  value={raw.seo?.mainSiteUrl ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) =>
                      val ? patchSeo(p, { mainSiteUrl: val }) : clearSeoField(p, 'mainSiteUrl'),
                    )
                  }}
                />
                <span className="text-xs text-white/25 mt-1 block">
                  Used in JSON-LD to rank your main domain first. Auto-strips subdomain from
                  canonical URL - set explicitly for .co.uk / .com.au etc.
                </span>
              </div>
              <div>
                <Label>Twitter handle</Label>
                <input
                  className={INPUT}
                  placeholder="@you"
                  value={raw.seo?.twitterHandle ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) =>
                      val ? patchSeo(p, { twitterHandle: val }) : clearSeoField(p, 'twitterHandle'),
                    )
                  }}
                />
              </div>
              <div>
                <Label>OG image URL</Label>
                <input
                  className={INPUT}
                  placeholder="/og.png"
                  value={raw.seo?.ogImage ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) => (val ? patchSeo(p, { ogImage: val }) : clearSeoField(p, 'ogImage')))
                  }}
                />
              </div>
              <div>
                <Label>Keywords (comma-separated)</Label>
                <input
                  className={INPUT}
                  placeholder="your name, links, portfolio"
                  value={raw.seo?.keywords?.join(', ') ?? ''}
                  onChange={(e) => {
                    const val = e.target.value.trim()
                    const kw = val
                      ? val
                          .split(',')
                          .map((k) => k.trim())
                          .filter(Boolean)
                      : undefined
                    set((p) => (kw ? patchSeo(p, { keywords: kw }) : clearSeoField(p, 'keywords')))
                  }}
                />
              </div>
              <div>
                <Label>Locale</Label>
                <input
                  className={INPUT}
                  placeholder="en_US"
                  value={raw.seo?.locale ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    set((p) => (val ? patchSeo(p, { locale: val }) : clearSeoField(p, 'locale')))
                  }}
                />
              </div>
            </Section>
          </div>

          {/* Footer - export */}
          <div className="shrink-0 p-4 border-t border-white/10">
            <button
              type="button"
              onClick={copyConfig}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
                copied
                  ? 'bg-green-500/20 border-green-500/40 text-green-400'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white',
              )}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy links.config.ts'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
