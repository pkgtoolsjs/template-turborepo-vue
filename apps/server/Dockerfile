FROM node:22.14.0-alpine AS base

# —————————————— 构建阶段 ——————————————
FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm \
  && pnpm config set registry https://registry.npmmirror.com

WORKDIR /app
RUN pnpm install turbo -g
COPY . .

# 精简项目
RUN pnpm run prune:server


# —————————————— 安装阶段 ——————————————
FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm \
  && pnpm config set registry https://registry.npmmirror.com

WORKDIR /app

# 安装依赖（全量安装）
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install

# 构建项目
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm run build


# —————————————— 运行阶段 ——————————————
FROM base AS runner

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm \
  && pnpm config set registry https://registry.npmmirror.com

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

WORKDIR /app

COPY --from=installer /app .

ENV CI=1
RUN pnpm install -P

EXPOSE 5183

USER nodejs
CMD ["node", "apps/server/dist/index.js"]
