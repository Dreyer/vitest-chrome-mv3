# Publishing `vitest-chrome-mv3`

Instructions for cutting a new release to npm. Registry entry: <https://www.npmjs.com/package/vitest-chrome-mv3>.

## Prerequisites
- Node.js `24.11.0` (see `.tool-versions`) and a recent npm.
- Access to the `vitest-chrome-mv3` npm package and a logged-in session (`npm whoami`).
- Clean `main` branch with all CI checks green.
- Local dependencies installed via `npm install` (or `npm ci` on CI).

## Release Preparation
1. Sync main: `git checkout main && git pull`.
2. Review and update docs/changelog/README for the changes you intend to ship.
3. Run the full test matrix locally: `npm test`.
4. (Optional) Refresh generated assets if needed:
   - `npm run build:docs` – refresh Chrome API reference snapshots.
   - `npm run build:schema` – rebuild the schema bundle.
5. Build the distributable to ensure Rollup still succeeds: `npm run build`.
6. Inspect the publish payload with `npm pack` or by opening the generated `dist/vitest-chrome-mv3-<version>.tgz`. Only `lib`, `README.md`, and `LICENSE` are shipped per the `files` whitelist in `package.json`.

## Versioning
- Follow SemVer:
  - `patch`: bug fixes / docs only.
  - `minor`: new backwards-compatible features or Chrome API coverage.
  - `major`: breaking API changes or support policy changes.
- Use `npm version <patch|minor|major> --message "chore: release v%s"`.
  - `preversion` runs `npm test`.
  - `prepublishOnly` runs `npm run build && npm test` ensuring the bundle and types are up to date.
  - `postversion` automatically pushes commits and tags (`git push && git push --tags`) once the publish succeeds.

## Publishing to npm
1. Ensure you are authenticated: `npm login` (one-time per machine) and `npm whoami`.
2. Double-check that the version bump commit and tag exist locally (`git status` should be clean, `git tag --points-at HEAD` should show the new tag).
3. Publish from the root of `main`: `npm publish --access public`.
   - You can append `--dry-run` to inspect the publish payload without releasing.
   - `prepublishOnly` will rebuild and rerun tests automatically, so failed builds/tests stop the publish.
4. Verify on npm: `npm info vitest-chrome-mv3 version` (should match the new tag). Also confirm the README renders correctly.

## Post-release
- Merge/push any pending documentation updates if they were staged separately.
- Announce the release (GitHub Releases, Slack, etc.) and summarize key changes.
- If consumers require migration notes, add them to `README.md` or a dedicated changelog and link to the npm release.

