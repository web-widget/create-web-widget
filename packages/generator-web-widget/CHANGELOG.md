# generator-web-widget

## 4.1.2

### Patch Changes

- [#336](https://github.com/web-widget/create-web-widget/pull/336) [`fb19896`](https://github.com/web-widget/create-web-widget/commit/fb198960f07c007373e7b66e0230f16c47d2b8d8) Thanks [@joeldenning](https://github.com/joeldenning)! - Use web-widget-layout@1 until web-widget@6 is ready

## 4.1.1

### Patch Changes

- [#333](https://github.com/web-widget/create-web-widget/pull/333) [`133e580`](https://github.com/web-widget/create-web-widget/commit/133e5803aebd1b205e9547e9bf02d89326fd94f5) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix package manager used in util module build script. Resolves #329

## 4.1.0

### Minor Changes

- [#327](https://github.com/web-widget/create-web-widget/pull/327) [`5c31d36`](https://github.com/web-widget/create-web-widget/commit/5c31d3639e8663be97e435366615f7553341d453) Thanks [@joeldenning](https://github.com/joeldenning)! - Update all dependencies

## 4.0.2

### Patch Changes

- [#319](https://github.com/web-widget/create-web-widget/pull/319) [`10c089d`](https://github.com/web-widget/create-web-widget/commit/10c089dc80675487a7f67a959311c24e9c8dfdf0) Thanks [@PieterBoeren](https://github.com/PieterBoeren)! - Fix quotes issue in babel config file

## 4.0.1

### Patch Changes

- [#320](https://github.com/web-widget/create-web-widget/pull/320) [`ecf5885`](https://github.com/web-widget/create-web-widget/commit/ecf58858b4188ed4e0f67710560cf8ca243dcd30) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade to ts-config-web-widget@3

## 4.0.0

### Major Changes

- [#316](https://github.com/web-widget/create-web-widget/pull/316) [`6ca8cbc`](https://github.com/web-widget/create-web-widget/commit/6ca8cbcdd43748261e60372f4582ae28cda5302c) Thanks [@joeldenning](https://github.com/joeldenning)! - For typescript projects, automatically emit types during `build`.

  # Migrating

  The create-web-widget api for generating new typescript projects did not change. However, to upgrade existing projects, do the following:

  1. Update your package.json. Make sure to replace `<%= packageManager %>` with either `npm`, `yarn`, or `pnpm`

  ```diff
  {
    "scripts": {
  -     "build": "webpack --mode=production",
  +     "build": "concurrently <%= packageManager %>:build:*",
  +     "build:webpack": "webpack --mode=production",
  +     "build:types": "tsc"
    }
  }
  ```

  2. Update your tsconfig.json. Make sure to replace `<%= mainFile %>` with the proper value. This is in the format `org-project.ts`. React projects should have the `.tsx` file extension

  ```diff
  {
    "compilerOptions": {
  +     "declarationDir": "dist"
    },
  +   "files": ["src/<%= mainFile %>"]
  -   "include": ["src/**/*", "node_modules/@types"],
  +   "include": ["src/**/*"]
  }
  ```

  3. Add the `"types"` property to your package.json:

  ```diff
  {
  +  "types": "dist/<%= mainFile %>.d.ts"
  }
  ```

  4. Upgrade `ts-config-web-widget` to the latest 3.x release, which has new configuration for emitting types.

  ```sh
  npm install --save-dev ts-config-web-widget@^3.0.0

  pnpm install --save-dev ts-config-web-widget@^3.0.0

  yarn add --dev ts-config-web-widget@^3.0.0
  ```

  5. Now run `npm run build` or `npm run build:types` and verify that a typescript declaration file is outputted to your `dist` directory. Verify that the output file name is the same as the `"types"` property in your package.json.

* [#317](https://github.com/web-widget/create-web-widget/pull/317) [`9f5dfc8`](https://github.com/web-widget/create-web-widget/commit/9f5dfc8a4cbcc64d539f8e65c0f5077cdf59073f) Thanks [@joeldenning](https://github.com/joeldenning)! - Breaking changes:

  Require new --framework option when creating utility microfrontends. This is a breaking change for CLI users who rely on non-interactivity when running create-web-widget, as there's a new option required when `--moduleType util-module` is set. For most cases, though (e.g. when a human can respond to CLI prompts), this change is not a breaking behavior.

  Features:

  React utility microfrontends are now supported. When you create a new utility microfrontend, it will now ask for which framework you want the framework to be authored in. See https://github.com/web-widget/create-web-widget/issues/264

## 3.1.2

### Patch Changes

- [#313](https://github.com/web-widget/create-web-widget/pull/313) [`24bf588`](https://github.com/web-widget/create-web-widget/commit/24bf5886bf2f3e4e76f063abfe4d42eba4a2e9eb) Thanks [@joeldenning](https://github.com/joeldenning)! - Use latest version of webpack-config-web-widget-ts

## 3.1.1

### Patch Changes

- [`44f122b`](https://github.com/web-widget/create-web-widget/commit/44f122b6f8b0dd2f09b8965d39f085add2e2d07e) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade webpack-config-web-widget versions

## 3.1.0

### Minor Changes

- [#312](https://github.com/web-widget/create-web-widget/pull/312) [`dcc5a02`](https://github.com/web-widget/create-web-widget/commit/dcc5a02b91b01418ee5304060b18f022763700ed) Thanks [@joeldenning](https://github.com/joeldenning)! - Use webpack-dev-server@4.0.0-rc.0

## 3.0.0

### Major Changes

- [#300](https://github.com/web-widget/create-web-widget/pull/300) [`0ca13bb`](https://github.com/web-widget/create-web-widget/commit/0ca13bb8de64b2329bae04f7bf92b1e9fcb5c47a) Thanks [@joeldenning](https://github.com/joeldenning)! - Breaking Changes

  - NodeJS >= 12.13.0 now required, as we're using [style-loader@3](https://github.com/webpack-contrib/style-loader/releases/tag/v3.0.0) in webpack-config-web-widget

  Projects generated by web-widget

  - New projects use Jest 27 (https://jestjs.io/blog/2021/05/25/jest-27#miscellaneous-breaking-changes), including jest-util and babel-jest
  - Newly generated projects use React 17 types
  - Newly generated projects now use concurrently 6. See https://github.com/kimmobrunfeldt/concurrently/releases/tag/v6.0.0
  - Newly generated root configs and util modules now execute `git init` during creation
  - Newly generated projects now use eslint-config-prettier 8. See https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21

  Internal changes

  - Upgrade yargs to 17 in create-web-widget, which parses the CLI args. See https://github.com/yargs/yargs/releases/tag/v17.0.0
  - Upgrade yeoman-environment to v3 and yeoman-generator to v5. This comes with changes to how packages are installed by yeoman, but those changes don't apply to create-web-widget because only committed package.jsons result in yeoman-environment installs. Manually installing dependencies the old way via yeoman-generator.

  Maintenance

  - Upgrade to jest 27 (https://jestjs.io/blog/2021/05/25/jest-27#miscellaneous-breaking-changes), including jest-util and babel-jest
  - Upgrade create-web-widget to husky 6. Upgrade newly generated projects to use husky 6
  - Add `scripts/update-dependencies.sh` script for maintainers to easily upgrade all dependencies at once

### Minor Changes

- [#299](https://github.com/web-widget/create-web-widget/pull/299) [`6c8ca4e`](https://github.com/web-widget/create-web-widget/commit/6c8ca4ebbb9a88e21a361a2f8f12935cfb790df3) Thanks [@joeldenning](https://github.com/joeldenning)! - Support --skipInstall option

* [#298](https://github.com/web-widget/create-web-widget/pull/298) [`0a485de`](https://github.com/web-widget/create-web-widget/commit/0a485def21ff6dc0946e5f7b45bb2cb860281b95) Thanks [@EduSantosBrito](https://github.com/EduSantosBrito)! - Minor changes in package.json and webpack. Migrate to the new JSX Transform with React 17

### Patch Changes

- [#294](https://github.com/web-widget/create-web-widget/pull/294) [`70226ef`](https://github.com/web-widget/create-web-widget/commit/70226ef075afa35c2cbe3e07071b3859796075ac) Thanks [@cejaramillof](https://github.com/cejaramillof)! - add noscript tag to html templates

* [#292](https://github.com/web-widget/create-web-widget/pull/292) [`8f1c94f`](https://github.com/web-widget/create-web-widget/commit/8f1c94fcff087ad45a0fd44dc006c826e6e901a5) Thanks [@gjhommersom](https://github.com/gjhommersom)! - fixed generated jest config for react unable to load parcels

## 2.3.2

### Patch Changes

- [#290](https://github.com/web-widget/create-web-widget/pull/290) [`d2c09ec`](https://github.com/web-widget/create-web-widget/commit/d2c09ec255997f91fa969806d7d8dad82bcfd9d5) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix semver check when checking for updates

## 2.3.1

### Patch Changes

- [#281](https://github.com/web-widget/create-web-widget/pull/281) [`77d9e53`](https://github.com/web-widget/create-web-widget/commit/77d9e538d3f1be8565ef0545aa20056c913ab3e5) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix start instructions for pnpm

## 2.3.0

### Minor Changes

- [#280](https://github.com/web-widget/create-web-widget/pull/280) [`2e79c7f`](https://github.com/web-widget/create-web-widget/commit/2e79c7f7ef842336a886af472ac001d71dfe23c5) Thanks [@joeldenning](https://github.com/joeldenning)! - Use web-widget-layout by default in root configs

### Patch Changes

- [#279](https://github.com/web-widget/create-web-widget/pull/279) [`2793ffd`](https://github.com/web-widget/create-web-widget/commit/2793ffd2cda5709d03f6aaf7b17244175fe03ce3) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix issue with typescript declarations for file loading

* [#276](https://github.com/web-widget/create-web-widget/pull/276) [`337d8dd`](https://github.com/web-widget/create-web-widget/commit/337d8dd103aee59c486d7f57cd4fa214d115fa21) Thanks [@PieterBoeren](https://github.com/PieterBoeren)! - Added support for images in the webpack config

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
- 6f2c13c: Move layout definition to microfrontends-layout.html file.

### Patch Changes

- bf039d0: Use ts-important-stuff in eslintrc for typescript root-configs
