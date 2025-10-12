
Sugar Sale — CDN Tailwind Build
--------------------------------
This project is set up to use Tailwind via CDN only. There is no PostCSS/Tailwind build step.
If Netlify cached older configs, use "Clear cache and deploy" in the Deploys tab.

Build:
  npm ci
  npm run build   # runs 'vite build'

No tailwind/postcss packages are required.
