---
outline: deep
---

# Best practices

## Standalone components

Since Angular 15 [standalone components](https://angular.io/guide/standalone-components) are now officially supported. They offer many advantages and should be used as much as possible, both for new developments and when refactoring existing code.

Standalone components have the following differences with legacy "non-standalone" ones:

- Standalone components are _not_ declared in Angular Modules; instead, they act as their own module, declaring their own dependencies and providers
- Standalone components can import either Angular modules or other standalone components

## Testing

### Unit tests

#### Mocking services

One of the advantages of the Angular [dependency injection](https://angular.io/guide/dependency-injection-overview) system is the ability to use mock classes when testing a component or services.

This can be done by specifying providers in `TestBed.configureTestingModule`:

```ts
import { MyService } from './my-service'
import { MyComponent } from './my-component.component'
// ...

class MyServiceMock {
  someData$ = new BehaviorSubject([])
}

describe('MyComponent', () => {
  let component: MyComponent
  let myService: MyService
  let fixture: ComponentFixture<MyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MyService,
          useClass: MyServiceMock,
        },
        // ....
      ],
    })

    fixture = TestBed.createComponent(MyComponent)
    myService = TestBed.inject(MyService)
    component = fixture.componentInstance
    fixture.detectChanges()
  }).compileComponents()

// ...
```

::: tip
When defining providers, **`useClass` should be preferred to `useValue`** to avoid side effects between test cases.  
Indeed, `useClass` means a new instance of a dependency is created for each test, whereas `useValue` reuses the same instance across all tests.
:::

#### Targeting nodes in the DOM

When testing components, it is often useful to target nodes in the resulting DOM to check their presence/absence, text content etc.

To do this, it is recommended to add a `data-test` attribute to the target node in the component's HTML template, for instance:

```html
<div>My component</div>
<div *ngIf="data$ | async as currentData" data-test="show-data">
  {{ currentData }}
</div>
```

This makes the HTML template easier to read and avoid confusion with e.g. CSS classes.

#### Mocking translations

When testing components that use translations, the [`ngx-translate-testing`](https://github.com/mwootendev/ngx-translate-plugins) package provides a special module that should be used:

```ts
import { TranslateTestingModule } from 'ngx-translate-testing'
// ...

describe('MyComponent', () => {
  let component: MyComponent
  let fixture: ComponentFixture<MyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          en: {
            'my.translation.key':
              '{count} objects were found.',
          },
        })
          .withDefaultLanguage('en')
          .withCompiler(new TranslateMessageFormatCompiler()),
      ]
    }).compileComponents()

    // ...
```

For standalone components, the following method should be used instead:

```ts
import { TranslateTestingModule } from 'ngx-translate-testing'
// ...

describe('MyStandaloneComponent', () => {
  let component: MyStandaloneComponent
  let fixture: ComponentFixture<MyStandaloneComponent>

  beforeEach(() => {
    const testingModule = TranslateTestingModule.withTranslations({
      en: {
        'my.translation.key':
          '{count} objects were found.',
      },
    })
      .withDefaultLanguage('en')
      .withCompiler(new TranslateMessageFormatCompiler())

    TestBed.configureTestingModule({
      // ...
    }).overrideComponent(MyStandaloneComponent, {
      add: {
        providers: [...testingModule.providers],
      },
    })

    // ...
```

::: tip
[Click here to read the guide on how internationalization (i18n) is done in the project](../reference/i18n.html).
:::

### End-to-end tests

#### Targeting nodes in the DOM

Similarly to unit tests, a `data-cy` attribute can be used to target elements in the DOM:

```html
<div>My component</div>
<div *ngIf="data$ | async as currentData" data-cy="show-data">
  {{ currentData }}
</div>
```

## Storybook

All UI components should theoretically appear in Storybook (launched through `npm run storybook`).

An introduction to creating stories for Angular components can be found [here](https://storybook.js.org/docs/get-started/whats-a-story).

A typical story should:

- let the user manipulate all inputs in all ways possible in order to see how the component reacts
- let the user see all outputs emitted by the component
- let the user resize the container in which the component sits in order to see how the component handles its size; this can be done like so:
  ```ts
  export default {
    // ...
    decorators: [
      // ...
      componentWrapperDecorator(
        (story) => `
          <div class="border border-gray-300" style="width: 450px; height: 100px; resize: both; overflow: auto">
             ${story}
          </div>`
      ),
    ],
  } as Meta<MyComponent>
  ```

### Stories for standard components

Quite often, components will rely on other modules. These should be imported like so:

```ts
export default {
  title: 'Category/MyComponent',
  component: MyComponent,
  decorators: [
    moduleMetadata({
      imports: [
        // import whatever module is required
        // ...
        // note: these are required if the module needs translations:
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    applicationConfig({
      providers: [
        // provider wheter is needed here
      ],
    }),
  ],
} as Meta<MyComponent>
```

### Stories for standalone components

Stories for standalone components are usually set up a bit differently:

```ts
export default {
  title: 'Category/MyStandaloneComponent',
  component: MyStandaloneComponent,
  decorators: [
    // module imports may not be required since the component should already import everything it needs
    applicationConfig({
      providers: [
        // provide here what's needed; for translation this is:
        importProvidersFrom(UtilI18nModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
  ],
} as Meta<MyStandaloneComponent>
```

## Event handling

### Stopping click event propagation

In order to stop click event propagation you should use `propagateToDocumentOnly` from `@geonetwork-ui/util/shared` instead of `event.stopPropagation` to ensure that the document receives the event.

```ts
import { propagateToDocumentOnly } from '@geonetwork-ui/util/shared'

// ...

handleClick(event: Event) {
  // do stuff
  event.preventDefault()
  propagateToDocumentOnly(event)
}
```

This guarantees that the document will still receive the event so that components such as dropdowns can react to a click outside and close.
