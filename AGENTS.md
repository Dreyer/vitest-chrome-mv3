# AGENTS.md

Guidelines for anyone (human or AI) acting on behalf of the `vitest-chrome-mv3` project. Use this as a checklist before making changes, filing PRs, or publishing new versions.

## Project Snapshot
- Purpose: Provide a schema-driven mock of Chrome’s Manifest V3 APIs for Vitest users.
- Registry entry: <https://www.npmjs.com/package/vitest-chrome-mv3>.
- Source of truth lives in `src/` and `tests/`; `lib/` is build output.

## Scope of Work
- ✅ Automate docs, schema refreshes, dependency bumps, test maintenance, release prep, and changelog updates.
- ⚠️ Escalate to maintainers before altering API surface, removing namespaces, or changing publish strategy.
- ❌ Never commit secrets or modify npm ownership info.

## Environment & Tooling
- Node.js `24.11.0` (see `.tool-versions`), npm 10+, git, and a configured npm account with publish rights.
- Install dependencies with `npm install` (CI uses `npm ci`).
- Key scripts:
  - `npm run format:check` and `npm run lint` – run on pre-commit or in CI.
  - `npm test` – runs the full Vitest suite (also used by `preversion`).
  - `npm run build` – bundles `src/` into `lib/` via Rollup (called during `prepublishOnly`).
  - `npm run build:docs` / `npm run build:schema` – refresh Chrome reference docs and regenerate the schema/types.

## Repository Conventions
- TypeScript source (`src/`) plus generated schema `src/vitest-chrome-schema.json`.
- Matching tests in `tests/api/<namespace>.test.ts`; keep coverage and schema changes in the same commit.
- Docs live under `docs/`; publishing & changelog processes are in `docs/PUBLISHING.md` and `docs/CHANGELOG.md`.
- Never edit `lib/` or `dist/` directly—rebuild instead.

## Common Task Playbooks
- **Add/Update Chrome namespace**
  1. `npm run build:docs`
  2. `npm run build:schema`
  3. Update `src/` helpers if the schema introduces new behavior.
  4. Add/adjust tests under `tests/api/`.
  5. Run `npm test` and `npm run build`.
  6. Document the change in `docs/CHANGELOG.md`.
- **Dependency or tooling upgrades**
  - Update `package.json`, regenerate lockfile, run tests/build, note changes in the changelog.
- **Bug fix**
  - Write a failing test, fix the implementation, rerun tests, update changelog/README if behavior changes.

## Release & Versioning
- Follow the workflow in `docs/PUBLISHING.md`.
- Update `docs/CHANGELOG.md` and ensure the `Unreleased` section is cleared before tagging.
- `npm version <patch|minor|major>` triggers hooks:
  - `preversion`: runs `npm test`.
  - `prepublishOnly`: runs `npm run build && npm test`.
  - `postversion`: `git push && git push --tags`.
- Publish with `npm publish --access public`; verify via `npm info vitest-chrome-mv3`.

## Quality & Safety Rails
- Always run `npm test` before proposing or publishing changes; for build-related work also run `npm run build`.
- Keep commits focused; include regenerated artifacts and tests when schema or API coverage changes.
- Do not store npm tokens or other secrets in the repo; rely on local environment or CI secrets.
- When in doubt (unclear requirements, potential breaking change, CI instability), stop and request human guidance via an issue or PR comment.
- Always prefer idiomatic approaches over hacky solutions. Consult authoritative documentation (e.g., Vitest, TypeScript) to follow best practices, especially when writing tests.
- Consider the security implications of any changes, referencing OWASP Top 10 or other relevant security standards where applicable.

## Quick Checklist
- [ ] Environment matches `.tool-versions`.
- [ ] Dependencies installed (`npm install`).
- [ ] Relevant docs/tests updated (`docs/`, `tests/`).
- [ ] `npm run format:check` and `npm run lint` pass.
- [ ] `npm test` (and `npm run build` when applicable) pass locally.
- [ ] `docs/CHANGELOG.md` updated.
- [ ] For releases: follow `docs/PUBLISHING.md` and confirm npm publish.

