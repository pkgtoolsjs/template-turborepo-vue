FROM node:22.14.0-alpine AS nodebase

ARG PACKAGE_NAME


FROM nodebase AS pruner

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


FROM nodebase AS builder

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

RUN pnpm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm run build


FROM openresty/openresty:1.21.4.1-0-alpine AS runner

# RUN addgroup -S nginx && adduser -S -G nginx nginx \
#     && mkdir -p /var/run/openresty \
#     && chown -R nginx:nginx /var/run/openresty \
#     && chown -R nginx:nginx /usr/local/openresty
# USER nginx

WORKDIR /usr/local/openresty/nginx/html

COPY --from=builder --chown=nobody:nobody /app/apps/web/dist .

EXPOSE 80
