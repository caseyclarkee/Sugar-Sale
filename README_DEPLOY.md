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

* **Build command:** `npm ci && npm run build`
* **Publish directory:** `dist`

When triggering a redeploy, choose *Clear cache and deploy site* if you think
Netlify has cached old dependencies.

Alternatively, you can drag-and-drop the `dist/` folder onto the Netlify app to
ship a one-off deploy without setting up continuous deployment.

### Ensuring deploy previews run

Deploy Previews are automatically generated for pull requests and non-production
branches when the repository is linked to Netlify. If you are not seeing a
preview build for a branch:

1. Verify the repository is connected in **Site settings → Build & deploy →
   Continuous deployment** and that *Deploy previews* are enabled.
2. Confirm the branch or pull request is targeting the connected Git provider
   and that the latest commits have been pushed.
3. Re-run the build from the **Deploys** tab using *Retry deploy* with *Clear
   cache and deploy site* to ensure the updated `npm ci && npm run build`
   command executes.
