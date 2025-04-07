---
outline: deep
---

# Styling guidelines

In order to guarantee consistency and maintainability, all contributions to GeoNetwork-UI should adhere to the following guidelines.

## How to style components

Most styling in GeoNetwork-UI happens at the component level. All components might contain styling, although the most complicated styles should live in presentation components (`ui/*` libraries).

### Tailwind classes

The primary way of applying styles to a component is through [Tailwind v3 classes](https://v3.tailwindcss.com/docs/) in the HTML template.

Tailwind classes offer the following advantages:

- Styles can be applied to different states (`focus:bg-white`, `hover:bg-gray`, etc.) and different screen sizes (`sm:bg-white`, `md:bg-gray`, etc.)
- Explicit values can be specified instead of built-in ones, e.g. `w-[50px]` instead of `w-12`
- Styling can also be based on the parent state [using `group` and `group-{modifier}` classes](https://v3.tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)
- Many prebuilt component libraries exists, e.g. [Flowbite](https://flowbite.com/docs/getting-started/introduction/); copy-pasting these gives a great starting point without adding dependencies to the project

Tailwind classes have some limitations, especially when doing more elaborate CSS code. In that case, using the component CSS file is often the best option.

::: info 👉 Rule of thumb

- Use Tailwind classes unless hitting a limitation (see alternatives below)

:::

#### Should I use built-in values (`w-12`) or explicit values (`w-[50px]`)?

Using built-in Tailwind values has the advantage to offer consistency in scaling, spacing etc. On the other hand, it does not give right away the information about _how much the value actually is_.

::: info 👉 Rule of thumb

- Use explicit `px` values when trying to stick to a precise layout, e.g. a mockup, or when manipulating large values, i.e. above the `*-8` size,
- Use explicit `em` values when writing a [scalable component](#scalable-components),
- Use built-in values otherwise.

:::

::: tip
Tailwind classes should always be written explicitly! For instance, this will _not_ get picked up by the compiler:

```html
<div class="w-{{isLarge ? '16' : '12'}}">hello world</div>
```

:::

### CSS file

Every component in the project comes with its titular CSS file. The CSS in that file will always be scoped to the component, which means that the styles written there will never leak onto other components or parts of the layout.

The CSS file also has some advantages like offering access to the `:host` selector.

::: info 👉 Rule of thumb

- Use the CSS file when using `:before` and `:after` pseudo-elements
- Use the CSS file when using `:first-child`, `:first-of-type` and others advanced CSS selector
- Use the CSS file for defining animations
- Use the CSS file when styling the host element through `:host`

:::

::: tip
Keep in mind that CSS can be hard to maintain: it cannot be tested reliably and its cascading nature makes it hard to understand.

The policy in GeoNetwork-UI is to **have as few lines of CSS as possible.**
:::

### Inline CSS in HTML

Writing inline CSS in HTML can also be done. It is the less readable option, but has the following advantages:

- Does not require setting classes or other markers on elements for CSS selectors
- Allows computing values dynamically with `ngStyle`, e.g.:

```html
<div class="absolute top-0" [ngStyle]="{ left: shiftValuePx + 'px' }">hello world</div>
```

::: info 👉 Rule of thumb

- Use inline CSS if the style values must be computed by Angular
- Use inline CSS if Tailwind does not offer a suitable class for that case
- Use inline CSS for setting CSS variables at a certain point in the DOM tree

:::

## How to make presentation components reusable

Presentation components should be built in a way that makes them easy to use. To address the fact that things almost never look the same twice, the following mechanisms have been set up in GeoNetwork-UI.

### Scalable components

A presentation component can be made to be "scalable": this means that its whole design will scale proportionally when changing its text size.

This entails that all style rules applied in this component are written using `em` units.

::: info 👉 Rule of thumb

- Make a component scalable if it is part of `ui/widgets` or `ui/input`
- Do not make a component scalable if it relies too much on text; in that case, only the text size can be made customizable
- Do not make a component scalable if it can contain arbitrary content using e.g. `<ng-content>`

:::

### Generic components

In order to improve code reuse and facilitate customization of presentation components, a small number of generic components classes have been introduced. These classes are written in the [`tailwind.base.css` file](https://github.com/geonetwork/geonetwork-ui/blob/main/tailwind.base.css) which is imported in all applications.

The generic components classes are:

- `.gn-ui-btn`: buttons
- `.gn-ui-text-input`: text input fields
- `.gn-ui-link`: links
- `.gn-ui-card`: cards (i.e. generic blocks used to enclose content)
- `.gn-ui-badge`: badges

Any introduction of a new generic component class should be discussed and approved.

All generic component classes should be prefixed with `gn-ui-`.

::: info 👉 Rule of thumb

Use generic component classes if you need to benefit from the above-mentioned styles without using an existing Angular component like `gn-ui-button` or `gn-ui-text-input`.

:::

### CSS variables

Presentation components should be usable in different contexts and environments. As such, it is important to provide flexibility in their design.

To provide that flexibility, CSS variables can be used to alter parameters such as: margins, paddings, sizing, colors, text size, opacity, border size and radius, box shadow.

CSS variables should be introduced gradually as the need for it arises, instead of trying to cover all possible use cases early (see [YAGNI principle](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)).

All CSS variables should be named as such: `--gn-ui-<component-name>-<property-name>`. For instance: `--gn-ui-tooltip-background` or `--gn-ui-search-bar-shadow`.

A presentation component should work when none of its CSS variables are set, i.e. **always provide a default value**. This can be done with the [`var` CSS operator](https://developer.mozilla.org/en-US/docs/Web/CSS/var) like so:

```css
div {
  margin: var(--gn-ui-my-component-margin, 3px 6px);
}
```

Always add a corresponding demonstration case in the component's storybook entry when adding a CSS variable.

::: info 👉 Rule of thumb

- Introduce a CSS variable in a presentation component if you need to tweak its appearance in a certain context.
- When introducing a CSS variable, always maintain previous appearance/behavior if the CSS variable is not set.

:::

## Theme-based styling

GeoNetwork-UI provides a theming system that allows customizing (among other things):

- Primary and secondary colors
- Main color (i.e. text color) and background color
- Fonts for title and body

Whenever designing a presentation component, the style values derived from the theme should be used as much as possible:

- Tailwind classes are provided for the theme colors and their associated scales, such as:

  - `text-color-primary`, `text-color-primary-lighter`, `text-color-primary-lightest`, etc.
  - `bg-color-primary`, `bg-color-primary-lighter`, `bg-color-primary-lightest`, etc.
  - `font-main` and `font-title`

- Global CSS variables can also be used directly like so:

  ```css
  div {
    color: var(--color-primary-lightest);
  }
  ```

See the [ColorScale component on Storybook](https://geonetwork.github.io/geonetwork-ui/main/storybook/demo/?path=/docs/widgets-colorscalecomponent--docs) for a showcase of available theme-based color scales.

::: info 👉 Rule of thumb

- Use theme-based values for text colors, background colors, border colors
- Do not use `black` and `white` color; instead, use `main` and `background`
- Do not use explicit fonts; instead, use `font-main` or `font-title`
- Do not use built-in [Tailwind color scales](https://v3.tailwindcss.com/docs/customizing-colors) unless a color is meant to convey a meaning (e.g. red for error, orange for warning)

:::

## Things not to do

- ❌ Do _not_ use `!important` (either in CSS or Tailwind classes) unless it is absolutely necessary and no other solution exists
- ❌ Do _not_ use global CSS classes; exceptions are the [generic components](#generic-components) described above
- ❌ Do _not_ use explicit fonts in layouts; fonts used should always be the `main` or `title` ones from the theme; exceptions are things like tooltips, code blocks, etc. where the font used is completely unrelated to the general theme
- ❌ Do _not_ use [`::ng-deep` selector](https://angular.dev/guide/components/styling#ng-deep) unless absolutely necessary (e.g. styling a third-party component)
- ❌ Do _not_ take changes to presentation components lightly; **these components are foundational** and often used in very different environments (including custom apps!). Any change to them should be carefully considered and thoroughly tested in Storybook.
