FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.30.2 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY landing/package.json ./landing/
COPY packages/ ./packages/
COPY docs/ ./docs/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/landing/node_modules ./landing/node_modules
COPY . .
WORKDIR /app/landing
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/landing/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/landing/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/landing/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
