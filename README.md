# template-turborepo-vue [![CI](https://github.com/nice-winter/template-turborepo-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/nice-winter/template-turborepo-vue/actions/workflows/ci.yml)

A monorepo project template managed with Turborepo, including both web and server applications.

## Using this example

Run the following command:

```sh
npx degit https://github.com/nice-winter/template-turborepo-vue.git my-turborepo
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

#### apps:

- `web`: A [Vue 3](https://vuejs.org/) app with [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/), and [Nuxt UI](https://ui.nuxt.com/)
- `server`: A simple [Fastify](https://fastify.dev/)-powered server that exposes APIs for the web app

#### packages:

- `ui`: a stub Vue component library shared by both `web` and other Vue3-based applications
- `eslint-config`: shared ESLint configuration used across projects
- `tsconfig`: shared tsconfig.json configurations used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/docs/reference/configuration)
- [CLI Usage](https://turbo.build/docs/reference/command-line-reference)
