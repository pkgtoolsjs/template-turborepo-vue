FROM node:22.14.0-alpine AS nodebase
FROM nginx:stable-alpine AS nginx

ENV PACKAGE_NAME=@template-turborepo-vue/web

FROM nodebase AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

WORKDIR /app
RUN pnpm install turbo -g

COPY . .

RUN turbo prune @template-turborepo-vue/web --docker


FROM nodebase AS installer

RUN apk update
RUN apk add --no-cache libc6-compat

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


FROM nginx AS runner

WORKDIR /usr/share/nginx

COPY --from=installer --chown=nginx:nginx /app/apps/web/dist ./html

EXPOSE 80
