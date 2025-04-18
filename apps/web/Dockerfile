FROM node:22.14.0-alpine AS nodebase

ARG PACKAGE_NAME


FROM nodebase AS pruner

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store

WORKDIR /app


COPY . .

RUN pnpm install turbo -g
RUN turbo prune $PACKAGE_NAME --docker


FROM nodebase AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
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


FROM openresty/openresty:1.21.4.1-0-alpine AS runner

RUN addgroup -S nginx && adduser -S -G nginx nginx

RUN mkdir -p /var/log/nginx

RUN chown -R nginx:nginx \
    /etc/nginx \
    /var/log/nginx \
    /var/run/openresty \
    /usr/local/openresty
USER nginx

WORKDIR /usr/local/openresty/nginx/html

COPY --from=pruner --chown=nginx:nginx /app/apps/web/nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY --from=pruner --chown=nginx:nginx /app/apps/web/nginx/conf.d/ /etc/nginx/conf.d/

COPY --from=builder --chown=nginx:nginx /app/apps/web/dist .

EXPOSE 80
