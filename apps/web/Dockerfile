FROM node:22.14.0-alpine AS nodebase

ARG PACKAGE_NAME
ARG CI
ENV CI=${CI}
ARG DO_NOT_TRACK
ENV DO_NOT_TRACK=${DO_NOT_TRACK}
ARG TURBO_TEAM
ARG TURBO_TOKEN
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"


FROM nodebase AS pruner

RUN apk update
RUN apk add --no-cache libc6-compat

RUN [ "$CI" != "true" ] && npm config set registry https://registry.npmmirror.com || true
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store

WORKDIR /app


COPY . .

RUN pnpm install turbo -g
RUN turbo prune $PACKAGE_NAME --docker


FROM nodebase AS builder

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

RUN pnpm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm run build


FROM nginxinc/nginx-unprivileged:1.26.3-alpine AS runner

COPY --from=pruner --chown=nginx:nginx /app/apps/web/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=pruner --chown=nginx:nginx /app/apps/web/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=builder --chown=nginx:nginx /app/apps/web/dist/ .

EXPOSE 80 443 8080 4433
