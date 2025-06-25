# Contributing to GeoNetwork UI

The project is organized in a monorepo fashion and relies on Nx. [See Nx Documentation](https://nx.dev/angular)

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc. as well as the devtools to test, and build projects as well.

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Workspace operations

### Get started

To have more flexibility using Nx tools, you should install Nx CLI.

```shell
npm i -g @nx/cli
```

This will make the `nx` command available on your system.

You can also use `npx nx`.

### Generate an application

Run `nx g @nx/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

You'll need manual configuration to make the application running:

- Update the root `tsconfig.json` of your application by setting

  ```js
    "angularCompilerOptions": {
      "strictTemplates": false
    }
  ```

- Add `postcss.config.js` and `tailwind.config.js` at the root of your project if you want to use TailwindCSS.

- If you want to an **application configuration**, follow the following steps:

  1. Add the config file as asset for the application in `angular.json`:

  ```json
  "architect": {
    "build": {
      ...
      "options": {
        ...
        "assets": [
          ...
          {
            "glob": "*",
            "input": "conf",
            "output": "assets/configuration/"
          }
        ],
  ```

  2. Load app config before bootstrapping the Angular app in `main.ts`:

  ```ts
  // ...
  import { loadAppConfig } from '@geonetwork-ui/util/app-config'

  // chain config load and app bootstrap
  loadAppConfig()
    .then(() => {
      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err))
    })
    .catch(console.error)
  ```

  3. Add a `preload` link for the config file to gain some boot time:

  ```html
    <link rel="preload" href="assets/configuration/default.toml" as="fetch" />
  </head>
  <body>
  ```

  > Note that the config file is _always_ available at this path

  4. Use the config using functions in `@geonetwork-ui/util/app-config`:

  ```ts
  // ...
  import { getGlobalConfig, getThemeConfig } from '@geonetwork-ui/util/app-config'

  @NgModule({
    // ...
    // provide API url and proxy path
    providers: [
      provideRepositoryUrl(() => getGlobalConfig().GN4_API_URL),
      {
        provide: PROXY_PATH,
        useFactory: () => getGlobalConfig().PROXY_PATH,
      },
      // ...
    ],
  })
  export class AppModule {
    constructor() {
      // ...
      // apply css variables using ThemeService
      ThemeService.applyCssVariables(getThemeConfig().PRIMARY_COLOR, getThemeConfig().SECONDARY_COLOR, getThemeConfig().MAIN_COLOR, getThemeConfig().BACKGROUND_COLOR, getThemeConfig().MAIN_FONT, getThemeConfig().TITLE_FONT)
    }
  }
  ```

  5. Use the following configuration to allow loading custom translations from the config file:

  ```ts
  import {
    // ...
    TRANSLATE_WITH_OVERRIDES_CONFIG,
  } from '@geonetwork-ui/util/app-config'
  import { provideI18n } from '@geonetwork-ui/util/i18n'

  @NgModule({
    // ...
    providers: [
      // ...
      provideI18n(TRANSLATE_WITH_OVERRIDES_CONFIG),
    ],
  })
  export class AppModule {
    // ...
  ```

Please note that the app configuration is available to be used anywhere else in the application in a synchronous
way since it was loaded beforehand.

### Generate a library

Run `nx g @nx/angular:lib my-lib` to generate a library.

You should create your library into a folder (`ui`, `feature` ...)
eg `nx g @nx/angular:lib router --directory=feature`, the name of the library will be `feature-router` in `angular.json` file.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@geonetwork-ui/mylib`.

### Generate a component or other objects

Run `nx generate component component-name --project=<project name>` to generate a new component. You will have to specify a project, which can be for example:

- `search`: application named "search"
- `ui-layout`: presentation library with layout components
- `feature-search`: logic library with search components
- etc.

You can also generate other kind of Angular objects with `nx generate directive|pipe|service|class|guard|interface|enum|module`.

Recommended options to generate a component are CSS-based styling and OnPush changes detection, like so:

```shell script
nx g c smart/fuzzy-search --project=feature-search --style=css --changeDetection=OnPush -d
```

To get more help on the Angular CLI use `nx help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

You can test a specific lib or app or file with

```shell script
nx test (lib_name)
nx test --test-match=/data/dev/gn/ui/libs/common/src/lib/services/bootstrap.service.spec.ts
```

Run `npm test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Setting Up Your Development Environment

### Intellij IDEA

To run the tests in Intellij, install the Jest plugin and run the test as usual.

You may need to edit your configuration and set up the _Working Directory_ to root of the project (e.g `~/dev/geonetwork-ui/`).

You can set up the correct _Working Directory_ once for all by putting the correct value in Jest Template (Edit configuration/Templates/Jest/Working Directory).

## Contributing code

### Linting & formatting

All contributed code must pass the lint & format checks.

To run the lint step, use `npm run lint` for affected code, or `npm run lint:all` for all code.

To check whether your code is formatted properly, use `npm run format`.

If you want Prettier to run on all the code and make sure everything is formatted, run `npm run format:write`.
**This should be done before committing.** The recommended way is to set up your IDE to run Prettier automatically on save.

### OpenAPI client generation

GeoNetwork-UI contains auto-generated API clients for [GeoNetwork](https://github.com/geonetwork/core-geonetwork) 4.
This relies on the [OpenAPI standard](https://www.openapis.org/) (formerly Swagger).

To regenerate the client, update the `spec.yaml` files in the `libs/data-access/gn4/src` folder and use `npm run generate-api -- gn4`.

### i18n

#### Usage in apps

Translations are managed by [ngx-translate](https://github.com/ngx-translate/core).

To set up translate service, use the predefined providers in your application/lib root module:

```typescript
// Application module, root
import { provideI18n } from '@geonetwork-ui/util/i18n'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

...
providers: [
  provideI18n({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    defaultLanguage: 'fr',
  }),
]
```

```typescript
// In standalone components
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

...
imports: [
  TranslateDirective, TranslatePipe
]
```

To declare a string to be translated, use following syntax

```html
<input [title]="'Sort by' | translate" />

<div translate>search</div>
```

```typescript
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('last changed')
marker('popularity')
```

#### How to translate labels

All translated files are stored in the `translations` folder at the root of the project.
These translation files are then used as assets in the different apps.

To extract all translated labels and add them to the translation files, run the following command:

```shell script
npm run i18n:extract
```

Check all target languages are defined in extraction script

```shell script
"i18n:extract": "ngx-translate-extract -s --fi '  ' --input ./apps ./libs --output ./translations/{en,de,fr,it,es,nl,pt}.json --clean --format json"
```

All translation files are merged, unused strings are removed. Don't forget to use `Marker` to add dynamic translations.

The translation files can then be modified and committed accordingly.

#### Utilities

A program is available to merge translation files if necessary, e.g. for manual migrations of translations from one project to
another.

To run it:

```bash
node tools/i18n/cli.js merge ./apps/datahub/src/assets/i18n/fr.json ./translations/fr.json
```

## Documentation

The documentation is generated by [vitepress.dev](https://vitepress.dev).

The doc files are located under the [docs](https://github.com/geonetwork/geonetwork-ui/tree/main/docs) folder.

You can edit the doc configuration, add or remove content from the Vitepress [config.js](https://github.com/geonetwork/geonetwork-ui/tree/main/docs/.vitepress/config.js) file.

- `npm run docs:dev` to run documentation in dev mode
- `npm run docs:preview` to preview documentation
- `npm run docs:build` to build documentation
