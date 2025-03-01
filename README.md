# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Status

[![Test](https://github.com/negi524/remix-starter/actions/workflows/test.yml/badge.svg)](https://github.com/negi524/remix-starter/actions/workflows/test.yml)

## Development

Run the dev server:

```shellscript
yarn dev
```

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `yarn build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Test

Run test:

```sh
yarn test
```

Run test with coverage:

```sh
yarn test:coverage
```

Preview test results in UI:

```sh
yarn test:ui
```
