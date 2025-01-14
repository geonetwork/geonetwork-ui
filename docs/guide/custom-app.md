---
outline: deep
---

# Creating a Custom application based on GeoNetwork-UI

An important principle when looking to use GeoNetwork-UI is: **do not fork it!**

Forking is tempting because it allows customizing things right away and easily, but it has many drawbacks: difficulties for keeping the forked repository in sync,
fewer contributions being brought upstream, breaking changes and compatibility issues.

If you want to create your own application using GeoNetwork-UI functionalities, you should **create a Custom Application** as described in this guide.

### Creating a Custom Application

In order to discourage forking, GeoNetwork-UI is made to be publishable as an [NPM package](https://www.npmjs.com/package/geonetwork-ui). This means that
**a Custom Application should be a separate project in a separate repository**, and that it should simply list
GeoNetwork-UI as a regular dependency. No forking, no git submodules, just NPM.

This also means that whenever new functionalities from GeoNetwork-UI are needed the version of the dependency can be
bumped accordingly.

## What does the NPM package for GeoNetwork-UI contain?

The [`geonetwork-ui` NPM package](https://www.npmjs.com/package/geonetwork-ui) contains:

- all the libraries in the `libs` folder
- all translations
- various configuration files (explained later)

The package _does not_ contain:

- applications (Datahub, etc.)
- unit and E2E tests
- docker composition
- documentation
- anything related to [NX](https://nx.dev/)

## What is the NPM package compatible with?

The NPM package is compiled as a single Angular Library with the so-called [partial-Ivy mode](https://angular.io/guide/angular-compiler-options#compilationmode), which means that
it is theoretically compatible with a wide range of Angular versions.

The [package.json](https://github.com/geonetwork/geonetwork-ui/tree/main/package/package.json) file of the NPM package lists Angular libraries as peer dependencies, along with a range of versions that indicate what can be
expected in terms of compatibility with Angular.

Please note that **the GeoNetwork-UI package only requires a basic Angular application to run!**

## How to set up a Custom Application

Setting up a Custom Application requires precisely following several steps.

### Step 1: Create an application with Angular

This can be done in several ways, see for instance [Angular Setup Guide](https://angular.io/guide/setup-local).

::: tip
GeoNetwork-UI as an NPM package is **not compatible with Server-Side Rendering!** use the `--ssr false` flag
:::

::: tip
If using Angular 17+, make sure to create a **non-standalone app** using the `--no-standalone` flag
:::

### Step 2: Adjust the Typescript configuration

Add the following settings to the `tsconfig.json` file at the root of your project:

```json
{
  "compilerOptions": {
    // ...
    "strict": false,
    "noImplicitOverride": false,
    "noPropertyAccessFromIndexSignature": false,
    "lib": [
      // ...
      "dom.iterable"
    ],
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "emitDecoratorMetadata": true,
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  },
  "angularCompilerOptions": {
    // ...
    "strictTemplates": false
  }
}
```

This is necessary mostly because GeoNetwork-UI will not compile under Typescript strict mode.

### Step 3: Adjust the Angular configuration

Some dependencies of GeoNetwork-UI will trigger a warning by the Angular compiler. To suppress these warnings, add
the following settings to the `angular.json` file at the root of your project:

```json
  // ...
  "architect": {
    "build": {
      // ...
      "configurations": {
        "production": {
          // ..
        },
        "development": {
          // ..
          "preserveSymlinks": true,
          "allowedCommonJsDependencies": [
            "duration-relativetimeformat",
            "papaparse",
            "xlsx",
            "chroma-js",
            "@rgrove/parse-xml",
            "@messageformat/core",
            "rbush",
            "pbf",
            "alasql"
            // add dependencies here if other warnings show up and you want to hide them
          ]
        }
      },
      "defaultConfiguration": "production"
    },
  }
```

The `preserveSymlinks` setting is also important if you're working in dev mode and use a symbolic link to point
to a dev build of GeoNetwork-UI.

### Step 4: Install Tailwind

[Tailwind CSS](https://tailwindcss.com/) is used for styling across the whole of GeoNetwork-UI, and is a mandatory dependency.

To install and initialize it:

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Note that this is taken from the Tailwind CSS setup guide.

Then, adjust the `tailwind.config.js` file like so:

```js
const baseConfig = require('geonetwork-ui/tailwind.base.config.js')

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: ['./node_modules/geonetwork-ui/**/*.mjs', './src/**/*.{html,ts}'],
}
```

Here we are inheriting from the GeoNetwork-UI base Tailwind config, which provides many essential things like theme colors etc.

### Step 5: Install other mandatory dependencies

[Angular Material](https://material.angular.io/) and [ngx-translate](https://github.com/ngx-translate/core) are other dependencies essential for many GeoNetwork-UI components. To install them:

```shell
npm install --save \
  @angular/material \
  @angular/material-moment-adapter \
  @angular/cdk \
  @ngrx/component \
  @ngrx/effects \
  @ngrx/router-store \
  @ngrx/store \
  @ngrx/store-devtools \
  @ngrx/operators \
  @ngx-translate/core \
  @ngx-translate/http-loader
```

### Step 6: Install the `geonetwork-ui` package

Run:

```shell
npm install --save geonetwork-ui
```

### Step 7: Include the required fonts

The root `index.html` file of your application should include the Material Symbols font for icons. Add these lines to itS `<head>` section:

```html
<head>
  <!-- ... -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
```

### Step 8: Include the GeoNetwork-UI stylesheet

GeoNetwork-UI comes with its own stylesheet, which you should include at the top of your application `style.css` file like so:

```css
@import 'geonetwork-ui/style.css';
```

### Step 9: Initialize the color theme

GeoNetwork-UI lets users define their own theme based on primary and secondary colors for instance. By default, no theme is specified
so UI components might not render properly. To define a theme, call the following function on the application module constructor:

```ts
export class AppModule {
  constructor() {
    // change colors as you see fit!
    ThemeService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }
}
```

### That's it! 🎉

Congratulations, you should be able to use components and services from GeoNetwork-UI now. Try adding `<gn-ui-button>` to your
HTML template, and your IDE should offer you to import the required dependencies in your application module.

In case things do not work out properly, please be so kind as to [open an issue on GitHub](https://github.com/geonetwork/geonetwork-ui/issues/new) so the project team can work on improving this workflow. Thank you!

As an illustration, a working Custom Application can be found in this repository: https://github.com/jahow/geonetwork-ui-custom-app
Note that this is not guaranteed to be maintained in the long run.

## Using the NPM package in development mode

When developing in parallel on GeoNetwork-UI and a Custom Application, the following guidelines should be followed:

- A tool such as [yalc](https://github.com/wclr/yalc) is recommended to make a link between the Custom Application and GeoNetwork-UI
  - [`npm link`](https://docs.npmjs.com/cli/v9/commands/npm-link) or `npm install <path/to/package/dist>` can also be used, but it will require including the [`--install-links` flag for `npm install`](https://docs.npmjs.com/cli/v8/commands/npm-install#install-links), otherwise _transitive dependencies will not be installed!_
- Having live reload on changes made in a dependency (such as GeoNetwork-UI) is really hard to achieve with Angular; usually, changes in GeoNetwork-UI will only be reflected after a browser refresh
- To make sure that changes in GeoNetwork-UI are correctly reflected, it might be necessary to disable the Angular cache in `.angular` altogether; see https://angular.io/cli/cache for how to do this
