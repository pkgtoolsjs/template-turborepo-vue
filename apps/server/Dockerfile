FROM node:22.14.0-alpine AS base

ARG PACKAGE_NAME


FROM base AS pruner

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

WORKDIR /app
RUN pnpm install turbo -g

COPY . .

RUN turbo prune $PACKAGE_NAME --docker


FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/scripts ./scripts
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm run build

RUN pnpm prune --prod
RUN find . -type d \( -name node_modules -o -name src \) -prune -exec rm -rf '{}' +

RUN pnpm install -P


FROM base AS runner

RUN apk update
RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app

COPY --from=builder --chown=nodejs:nodejs /app .

EXPOSE 5183
CMD ["node", "apps/server/dist/index.js"]
