---
name: portfolio-verifier
description: Automatically verifies Svelte 5 type checks, Vite builds, and project JSON structure for the portfolio website.
---

# Portfolio Verifier Skill

Use this skill whenever making changes to components, data, or styling in the portfolio project.

## Verification Steps

1. **Type & Svelte Check:**
   Run:
   ```bash
   npm run check
   ```
   Ensure no TypeScript or Svelte 5 syntax errors occur.

2. **Production Dry Build:**
   Run:
   ```bash
   npm run build
   ```
   Verify that the output bundle in `dist/` builds without errors.

3. **Data Integrity Check:**
   Validate `src/data/projects.json` structure:
   - Every project object must have `id`, `title`, `description`, `technologies`, and `images`.
