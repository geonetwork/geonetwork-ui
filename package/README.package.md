# GeoNetwork-UI NPM Package

## What is it?

This package contains many of the features available in the [GeoNetwork-UI project](https://github.com/geonetwork/geonetwork-ui).

Its contents are:

- all the libraries in the `libs` folder
- all translations
- various configuration files

This package _does not_ contain:

- applications (Datahub, etc.)
- unit and E2E tests
- docker composition
- documentation
- anything related to [NX](https://nx.dev/)

## How can I use it?

This is what using this package looks like in an Angular application:

```ts
// ...
import { UiElementsModule, provideRepositoryUrl, provideI18n, ThemeService } from 'geonetwork-ui'

@NgModule({
  imports: [
    // ...
    UiElementsModule,
  ],
  providers: [
    // ...
    provideRepositoryUrl('http://localhost:8080/geonetwork/srv/api'),
    provideI18n(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ThemeService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
  }
}
```

Please read the documentation on [how to create a Custom Application](https://geonetwork.github.io/geonetwork-ui/main/docs/guide/custom-app.html) for more information!
