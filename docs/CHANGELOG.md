# Changelog

All notable changes to `vitest-chrome-mv3` will be documented here. Dates use `YYYY-MM-DD`. This file complements `docs/PUBLISHING.md`.

## 1.0.0 – 2025-11-19

### Major: Migration from Runtime Proxy to Build-Time Code Generation

This release represents a fundamental architectural shift from a runtime proxy-based approach to a build-time code generation system. All Chrome API mocks are now generated at build time from the official Chrome extension documentation, ensuring complete alignment with the real Chrome API surface.

**What Changed:**
- **Build-Time Generation**: Chrome API mocks are now generated from a structured schema (`src/vitest-chrome-schema.json`) that is derived from the official Chrome extension reference documentation. The generation pipeline: Markdown docs → JSON schema → TypeScript code (`src/generated.ts`).
- **Schema-Driven Architecture**: The library now uses a three-stage pipeline:
  1. `npm run build:docs` - Downloads Chrome API reference Markdown files
  2. `npm run build:schema` - Parses docs into structured JSON schema
  3. `npm run build:mock` - Generates TypeScript mock code from schema

**Breaking Changes:**
- **No More Phantom Properties**: APIs that don't exist in the official Chrome documentation will return `undefined` instead of being created on-the-fly. This ensures tests fail when typos occur (e.g., `chrome.nonExistent.method()` returns `undefined` rather than creating a mock).
- **Stricter API Surface**: The mock surface area is now strictly limited to what's documented in the Chrome extension reference, preventing silent failures from typos and keeping behavior aligned with the real Chrome API.

**Benefits:**
- **Better Type Safety**: Only documented APIs exist, catching typos at runtime
- **Easier Maintenance**: Schema updates automatically propagate to generated code
- **Version Control**: Schema changes are visible in diffs, making API evolution trackable
- **Debuggability**: The intermediate JSON schema serves as a clear representation of what APIs are available

**Migration Notes:**
If your tests were relying on accessing non-existent Chrome APIs (which would have been auto-created in previous versions), you'll need to:
1. Verify the API exists in the official Chrome documentation
2. If it's a typo, fix the typo in your code
3. If it's a legitimate but undocumented API, file an issue so we can add it to the schema

### Other Changes
- Added ESLint and Prettier for automated code quality and formatting
- Improved build pipeline with automated schema and code generation

## 0.1.0 – 2025-11-16
- Initial public release with Manifest V3-compatible Chrome APIs mocked for Vitest.
- Bundled ESM/CJS builds and type definitions under `lib/`.
- Comprehensive API coverage tests under `tests/api/**`.

