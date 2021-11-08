# ts-config-web-widget

## 3.0.0

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
