FROM node:22.14.0-alpine AS base

ARG PACKAGE_NAME
ARG CI
ENV CI=${CI}
ARG DO_NOT_TRACK
ENV DO_NOT_TRACK=${DO_NOT_TRACK}
ARG TURBO_TEAM
ARG TURBO_TOKEN
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"


FROM base AS pruner

RUN apk update
RUN apk add --no-cache libc6-compat

RUN [ "$CI" != "true" ] && npm config set registry https://registry.npmmirror.com || true
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store

WORKDIR /app

COPY . .

RUN pnpm install turbo -g
RUN turbo prune $PACKAGE_NAME --docker


FROM base AS builder

ENV TURBO_TEAM=$TURBO_TEAM
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN apk update
RUN apk add --no-cache libc6-compat

RUN [ "$CI" != "true" ] && npm config set registry https://registry.npmmirror.com || true
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store

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

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nodejs
USER nodejs

WORKDIR /app

COPY --from=builder --chown=nodejs:nodejs /app .

ENTRYPOINT ["node", "apps/server/dist/index.js"]

EXPOSE 5183
