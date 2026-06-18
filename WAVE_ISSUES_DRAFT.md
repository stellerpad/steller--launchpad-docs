# Wave Issues Draft

Five contributor-ready GitHub issues for the `stellerpad/steller--launchpad-docs` repo.
Review and post manually — do not create these via the API until approved.

---

## Issue 1: Replace hardcoded placeholder contract addresses with env-driven values

**Title:** `docs: replace hardcoded placeholder contract addresses with real or env-driven values`

**Complexity:** Medium

### Description

Every doc page currently hard-codes fake addresses (`CAAAA...`, `CBBBB...`, `C1111...`, etc.) directly inline in MDX. The same strings are repeated across all eight pages, `lib/constants.ts`, `.env.example`, and `CONTRIBUTING.md`. There is no single source of truth, so when real mainnet/testnet addresses are deployed the contributor must manually hunt and update every page.

`lib/constants.ts` already defines `CONTRACT_ADDRESSES` — but it is never wired up to the MDX pages. The goal of this issue is to close that gap.

### Acceptance criteria

- `CONTRACT_ADDRESSES` in `lib/constants.ts` reads from `NEXT_PUBLIC_*` env vars with the current placeholder strings as fallbacks (e.g. `process.env.NEXT_PUBLIC_TOKEN_CONTRACT ?? 'CAAAA...'`).
- A shared MDX component (e.g. `<ContractAddress network="testnet" contract="token" />`) renders the correct address pulled from `constants.ts`.
- All eight `.mdx` pages replace inline hardcoded addresses with this component.
- `.env.example` comment is updated to explain where real addresses should come from once deployed.
- No hardcoded address strings remain in `.mdx` files.

---

## Issue 2: SearchBox is client-side only — add keyboard navigation and `Escape` to close

**Title:** `feat(search): add keyboard navigation (↑ ↓ Enter) and Escape-to-close to SearchBox`

**Complexity:** Medium

### Description

`components/SearchBox.tsx` implements a static in-memory search that filters `SEARCH_INDEX` as you type. The dropdown results are fully mouse-driven: there is no way to move between results with the keyboard, confirm a selection with Enter, or dismiss the dropdown with Escape. This is a significant accessibility and usability gap, especially for keyboard-first users and screen readers.

### Acceptance criteria

- Pressing `↓` moves focus to the first result (or the next result if already in the list).
- Pressing `↑` moves focus to the previous result; if already at the first result, focus returns to the input.
- Pressing `Enter` on a highlighted result navigates to that page and closes the dropdown.
- Pressing `Escape` closes the dropdown and returns focus to the input.
- The currently highlighted result has a visible focus ring (meets WCAG 2.1 AA contrast).
- The dropdown `<div>` has `role="listbox"` and each result has `role="option"` and `aria-selected` set correctly.
- Existing mouse-click behaviour is unchanged.

---

## Issue 3: `TableOfContents` is a static prop — auto-generate it from page headings

**Title:** `feat(toc): auto-generate TableOfContents from MDX page headings instead of requiring manual props`

**Complexity:** Medium

### Description

`components/TableOfContents.tsx` accepts a hard-coded `items` prop array. In practice it is never actually rendered on any documentation page — no `.mdx` file imports or uses it. The `rehype-slug` plugin is already configured in `next.config.js` and correctly adds `id` attributes to every heading at build time.

The component should instead auto-detect headings from the rendered DOM so it works without any manual wiring, and then be used consistently across all doc pages.

### Acceptance criteria

- `TableOfContents` is refactored to a `'use client'` component that uses `document.querySelectorAll('h2, h3')` (or a ref-based approach) to build its item list on mount, using the `id` already injected by `rehype-slug`.
- The `items` prop is removed (or kept as an optional override).
- The component is imported and rendered in `app/layout.tsx` or in the docs layout so it appears on every `/docs/*` page.
- Clicking a TOC link smoothly scrolls to the correct heading.
- The active heading is highlighted as the user scrolls (IntersectionObserver).
- The component remains hidden on screens narrower than `xl` breakpoint (existing CSS preserved).

---

## Issue 4: `validate-docs.js` crashes at runtime — fix the missing `glob` dependency and broken require

**Title:** `fix(scripts): validate-docs.js crashes because glob is not in dependencies`

**Complexity:** Trivial

### Description

`scripts/validate-docs.js` uses `require('glob')` at the top level, but `glob` is not listed in `package.json` dependencies or devDependencies. Running `npm run validate-docs` therefore crashes immediately with `Cannot find module 'glob'`. The GitHub Actions workflow calls this script in the `validate` job on every push and PR, meaning CI always fails before even reaching the build step.

Additionally, the script uses the legacy `glob.sync` API from glob v7, while the current major version (v11) has removed that synchronous API in favour of promises.

### Acceptance criteria

- `glob` (v10 or v11) is added to `devDependencies` in `package.json`.
- The `glob.sync(...)` call is replaced with the async `glob(...)` API and `main()` is made `async`.
- Running `npm run validate-docs` on the existing MDX files completes without a crash.
- The `validate` CI job passes end-to-end on a clean `npm ci`.

---

## Issue 5: CI deploy job uses the non-existent `vercel/action@v1` — fix the GitHub Actions workflow

**Title:** `fix(ci): replace invalid vercel/action@v1 with the official vercel/vercel-action and wire secrets`

**Complexity:** Medium

### Description

`.github/workflows/deploy.yml` references `vercel/action@v1` in the deploy job:

```yaml
- name: Deploy to Vercel
  uses: vercel/action@v1
```

This action does not exist (`vercel/action` is not a published GitHub Action). The correct action is [`amondnet/vercel-action`](https://github.com/amondnet/vercel-action) or the [`vercel` CLI called directly via `npx vercel --prod`](https://vercel.com/docs/cli). As a result the deploy job always errors on the final step even when the build succeeds, meaning no automatic production deployment has ever worked from this repo.

The three required secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) are already referenced but instructions for creating them are absent from `DEPLOYMENT.md`.

### Acceptance criteria

- The `uses: vercel/action@v1` line is replaced with a working deployment step (either `npx vercel --prod` with `VERCEL_TOKEN` env var, or `amondnet/vercel-action@v3` with the correct input names).
- `DEPLOYMENT.md` gains a short "CI Secrets Setup" section explaining how to obtain and add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` to repository secrets.
- The `validate` → `deploy` job chain completes successfully on a push to `main` (confirmed by a passing Actions run linked in the PR).
- Preview deployments on PRs are unaffected (or equally fixed if broken).
