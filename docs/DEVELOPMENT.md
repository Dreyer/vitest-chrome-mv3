# Development Guide

This document explains how to get a local environment ready, run the test suite, and regenerate any derived assets before contributing changes to `vitest-chrome-mv3`.

## Prerequisites

- **Node.js 18+** – the build scripts rely on `fetch`. The repo pins **Node 24.11.0** via `.tool-versions`; match it with `asdf`, `fnm`, `nvm`, or your preferred version manager when possible.
- **npm 10+** (shipped with recent Node releases) and **git**.
- macOS, Linux, or WSL. Windows without WSL should work, but the scripts are only exercised regularly on POSIX shells.

## First-Time Setup

1. Fork and clone the repository, then move into it:

   ```sh
   git clone https://github.com/<you>/vitest-chrome-mv3.git
   cd vitest-chrome-mv3
   ```

2. Select the pinned toolchain if you use `asdf`:

   ```sh
   asdf install
   asdf shell nodejs 24.11.0
   ```

   (Or activate the matching version with your preferred manager.)

3. Install dependencies:

   ```sh
   npm install
   ```

4. Run the suite once to make sure everything works on your machine:

   ```sh
   npm test
   ```

## Repository Layout

| Path | Purpose |
| --- | --- |
| `src/` | Source for the Chrome proxy, schema loader, helpers, and entrypoints. |
| `tests/` | Vitest suites covering every Chrome namespace plus integration helpers. |
| `scripts/` | Build utilities such as `download-api-docs.js` and `generate-schema.js`. |
| `docs/chrome_extensions_reference/` | Snapshot of the upstream Chrome reference; regenerated when the schema refreshes. |
| `lib/` | Rollup output that gets published to npm; never edit by hand. |
| `dist/` | Temporary artifacts like `npm pack` tarballs. |
| `tmp/` | Scratch space for comparing upstream libraries while developing. |

## Frequently Used npm Scripts

| Command | When to use it |
| --- | --- |
| `npm test` | Runs the full Vitest suite once (CI mode). |
| `npx vitest --watch` | Interactive watch mode while iterating on `src/` or `tests/`. |
| `npm run build` | Bundles `src/` into `lib/` using Rollup. Required before publishing. |
| `npm run build:docs` | Downloads the latest Chrome extension docs into `docs/chrome_extensions_reference/`. Requires network access. |
| `npm run build:schema` | Parses the downloaded docs and regenerates `src/vitest-chrome-schema.json` plus related types. |

## Test Workflow

- **Fast feedback:** run `npx vitest --watch` in a dedicated terminal. Vitest will re-run only the files affected by your changes.
- **One-off verification:** `npm test` (aliased to `vitest run`) executes the entire suite the same way CI does.
- **Targeted suites:** Vitest obeys filters, so you can run, for example, `npx vitest run tests/runtime.test.ts`.
- **Keeping state isolated:** the test setup registers `chrome.reset()` in a `beforeEach`. Make sure new tests either rely on that hook or reset state manually if they bypass `tests/vitest.setup.ts`.

## Working With Generated Assets

Refreshing the schema or docs is only needed when upstream Chrome APIs change, but every contributor should know the flow:

1. **Download the reference docs** (updates `docs/chrome_extensions_reference/`):

   ```sh
   npm run build:docs
   ```

2. **Regenerate the schema** (updates `src/vitest-chrome-schema.json` and derived typings):

   ```sh
   npm run build:schema
   ```

3. **Verify everything still passes:**

   ```sh
   npm test
   npm run build
   ```

Commit regenerated assets alongside any code changes so reviewers can see the complete diff.

## Recommended Contribution Flow

1. Create a topic branch from `main`.
2. Keep `npx vitest --watch` running while you develop.
3. Update or add tests under `tests/` for every behavior change.
4. Before opening a pull request, run:

   ```sh
   npm test
   npm run build
   ```

5. If your work touches Chrome API coverage, also run `npm run build:docs && npm run build:schema` and commit the results.
6. Follow up with the publishing checklist in `docs/PUBLISHING.md` if you are preparing a release.

## Troubleshooting Tips

- **Schema conflicts:** if `src/vitest-chrome-schema.json` produces unexpected diffs, make sure you ran `npm run build:docs` immediately before `npm run build:schema` so the parser reads the latest Markdown.
- **Stale modules or types:** delete `node_modules` and reinstall (`rm -rf node_modules && npm install`) after upgrading Node or npm.
- **Rollup hangs or fails:** clear `dist/` and ensure no local `lib/` files are edited manually.
- **Network hiccups:** the doc downloader fetches dozens of Markdown files; retry `npm run build:docs` if it fails midstream.

With these steps in place you can comfortably explore the codebase, iterate with fast feedback, and ship confident changes. Happy hacking!

