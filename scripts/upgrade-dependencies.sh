#!/bin/sh
pnpx ncu -iu --packageFile ./package.json
pnpx ncu -iu --packageFile ./packages/create/package.json
pnpx ncu -iu --packageFile ./packages/web-widget-web-server-utils/package.json
pnpx ncu -iu --packageFile ./packages/web-widget-welcome/package.json
pnpx ncu -iu --packageFile ./packages/ts-config-web-widget/package.json
pnpx ncu -iu --packageFile ./packages/webpack-config-web-widget/package.json
pnpx ncu -iu --packageFile ./packages/webpack-config-web-widget-react/package.json
pnpx ncu -iu --packageFile ./packages/webpack-config-web-widget-react-ts/package.json
pnpx ncu -iu --packageFile ./packages/webpack-config-web-widget-ts/package.json

# generator-web-widget has a bunch of nested package jsons
pnpx ncu -iu --packageFile ./packages/generator-web-widget/package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/common-templates/typescript/react.package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/common-templates/typescript/typescript.package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/react/templates/react.package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/react/templates/typescript/typescript-react.package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/root-config/templates/root-config.package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/root-config/templates/root-config-layout.package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/svelte/templates/svelte.package.json
pnpx ncu -iu --packageFile ./packages/generator-web-widget/src/util-module/templates/util-module.package.json