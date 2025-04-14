FROM node:22.14.0-alpine AS base

ENV PACKAGE_NAME=@template-turborepo-vue/server

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

ENV CI=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

WORKDIR /app
RUN pnpm install turbo -g

COPY . .

RUN turbo prune $PACKAGE_NAME --docker


FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat

ENV CI=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --ignore-scripts

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm run build

RUN pnpm prune --prod --ignore-scripts
RUN find . -type d \( -name node_modules -o -name src -o -name scripts \) -prune -exec rm -rf '{}' +

RUN pnpm install -P --ignore-scripts


FROM base AS runner

RUN apk update
RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app

COPY --from=installer --chown=nodejs:nodejs /app .

EXPOSE 5183
CMD ["node", "apps/server/dist/index.js"]
