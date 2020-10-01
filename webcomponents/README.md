# GeoNetwork UI Webcomponents

This directory contains [webcomponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components) relying on the same code as the full GeoNetwork UI, and which are available for use in third-party apps.

They are Angular components as well, but with a slightly different build system.

To build a specific webcomponent, run e.g. `npm run build -- --project=gn-search-input`.

All web components are prefixed with `gn-`.

To test the components live, run `npm run storybook-wc`. this will start an instance of Storybook but with specific stories showcasing each individual webcomponent.

Note that each webcomponent should appear in two stories: one where it is included as an Angular component, and another where it is included as a webcomponent.

> Note: currently all web components must be built manually before starting the storybook instance; this should be automated
