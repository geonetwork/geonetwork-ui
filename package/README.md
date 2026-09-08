# GeoNetwork-UI NPM Package

## Generating the package

This folder contains the system for generating the [`geonetwork-ui` NPM package](https://www.npmjs.com/package/geonetwork-ui).

It contains:

- a `generate-package.js` node script
- a `check-dependencies.js` node script which validates the package dependencies (see below)
- an `index.ts` file which serves as an entrypoint for the package compilation
- a `ng-package.json` file which is used by [`ng-packagr`](https://github.com/ng-packagr/ng-packagr)
- a `package.json` describing the NPM package
- a `tsconfig.json` file used for the package compilation

The `generate-package.js` file does:

- copy the contents of the `libs` folder in the `package` directory, keeping only relevant files (ts, css, html...)
- transform the import aliases in the TS files back to a relative path using the `paths` property of `tsconfig.base.json`; for instance:
  ```ts
  import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
  ```
  becomes:
  ```ts
  import { UiLayoutModule } from '../../../libs/ui/layout'
  ```
  (this is needed because [`ng-packagr` does not support Typescript path aliases](https://github.com/ng-packagr/ng-packagr/pull/1502#issuecomment-572079617))
- launch a compilation of the copied sources using [`ng-packagr`](https://github.com/ng-packagr/ng-packagr); this is necessary because Angular libraries have to be published according to the [Angular Package Format](https://angular.io/guide/angular-package-format)
- the compilation output is going to `package/dist`; then the script also copies the source `libs` folder there as well so that consumers of the package can be redirected to the source file when inspecting it

To generate the package, simply run:

```shell
npm run package:build
```

Then the package can be published like so, assuming the correct rights are available:

```shell
cd package/dist
npm publish
```

Note: To use the generated package locally, be sure to follow [these hints](https://geonetwork.github.io/geonetwork-ui/main/docs/guide/custom-app.html#using-the-npm-package-in-development-mode).

## Checking the dependencies

`package.json` in this folder is maintained by hand and is entirely separate from the one at the root of
the repository: adding a third-party import to a lib without declaring it here produces a package that
fails to resolve for consumers. `ng-packagr` does not catch this — it only validates the opposite
direction, that everything listed in `dependencies` is whitelisted in `allowedNonPeerDependencies`.

The `check-dependencies.js` script closes that gap. It parses every source file that
`generate-package.js` ships (all of `libs`, minus specs, stories and test setup), collects the
third-party packages they import, and fails if any of them is missing from the `dependencies` or
`peerDependencies` of `package/package.json`. It also fails when a version range in `dependencies`
drifted apart from the root `package.json`, and warns about declared packages that nothing imports
anymore (packages needed implicitly, such as polyfills, are listed in `IMPLICIT_DEPENDENCIES` in the
script).

```shell
npm run package:check-deps
```

## Using the package

Using the package requires creating a custom GeoNetwork-UI application.

[See the documentation website for more information.](https://geonetwork.github.io/geonetwork-ui/main/docs/guide/custom-app.html)
