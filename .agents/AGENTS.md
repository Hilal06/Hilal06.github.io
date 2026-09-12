# Agent Rules & Automations for Hilal06 Portfolio Website

## 📌 Project Overview & Stack
- **Project Name:** Hilal06 Portfolio Website (`Hilal06.github.io`)
- **Framework:** Svelte 5 (using Runes: `$state`, `$derived`, `$effect`, `$props`)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, `@theme` block in `src/app.css`)
- **Animations:** GSAP & Lenis (Smooth Scroll)
- **Integrations:** Live GitHub REST API (`src/lib/github.ts`) & Web3Forms Contact Form

---

## ⚡ Automation Workflows & Verification Rules

### 1. Automated Verification (Mandatory after code changes)
- After editing any `.svelte` or `.ts` file, always run:
  ```bash
  npm run check
  ```
  to verify Svelte & TypeScript type safety.
- Before declaring a feature complete, run a dry build:
  ```bash
  npm run build
  ```
  to catch any production bundling or missing import errors.

### 2. Svelte 5 Coding Conventions
- **State Management:** Use Svelte 5 Runes exclusively (`$state(...)`, `$derived(...)`, `$effect(...)`). Avoid Svelte 4 legacy syntax (`let count = 0;`, `$: ...`).
- **Component Props:** Use `let { propName = defaultValue } = $props();` pattern.
- **GSAP & Lenis Cleanup:** Always clean up GSAP timelines and Lenis event listeners inside `$effect` teardowns or `$effect.root()` to prevent memory leaks during component unmounting.

### 3. Tailwind CSS v4 Best Practices
- Define all custom colors, fonts, and keyframe animations in `src/app.css` under the `@theme` directive.
- Avoid inline arbitrary hex values when brand tokens are available in `@theme`.
- Maintain dark mode aesthetic and glassmorphism styling consistency across all new components.

### 4. Portfolio Data Management (`src/data/projects.json`)
- When adding or updating projects in `src/data/projects.json`:
  - Ensure image paths exist in `public/images/` or are valid URLs.
  - Verify fallback behavior when GitHub API fetch fails or rate limit is reached.
  - Test project modal gallery interactions.

### 5. Automated MCP Tool Utilization
- **UI & Layout Verification:** Use `chrome-devtools` or browser automation to check component rendering, responsive mobile breakpoints, and color contrast (a11y).
- **Project Image Capture:** Use `puppeteer` to automate capturing project previews from live URLs for portfolio entries.
- **GitHub Integration:** Use `github` MCP server to inspect active repositories, manage GH Pages deployment actions, and verify API data schemas.
- **Figma Design Integration:** Use `figma` MCP server to inspect Figma UI components, extract color tokens for `src/app.css` `@theme`, and export visual assets.

---

## 🛠️ Efficient Task Automations
- **Adding a New Portfolio Project:** Update `src/data/projects.json` -> Place images in `public/images/` -> Run `npm run check` -> Verify modal preview.
- **Updating Tech Stack Icons:** Update `src/components/SkillsMarquee.svelte` with official SVG devicons.
- **Deployment Check:** Validate `dist/` build output and verify asset relative paths for GitHub Pages hosting.
