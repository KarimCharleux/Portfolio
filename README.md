# Portfolio Angular

Karim CHARLEUX's portfolio — Angular 22, standalone, zoneless, SSR-capable (prerendered; deployed as static Firebase Hosting), Vitest.

## Development

Requires Node 24 (see `.nvmrc`).

```bash
nvm use
npm install
npm start
```

Navigate to `http://localhost:4200/`.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Deploy

```bash
npm run deploy
```

`npm run deploy` runs `ng build` (which prerenders the app to static HTML) and pushes
`dist/portfolio-angular/browser` to Firebase Hosting. The app's server/SSR bundle
(`dist/portfolio-angular/server`) is built as part of `ng build` but is **not** currently
deployed — real SSR would require Firebase App Hosting, which needs the Blaze (pay-as-you-go)
billing plan, not currently enabled on this project. See
`docs/superpowers/plans/2026-08-10-angular22-rewrite.md` (Task 5) for details. The site works
today as a fully static, prerendered single page, so nothing is lost by not deploying the
server bundle.
