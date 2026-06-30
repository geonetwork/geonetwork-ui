---
name: angular-best-practices
description: >-
  Modern Angular best practices for building performant, maintainable Angular 17+
  applications. Covers Signals, RxJS, components, templates, styles, performance,
  SSR, testing, forms, routing, accessibility, and architecture — with code examples
  and impact ratings for every rule.
  Use this skill whenever the user is working on Angular code of any kind: components,
  services, templates, stylesheets, routes, tests, or configuration. This applies to
  editing .component.ts, .service.ts, .html templates, .scss/.css styles, .spec.ts tests,
  .routes.ts files, store files, and any general .ts file in an Angular project.
  Look for angular.json, nx.json, or @angular/core imports as project indicators.
  Do not use for AngularJS (1.x), React, Vue, or non-Angular TypeScript projects.
version: 1.2.0
author: alfredoperez
tags:
  - angular
  - typescript
  - signals
  - performance
  - testing
  - state-management
  - accessibility
globs:
  - "**/*.ts"
  - "**/*.html"
  - "**/*.scss"
  - "**/*.css"
  - "**/*.component.ts"
  - "**/*.service.ts"
  - "**/*.spec.ts"
  - "**/*.routes.ts"
  - "**/*.store.ts"
---

# Modern Angular Best Practices

A comprehensive set of 112 rules covering TypeScript strictness, signal-based reactivity, component architecture, template optimization, RxJS patterns, SSR hydration, bundle optimization, accessibility, routing, forms, testing, and styling — so every component, service, template, and route you build is fast, accessible, tested, and maintainable.

Below are the key patterns organized by what you're working on. For edge cases or when you need specific code examples beyond what's listed here, consult the AGENTS.md reference file in this skill directory.

## Components & Signals

Components are the building blocks. Modern Angular uses signals for reactivity, which changes how you write everything from state to templates.

- Use standalone components with `ChangeDetectionStrategy.OnPush`
- Use `input()`, `output()`, `model()` signal functions instead of decorators
- Use `inject()` instead of constructor injection
- Use `signal()` for local state, `computed()` for derived state
- Use `linkedSignal()` when state should reset when a source changes
- Use `resource()` / `httpResource()` for async data with built-in loading states
- Use `effect()` only for side effects — never for state synchronization
- Use `toSignal()` to bridge RxJS observables into signal-based templates
- Use `viewChild()` / `contentChild()` signal queries instead of decorators
- Use the `host` property instead of `@HostBinding` / `@HostListener`

## Templates & Styles

Templates and styles work together — accessibility, layout, and performance cross both concerns.

- Use `@if`, `@for`, `@switch` control flow instead of structural directives
- Use `@defer` for heavy below-fold content
- Always provide `track` with `@for` loops
- Use `NgOptimizedImage` with `priority` for above-fold images
- Use pure pipes instead of method calls in templates
- Use `CdkVirtualScrollViewport` for large lists
- Use `[class.active]` bindings instead of `[ngClass]`
- Define theme values as CSS custom properties
- Use `prefers-reduced-motion` to respect motion preferences

## Services & RxJS

Services handle data flow, dependency injection, and RxJS patterns. HTTP, caching, and observable lifecycle are interconnected concerns.

- Unsubscribe via `takeUntilDestroyed()` or `async` pipe
- Place `catchError` inside `switchMap` to keep the outer stream alive
- Use `switchMap` for latest-only, `exhaustMap` for ignore-while-busy
- Use `shareReplay({ bufferSize: 1, refCount: true })` for shared streams
- Use `inject()` with `InjectionToken` for configuration
- Use HTTP interceptors for cross-cutting concerns (auth, retry, logging)
- Map DTOs at the API boundary — don't leak backend shapes into components

## Performance & SSR

Performance rules span components, templates, and infrastructure. SSR affects routing, data fetching, and hydration strategy.

- Preload critical data with route resolvers to eliminate waterfalls
- Lazy-load routes and `@defer` heavy views
- Tree-shake imports via standalone component imports, not modules
- Batch DOM reads/writes to avoid layout thrashing
- Use `Map`/`Set` over plain objects/arrays for frequent lookups
- Use incremental hydration (`@defer (hydrate on ...)`) for large pages
- Use `provideClientHydration(withEventReplay())` for SSR
- Set render modes per-route: SSR for SEO, CSR for dashboards

## Testing

Testing patterns apply to components, services, and templates together — isolation is important but integration context matters.

- Use component harnesses over direct DOM queries
- Create test object factories for consistent test data
- Test signal state changes and template output, not implementation
- Mock services with `jasmine.createSpyObj` or `jest.fn()`
- Test accessibility with `axe-core` or `jest-axe`

## Architecture & Routing

Architecture decisions affect every file type — routing, module boundaries, and dependency injection are structural.

- One feature per lazy-loaded route
- Use guards for auth, resolvers for data, `canDeactivate` for unsaved changes
- Use preload strategies (`QuickLinkStrategy`) for likely-next routes
- Bind route params via `input()` with `withComponentInputBinding()`
- Avoid barrel file re-exports — import directly from source
- Use environment-based configuration — no hardcoded URLs or API keys

## TypeScript Foundations

These apply everywhere — components, services, tests, all `.ts` files.

- Use strict type checking with `strict: true` in tsconfig
- Avoid `any`; use `unknown` when type is uncertain, generics to narrow
- Use `import type` for type-only imports
- Add explicit return types to exported functions
- Prefer `readonly` for data that should not be mutated
- Use discriminated unions for state variants
- Use the Result pattern for operations that can fail

## Accessibility

Accessibility spans templates, styles, and components — it's not just an HTML concern.

- Use semantic HTML elements first (`<nav>`, `<main>`, `<button>`)
- Use ARIA roles and `aria-live` regions for dynamic content
- Ensure all interactive elements are keyboard-accessible
- Use `cdkTrapFocus` for dialogs and overlays
- Test with screen readers and `axe-core`

## Quick Reference

| Pattern | Use | Avoid |
|---------|-----|-------|
| Signal inputs | `input<T>()` | `@Input()` |
| Signal outputs | `output<T>()` | `@Output()` |
| Two-way binding | `model<T>()` | input + output pair |
| Dependency injection | `inject()` | Constructor injection |
| Control flow | `@if`, `@for`, `@switch` | `*ngIf`, `*ngFor` |
| Class binding | `[class.active]` | `[ngClass]` |
| Change detection | `OnPush` | Default |
| Derived state | `computed()` | Getters |
| View queries | `viewChild()` | `@ViewChild()` |

## Key Code Patterns

Signal inputs and outputs (replaces decorators):
```typescript
name = input<string>();           // @Input() replacement
save = output<Data>();            // @Output() replacement
value = model<string>();          // two-way binding
```

Control flow (replaces structural directives):
```html
@if (user()) { <profile [user]="user()" /> }
@for (item of items(); track item.id) { <card [item]="item" /> }
@defer (on viewport) { <heavy-chart /> }
```

httpResource and resource (signal-based async):
```typescript
users = httpResource<User[]>(() => `/api/users?role=${this.role()}`);
data = resource({ request: () => this.id(), loader: ({request}) => fetch(request) });
```

## Optional Library Skills

Install library-specific rules alongside this core skill:

| Library | Skill Page |
|---------|------------|
| NgRx | [angular-best-practices-ngrx](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-ngrx) |
| SignalStore | [angular-best-practices-signalstore](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-signalstore) |
| TanStack Query | [angular-best-practices-tanstack](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-tanstack) |
| Angular Material | [angular-best-practices-material](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-material) |
| PrimeNG | [angular-best-practices-primeng](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-primeng) |
| Spartan UI | [angular-best-practices-spartan](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-spartan) |
| Transloco | [angular-best-practices-transloco](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-transloco) |

## Links

- [GitHub Repository](https://github.com/alfredoperez/angular-best-practices)
- [Submit a Rule](https://github.com/alfredoperez/angular-best-practices/issues/new) via GitHub Issues
- [Browse All Skills](https://skills.sh/alfredoperez/angular-best-practices)

## License

MIT
