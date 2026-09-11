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
the repository, so a dependency added to (or bumped in) the root is easily forgotten here. The
`check-dependencies.js` script compares the two and fails when they no longer fit:

- every root **`dependencies`** entry has to be declared in `package/package.json`, either as a
  dependency or as a peer dependency. Packages only applications use are listed in `NOT_PUBLISHED` in
  the script — that list is itself checked, so it cannot go stale;
- every entry of `package/package.json` has to exist in the root `package.json`, as a dependency or a
  dev dependency (a package peer dependency is often a dev dependency of the repository, as is the case
  for `@ngrx/*` and `tailwindcss`);
- `dependencies` ranges are published as-is, so they must be **exactly** the ones the repository is
  built against;
- `peerDependencies` ranges are deliberately broader than the pinned version used here
  (`19.x || 20.x || 21.x` vs `20.3.19`), so comparing them for equality would be meaningless. They are
  checked by **semver satisfaction** instead: the range offered to consumers has to cover every version
  the root may install. A range such as `*` therefore never fails, since it covers everything.

Whether a declared dependency is actually imported is deliberately _not_ checked — the app and package
builds already fail on an unresolved import.

```shell
npm run package:check-deps
```

## Using the package

Using the package requires creating a custom GeoNetwork-UI application.

[See the documentation website for more information.](https://geonetwork.github.io/geonetwork-ui/main/docs/guide/custom-app.html)
