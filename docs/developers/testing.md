---
outline: deep
---

<script setup>
import { data } from '../scripts/migrations.data.js';
const ngMocksDone = Math.ceil(data.ngMocks.completionRatio * 100);
</script>

# Testing

## Fixture Guidelines

When creating fixtures for testing, we should ensure that each test operates with an independent instance of the fixture data to prevent unintended side effects between tests.

Instead of using a shared fixture object, encapsulate the fixture data within a function that generates a new instance for each test.

### Structure of a Fixture File

Each fixture file should follow a consistent structure to allow for both flexibility and reusability. The recommended structure includes:

1. **A Generic Fixture Creation Function with Overrides**: This function, named using the convention `createModelNameFixture`, is responsible for generating fixture objects. It should accept an optional `overrides` parameter that allows specific properties of the fixture object to be customized for individual tests.

2. **Preconfigured Specific Fixtures**: Below the generic fixture function, include specific fixtures that represent common scenarios (e.g., a banned user, an admin user). These should follow the naming convention `specificScenarioFixture` (e.g., `bannedUserFixture`, `adminUserFixture`). These functions use the generic fixture creation function with predefined overrides to create specific fixture instances.

### Example: User Fixture File (`user.fixtures.ts`)

```typescript
// Generic function to create a user fixture with optional overrides
export const createUserFixture = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  isBanned: false, // Default property
  role: 'user', // Default role
  ...overrides, // Apply overrides
})

// Specific fixture for a banned user
export const bannedUserFixture = (): User =>
  createUserFixture({
    isBanned: true,
  })

// Specific fixture for an admin user
export const adminUserFixture = (): User =>
  createUserFixture({
    role: 'admin',
  })

// Specific fixture for a guest user
export const guestUserFixture = (): User =>
  createUserFixture({
    role: 'guest',
  })

// Specific fixture for multiple users
export const someUsersFixture = (): User[] => [
  bannedUserFixture(),
  guestUserFixture(),
  // ...
]
```

This approach ensures test isolation, reduces the risk of shared state issues, and makes the test suite more maintainable and reliable.
Always place these fixture-generating functions in a dedicated directory (e.g., fixtures) for easy reuse across the project.

## Unit tests

### `ng-mocks`

Unit tests are meant to be shallow. We should only test the behaviour of a component or a service by controlling the inputs and dependencies, and checking the outputs and results.

Angular provides many tools to clearly split the responsabilities between each components and services. The testing library `ng-mocks` relies on those tools, to provide an easy way to mock dependencies.

See commit `01dfc84d5e127bd426238dd00395faa1697f0eaa` for a few examples.

Unit tests are migrated progressively to use `ng-mocks`.

This is the progression status of the `ng-mocks` migration:

<div style='display: flex; flex-direction: row; gap: 16px'>
  <div :style='"width: " + ngMocksDone + "%"' class='custom-block tip'>
    <p class='custom-block-title'>{{ ngMocksDone }}% done</p>
    <p style='white-space: preserve-breaks'>{{ data.ngMocks.infos }}</p>
  </div>
  <div class='custom-block caution' style='flex-grow: 1'>
    <p class='custom-block-title'>{{ 100 - ngMocksDone }}% remaining</p>
  </div>
</div>

### Mocking services (legacy)

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

### Targeting nodes in the DOM

When testing components, it is often useful to target nodes in the resulting DOM to check their presence/absence, text content etc.

To do this, it is recommended to add a `data-test` attribute to the target node in the component's HTML template, for instance:

```html
<div>My component</div>
<div *ngIf="data$ | async as currentData" data-test="show-data">{{ currentData }}</div>
```

This makes the HTML template easier to read and avoid confusion with e.g. CSS classes.

### Mocking translations

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
[Click here to read the guide on how internationalization (i18n) is done in the project](./i18n.html).
:::

## End-to-end tests

### Fast and reliable E2E tests

End-to-end tests tend to be _slow_, because they require a full browser running and a full application build. They also need to be run as a whole every time an application is impacted by a change. Lastly, they sometimes (often) fail, which causes longer and longer iteration times for developers.

This is why special care needs to be taken when writing end-to-end tests.

Follow these simple rules when writing end-to-end tests:

1. Do _not_ write them like unit tests: each `it()` block takes several seconds to bootstrap so do as many things as you can in one
2. Do _not_ include fixed waiting times unless there's no other choice; instead, wait for elements to show up using Cypress commands
3. Do _not_ navigate the legacy GeoNetwork interface as it is really slow and unreliable; if you need to interact with GeoNetwork (e.g. create or modify a user), use the REST API
4. If your end-to-end test modifies something in the database (e.g. a record), it should _always_ do a clean-up, either right after the modification or (even better) on a `before()` step; this is because a test might not run its full course in case of failure/crash, which means that a clean-up phase at the end might not always happen; this is especially important when iterating over tests locally
5. When your test relies on external data (ex. a query on a WFS service showing up in a table), _always intercept the call_ and provide a fixture as a result; fixtures should always be as small as possible (no need to copy dozens of megabytes in the fixtures when 10 or 20 objects would suffice)

### Targeting nodes in the DOM

Similarly to unit tests, a `data-cy` attribute can be used to target elements in the DOM:

```html
<div>My component</div>
<div *ngIf="data$ | async as currentData" data-cy="show-data">{{ currentData }}</div>
```

### Testing labels

End-to-end tests are set up to run in a browser with English as default locale. You can safely compare the labels and other readable values (e.g. dates) to English and it will work in any environment.
