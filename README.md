# Signal House Studios website

Use Node 22.18+ or Node 24. Run `npm run dev -- --host 0.0.0.0` for local desktop and mobile testing.

`npm run build` builds the application and generates HTML metadata for every public route, plus the GitHub Pages fallback and legacy video-route redirect. Metadata comes from `src/seo/seoConfig.ts`. `SITE_ORIGIN` defaults to `https://chrispthomas1990.github.io`, matching the current sitemap; set it to the deployment origin when changing hosting. The URL base comes from `vite.config.ts`. Route HTML metadata is generated for production builds; local development still uses the client metadata component.

Page photos have responsive WebP versions. To regenerate from full-resolution source files, use `python3 scripts/optimise-page-images.py /path/to/original-images` (requires Pillow). Keep the same audio/live/video subdirectories in that source folder. Use original files rather than repeatedly recompressing the web versions. Crop positions stay in `src/content/services.ts`.

Hero videos use H.264 with the original frame sizes, CRF 26, the slow preset, no audio track, and MP4 faststart. Hero playback pauses when the tab is hidden or reduced motion is enabled. Embedded players load within 300px of the viewport.

Validation: `npm test`, `npm run lint`, and `npm run build`.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
