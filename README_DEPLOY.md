Sugar Sale — Deploying
----------------------

This app is a Vite + React bundle that can be deployed as a static site. The
repo already contains the production-ready HTML/CSS/JS in `/dist`, but you can
regenerate the bundle whenever you need to ship a new change.

## 1. Install dependencies & build

```
npm ci
npm run build   # runs `vite build`
```

The build output is written to `dist/`. Because Tailwind is pulled in via CDN,
there is no PostCSS/Tailwind compilation step and no extra environment
variables are required.

## 2. Deploy to Netlify

Netlify is already configured via `netlify.toml`. Create a new site, connect it
to this repository, and use the following settings:

* **Build command:** `npm run build`
* **Publish directory:** `dist`

When triggering a redeploy, choose *Clear cache and deploy site* if you think
Netlify has cached old dependencies.

Alternatively, you can drag-and-drop the `dist/` folder onto the Netlify app to
ship a one-off deploy without setting up continuous deployment.
