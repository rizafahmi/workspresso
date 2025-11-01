# Agent Instructions for WorkspressoJS

## Commands
- **Dev server**: `npm run dev` (starts at localhost:4321)
- **Build**: `npm run build` (outputs to ./dist/)
- **Preview**: `npm run preview` (preview production build)
- **Type check**: `npm run astro check`
- **No test framework configured yet**

## Architecture
- **Framework**: Astro v5 with TypeScript (strict mode)
- **Structure**: Minimal Astro starter template
  - `src/pages/`: File-based routing (`.astro` and `.md` files)
  - `src/components/`: Astro/React/Vue/Svelte components (when added)
  - `public/`: Static assets (images, fonts, etc.)
  - `.astro/`: Generated types and build artifacts
- **No database, API layer, or backend configured**

## Code Style
- **TypeScript**: Strict mode (`astro/tsconfigs/strict`)
- **Format**: Follow Astro conventions (frontmatter in `---` blocks)
- **Imports**: ES modules (`type: "module"` in package.json)
- **Files**: Use `.astro` for pages/components, tabs for indentation (based on existing files)
