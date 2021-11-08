# webpack-config-web-widget-react

## 4.0.2

### Patch Changes

- Updated dependencies [[`22c8fb9`](https://github.com/web-widget/create-web-widget/commit/22c8fb9f5a7056f1a24cc2c178897fefc7819843)]:
  - webpack-config-web-widget@5.1.1

## 4.0.1

### Patch Changes

- Updated dependencies [[`f004685`](https://github.com/web-widget/create-web-widget/commit/f004685810e7634ccb1598b8c3cf8321b6833951), [`5c31d36`](https://github.com/web-widget/create-web-widget/commit/5c31d3639e8663be97e435366615f7553341d453)]:
  - webpack-config-web-widget@5.1.0

## 4.0.0

### Major Changes

- [#315](https://github.com/web-widget/create-web-widget/pull/315) [`729c6b1`](https://github.com/web-widget/create-web-widget/commit/729c6b1b537457fe8ec801b40c86c9eb7fb0fa84) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade to standalone-web-widget-webpack-plugin@3. For the majority of users, you can safely upgrade webpack-config-web-widget (-ts, -react, -react-ts) without any code changes.

  See https://github.com/web-widget/standalone-web-widget-webpack-plugin/releases/tag/v3.0.0 for details about what was changed. It only impacts running projects in standalone mode.

### Patch Changes

- Updated dependencies [[`729c6b1`](https://github.com/web-widget/create-web-widget/commit/729c6b1b537457fe8ec801b40c86c9eb7fb0fa84)]:
  - webpack-config-web-widget@5.0.0

## 3.0.0

### Major Changes

- [#310](https://github.com/web-widget/create-web-widget/pull/310) [`5dc82a6`](https://github.com/web-widget/create-web-widget/commit/5dc82a6ce97a72a53dc2533fe45d2f02504be4e9) Thanks [@alexristich](https://github.com/alexristich)! - Upgrade to latest config from webpack-dev-server v4.0.0-rc.0

  The [release candidate](https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-rc.0) introduced some breaking changes which prevented the local server from running in new applications created with `create-web-widget`.

  This also simplfies the configuration to take advantage of new default values.

### Patch Changes

- Updated dependencies [[`5dc82a6`](https://github.com/web-widget/create-web-widget/commit/5dc82a6ce97a72a53dc2533fe45d2f02504be4e9)]:
  - webpack-config-web-widget@4.0.0

## 2.2.4

### Patch Changes

- Updated dependencies [[`a380ce4`](https://github.com/web-widget/create-web-widget/commit/a380ce4d381c651d5df671aee4826bf0dcca9004)]:
  - webpack-config-web-widget@3.1.0

## 2.2.3

### Patch Changes

- Updated dependencies [[`0ca13bb`](https://github.com/web-widget/create-web-widget/commit/0ca13bb8de64b2329bae04f7bf92b1e9fcb5c47a)]:
  - webpack-config-web-widget@3.0.0

## 2.2.2

### Patch Changes

- [#282](https://github.com/web-widget/create-web-widget/pull/282) [`4c95b1b`](https://github.com/web-widget/create-web-widget/commit/4c95b1b97acd7ee42965ea853d1bd8dce239c017) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade webpack-config-web-widget's upstream dependencies

## 2.2.1

### Patch Changes

- Updated dependencies [[`337d8dd`](https://github.com/web-widget/create-web-widget/commit/337d8dd103aee59c486d7f57cd4fa214d115fa21)]:
  - webpack-config-web-widget@2.2.1

## 2.2.0

### Minor Changes

- 905c0cc: - The create-web-widget project now uses pnpm workspaces and changesets instead of lerna.
  - Remove deprecated babel-eslint package in favor of new @babel/eslint-parser package.
  - Fix typescript problems in pnpm packages.
  - Add support for creation of pnpm packages. Resolves #211.
  - Add name field for utility packages.
  - No longer depend on beta versions of create-web-widget packages
  - Rename template package.jsons to avoid detection by monorepo tooling
  - Fix usage of @testing-library/jest-dom in yarn pnp and pnpm
  - Switch to Github actions instead of Travis - travis stopped reporting test results
  - prettierignore pnpm-lock.yaml files
  - Improve support for format and check-format commands on Windows

### Patch Changes

- Updated dependencies [905c0cc]
- Updated dependencies [6f2c13c]
  - webpack-config-web-widget@2.2.0
