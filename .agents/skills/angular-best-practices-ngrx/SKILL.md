---
name: angular-best-practices-ngrx
description: >-
  NgRx state management best practices for Angular. Covers pure reducers,
  action groups, entity adapter, selectors, and signal-based selection.
  Activates when working with @ngrx/store, @ngrx/effects, and @ngrx/entity.
  Do not use for Akita, NGXS, or standalone signal-based state.
  Install alongside angular-best-practices for full coverage.
license: MIT
metadata:
  author: alfredoperez
  version: "1.2.0"
tags: [angular, ngrx, state-management, redux]
globs:
  - "**/*.ts"
  - "**/*.reducer.ts"
  - "**/*.effects.ts"
  - "**/*.selectors.ts"
---

# Angular NgRx Best Practices

NgRx state management rules for global state with actions, reducers, effects, and selectors. Use with the core
[angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
skill for comprehensive Angular coverage.

## Links

- [Core Skill: angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
- [Browse All Skills](https://skills.sh/alfredoperez/angular-best-practices)
- [GitHub Repository](https://github.com/alfredoperez/angular-best-practices)

## When to Apply

- Adding or modifying NgRx stores, reducers, or effects
- Writing selectors for state selection in components
- Managing collections with `@ngrx/entity`

## Rules

| Rule | Impact | Description |
|------|--------|-------------|
| Keep Reducers Pure | HIGH | No side effects in reducers; move HTTP calls to Effects |
| Use Feature Selectors | MEDIUM | Memoized selectors that recompute only when inputs change |

## Install

Install from [skills.sh/alfredoperez/angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices):

- Core skill: [angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
- This add-on: [angular-best-practices-ngrx](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-ngrx)
