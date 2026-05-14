FROM oven/bun:1.3.14-slim AS base

WORKDIR /app

# ── install ──────────────────────────────────────────────────────────────────
FROM base AS install

COPY package.json bun.lock ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun --bun install --shamefully-hoist --frozen-lockfile

# ── build ────────────────────────────────────────────────────────────────────
FROM base AS build

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=install /app/node_modules ./node_modules
COPY . .

RUN bun --bun run build

# ── release ──────────────────────────────────────────────────────────────────
FROM base AS release

LABEL org.opencontainers.image.title="@germondai/links" \
      org.opencontainers.image.description="Self-hostable personal link page - FOSS Linktree alternative" \
      org.opencontainers.image.url="https://github.com/germondai/links" \
      org.opencontainers.image.source="https://github.com/germondai/links" \
      org.opencontainers.image.licenses="AGPL-3.0-or-later"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build --chown=bun:bun /app/public           ./public
COPY --from=build --chown=bun:bun /app/.next/standalone ./
COPY --from=build --chown=bun:bun /app/.next/static     ./.next/static

RUN mkdir -p .next
RUN chown bun:bun .next

USER bun

EXPOSE 3000

CMD ["bun", "--bun", "server.js"]
