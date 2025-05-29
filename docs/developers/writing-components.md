---
outline: deep
---

<script setup>
import { data } from '../scripts/migrations.data.js';
const standaloneDone = Math.ceil(data.standaloneComponents.completionRatio * 100);
const storybookDone = Math.ceil(data.storybookEntries.completionRatio * 100);
</script>

# Writing components

This guide provides several guidelines when writing Angular components in the project. **Please follow them unless you have a good reason not to do so!**

## Standalone components

Standalone components have become the norm in Angular. Components in the project should all be made standalone over time; this means that **new components must be standalone** and that **existing components should be made standalone when modified** if it is possible (i.e. when that does not represent a disproportionate amount of work compared to the original task).

Standalone components have the following differences with legacy "non-standalone" ones:

- Standalone components are _not_ declared in Angular Modules; instead, they act as their own module, declaring their own dependencies and providers
- Standalone components can import either Angular modules or other standalone components

This is the progression status of the Standalone Component migration:

<div style='display: flex; flex-direction: row; gap: 16px'>
  <div :style='"width: " + standaloneDone + "%"' class='custom-block tip'>
    <p class='custom-block-title'>{{ standaloneDone }}% done</p>
    <p style='white-space: preserve-breaks'>{{ data.standaloneComponents.infos }}</p>
  </div>
  <div class='custom-block caution' style='flex-grow: 1'>
    <p class='custom-block-title'>{{ 100 - standaloneDone }}% remaining</p>
  </div>
</div>

## Storybook entry

All presentation components should appear in Storybook (launched through `npm run storybook`). **This applies to any component in the `ui/*` libs**, as well as any other component that might benefit from an isolated live testing environment.

An introduction to creating Storybook entries for Angular components can be found [here](https://storybook.js.org/docs/get-started/whats-a-story).

A typical Storybook entry should:

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

This is the progression status of creating Storybook entries for all presentation (UI) components:

<div style='display: flex; flex-direction: row; gap: 16px'>
  <div :style='"width: " + storybookDone + "%"' class='custom-block tip'>
    <p class='custom-block-title'>{{ storybookDone }}% done</p>
    <p style='white-space: preserve-breaks'>{{ data.storybookEntries.infos }}</p>
  </div>
  <div class='custom-block caution' style='flex-grow: 1'>
    <p class='custom-block-title'>{{ 100 - storybookDone }}% remaining</p>
  </div>
</div>

### Storybook entries for standalone components

Storybook entries for standalone components are usually straightforward to set up:

```ts
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Category/MyStandaloneComponent',
  component: MyStandaloneComponent,
  decorators: [
    // module imports may not be required since the component should already import everything it needs
    applicationConfig({
      providers: [
        // provide here what's needed; for translation this is:
        provideI18n(),
      ],
    }),
  ],
} as Meta<MyStandaloneComponent>
```

### Stories for legacy non-standalone components

Legacy components will often rely on other modules. These should be imported like so:

```ts
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Category/MyComponent',
  component: MyComponent,
  decorators: [
    moduleMetadata({
      imports: [
        // import whatever module is required
        // ...
      ],
    }),
    applicationConfig({
      providers: [
        // provider whatever is needed here
        // note: these are required if the module needs translations:
        provideI18n(),
      ],
    }),
  ],
} as Meta<MyComponent>
```
