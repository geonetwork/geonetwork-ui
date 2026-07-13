# Angular Best Practices

**Version 1.0.0**
Angular Best Practices
March 7, 2026

> **Note:**
> This document is optimized for AI agents and LLMs. It provides
> actionable guidelines for Angular applications with code examples
> and impact assessments.

---

## Abstract

Comprehensive guidelines for building performant, maintainable Angular applications. These rules cover performance optimization, bundle size reduction, reactive patterns with Signals and RxJS, state management, component architecture, server-side rendering, change detection strategies, testing patterns, and TypeScript best practices. Each rule includes impact assessment and actionable code examples.

---

## Table of Contents

1. [Eliminating Waterfalls](#1-eliminating-waterfalls) — **CRITICAL**
   - 1.1 [Defer Await Until Needed](#11-defer-await-until-needed)
   - 1.2 [Promise.all() for Independent Operations](#12-promise-all-for-independent-operations)
2. [Bundle Optimization](#2-bundle-optimization) — **CRITICAL**
   - 2.1 [Avoid Barrel File Imports](#21-avoid-barrel-file-imports)
   - 2.2 [Conditional Imports for Features](#22-conditional-imports-for-features)
   - 2.3 [Defer Heavy Third-Party Libraries](#23-defer-heavy-third-party-libraries)
   - 2.4 [Preload Critical Resources](#24-preload-critical-resources)
   - 2.5 [Use @defer for Lazy Loading](#25-use-defer-for-lazy-loading)
3. [JavaScript Performance](#3-javascript-performance) — **HIGH**
   - 3.1 [Batch DOM Reads and Writes](#31-batch-dom-reads-and-writes)
   - 3.2 [Cache API Results with Interceptors](#32-cache-api-results-with-interceptors)
   - 3.3 [Memoize Expensive Function Results](#33-memoize-expensive-function-results)
   - 3.4 [Pre-build Lookup Maps from Arrays](#34-pre-build-lookup-maps-from-arrays)
   - 3.5 [Use content-visibility for Off-Screen Content](#35-use-content-visibility-for-off-screen-content)
   - 3.6 [Use Immutable Array Methods](#36-use-immutable-array-methods)
   - 3.7 [Use Passive Event Listeners](#37-use-passive-event-listeners)
   - 3.8 [Use Set/Map for O(1) Lookups](#38-use-set-map-for-o-1-lookups)
4. [TypeScript Best Practices](#4-typescript-best-practices) — **MEDIUM**
   - 4.1 [Avoid Enums, Use const Objects](#41-avoid-enums-use-const-objects)
   - 4.2 [Declare Return Types for Exported Functions](#42-declare-return-types-for-exported-functions)
   - 4.3 [Handle noUncheckedIndexedAccess](#43-handle-nouncheckedindexedaccess)
   - 4.4 [Prefer Explicit Undefined Over Optional](#44-prefer-explicit-undefined-over-optional)
   - 4.5 [Prefer Interface Extends Over Intersections](#45-prefer-interface-extends-over-intersections)
   - 4.6 [Use Discriminated Unions](#46-use-discriminated-unions)
   - 4.7 [Use import type for Type-Only Imports](#47-use-import-type-for-type-only-imports)
   - 4.8 [Use Readonly Properties by Default](#48-use-readonly-properties-by-default)
   - 4.9 [Use Result Types Instead of Throwing](#49-use-result-types-instead-of-throwing)
   - 4.10 [When any is Acceptable in Generics](#410-when-any-is-acceptable-in-generics)
   - 4.11 [When to Use JSDoc Comments](#411-when-to-use-jsdoc-comments)
5. [Signals & Reactivity](#5-signals-reactivity) — **HIGH**
   - 5.1 [Avoid Effects for State Propagation](#51-avoid-effects-for-state-propagation)
   - 5.2 [Use Computed for Derived State](#52-use-computed-for-derived-state)
   - 5.3 [Use httpResource() for Signal-Based Data Fetching](#53-use-httpresource-for-signal-based-data-fetching)
   - 5.4 [Use linkedSignal() for Dependent Resettable State](#54-use-linkedsignal-for-dependent-resettable-state)
   - 5.5 [Use model() for Two-Way Binding](#55-use-model-for-two-way-binding)
   - 5.6 [Use Optimistic Updates with Signals](#56-use-optimistic-updates-with-signals)
   - 5.7 [Use resource() for Async Data Loading](#57-use-resource-for-async-data-loading)
   - 5.8 [Use Signal Content Queries](#58-use-signal-content-queries)
   - 5.9 [Use Signal View Queries](#59-use-signal-view-queries)
   - 5.10 [Use Signals for Local State](#510-use-signals-for-local-state)
   - 5.11 [Use toSignal for Observables](#511-use-tosignal-for-observables)
6. [Component Patterns](#6-component-patterns) — **HIGH**
   - 6.1 [Use Host Object for Element Bindings](#61-use-host-object-for-element-bindings)
   - 6.2 [Use inject() Function for Dependencies](#62-use-inject-function-for-dependencies)
7. [RxJS Patterns](#7-rxjs-patterns) — **HIGH**
   - 7.1 [Choose the Right Flattening Operator](#71-choose-the-right-flattening-operator)
   - 7.2 [Handle Errors in Streams](#72-handle-errors-in-streams)
   - 7.3 [Use combineLatest for Multiple Streams](#73-use-combinelatest-for-multiple-streams)
   - 7.4 [Use DestroyRef and takeUntilDestroyed](#74-use-destroyref-and-takeuntildestroyed)
   - 7.5 [Use shareReplay for Multicasting](#75-use-sharereplay-for-multicasting)
8. [Template Optimization](#8-template-optimization) — **HIGH**
   - 8.1 [Use NgOptimizedImage for Images](#81-use-ngoptimizedimage-for-images)
   - 8.2 [Use Pure Pipes for Transforms](#82-use-pure-pipes-for-transforms)
   - 8.3 [Use Virtual Scrolling for Large Lists](#83-use-virtual-scrolling-for-large-lists)
9. [SSR & Hydration](#9-ssr-hydration) — **HIGH**
   - 9.1 [Configure Server Route Render Modes](#91-configure-server-route-render-modes)
   - 9.2 [Enable Client Hydration](#92-enable-client-hydration)
   - 9.3 [Fetch Data in Parallel on Server](#93-fetch-data-in-parallel-on-server)
   - 9.4 [Run Non-Critical Work After Response](#94-run-non-critical-work-after-response)
   - 9.5 [Set SEO Meta Tags for SSR Pages](#95-set-seo-meta-tags-for-ssr-pages)
   - 9.6 [Use Incremental Hydration with @defer](#96-use-incremental-hydration-with-defer)
   - 9.7 [Use LRU Cache for SSR Computations](#97-use-lru-cache-for-ssr-computations)
   - 9.8 [Use TransferState to Avoid Refetch](#98-use-transferstate-to-avoid-refetch)
10. [Forms](#10-forms) — **MEDIUM**
   - 10.1 [Create Reusable Validators](#101-create-reusable-validators)
   - 10.2 [Handle Form Submission Properly](#102-handle-form-submission-properly)
   - 10.3 [Use ControlValueAccessor for Custom Controls](#103-use-controlvalueaccessor-for-custom-controls)
   - 10.4 [Use ngx-formly for Dynamic Forms](#104-use-ngx-formly-for-dynamic-forms)
11. [Architecture](#11-architecture) — **HIGH**
   - 11.1 [Enforce Module Boundaries](#111-enforce-module-boundaries)
   - 11.2 [Use Barrel Files for Public APIs](#112-use-barrel-files-for-public-apis)
   - 11.3 [Use Domain-Driven Folder Structure](#113-use-domain-driven-folder-structure)
12. [Testing](#12-testing) — **HIGH**
   - 12.1 [Automate Accessibility Testing with axe-core](#121-automate-accessibility-testing-with-axe-core)
   - 12.2 [Component Testing with Angular Testing Library](#122-component-testing-with-angular-testing-library)
   - 12.3 [Mocking with ng-mocks and MSW](#123-mocking-with-ng-mocks-and-msw)
   - 12.4 [Test Signals and Computed Values](#124-test-signals-and-computed-values)
   - 12.5 [Unit Testing with Vitest](#125-unit-testing-with-vitest)
   - 12.6 [Use CDK Component Test Harnesses](#126-use-cdk-component-test-harnesses)
   - 12.7 [Use Object Mothers for Test Data](#127-use-object-mothers-for-test-data)
13. [Infrastructure](#13-infrastructure) — **MEDIUM**
   - 13.1 [Enable Scroll Position Restoration](#131-enable-scroll-position-restoration)
   - 13.2 [Error Handling Patterns](#132-error-handling-patterns)
   - 13.3 [Schema-Validate LocalStorage Data](#133-schema-validate-localstorage-data)
   - 13.4 [Security Patterns](#134-security-patterns)
   - 13.5 [Use CanDeactivate Guard for Unsaved Changes](#135-use-candeactivate-guard-for-unsaved-changes)
   - 13.6 [Use Custom Preloading Strategy](#136-use-custom-preloading-strategy)
   - 13.7 [Use Event Delegation for Lists](#137-use-event-delegation-for-lists)
   - 13.8 [Use Factory Providers for Complex Setup](#138-use-factory-providers-for-complex-setup)
   - 13.9 [Use Functional Route Guards](#139-use-functional-route-guards)
   - 13.10 [Use Functional Route Resolvers](#1310-use-functional-route-resolvers)
   - 13.11 [Use InjectionToken with Factory for Config](#1311-use-injectiontoken-with-factory-for-config)
   - 13.12 [Use provideAppInitializer for Startup Logic](#1312-use-provideappinitializer-for-startup-logic)
   - 13.13 [Use Route Input Binding](#1313-use-route-input-binding)
14. [UI & Accessibility](#14-ui-accessibility) — **MEDIUM**
   - 14.1 [Ensure Keyboard Navigation](#141-ensure-keyboard-navigation)
   - 14.2 [Loading State Patterns](#142-loading-state-patterns)
   - 14.3 [Manage Focus with CDK FocusTrap](#143-manage-focus-with-cdk-focustrap)
   - 14.4 [Respect prefers-reduced-motion](#144-respect-prefers-reduced-motion)
   - 14.5 [Theming Patterns](#145-theming-patterns)
   - 14.6 [Use ARIA Roles and Live Regions](#146-use-aria-roles-and-live-regions)
15. [Data Handling](#15-data-handling) — **MEDIUM**
   - 15.1 [Compose Mappers for Nested Data](#151-compose-mappers-for-nested-data)
   - 15.2 [Use Functional HTTP Interceptors](#152-use-functional-http-interceptors)
   - 15.3 [Use Pure Mapper Functions for DTOs](#153-use-pure-mapper-functions-for-dtos)

---

## 1. Eliminating Waterfalls

**Impact: CRITICAL** (2-10× improvement)

### 1.1 Defer Await Until Needed

**Impact: HIGH** (avoids blocking unused code paths)

Move `await` into branches where needed. Check cheapest conditions first (local state) before making expensive async calls.

**Example:**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) return { skipped: true }; // Fast path - no await
  const userData = await fetchUserData(userId);
  return processUserData(userData);
}
```

### 1.2 Promise.all() for Independent Operations

**Impact: CRITICAL** (2-10x improvement, eliminates waterfalls)

Execute independent async operations concurrently instead of sequentially. Use `forkJoin()` for RxJS, `Promise.allSettled()` for partial failures.

**Example:**

```typescript
const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)]);
```

---

## 2. Bundle Optimization

**Impact: CRITICAL** (Reduces initial load)

### 2.1 Avoid Barrel File Imports

**Impact: CRITICAL** (200-800ms import cost, slow builds)

Import directly from source files instead of barrel files (index.ts) to avoid loading thousands of unused modules. For **creating** barrel files for your domain's public API, see `arch-barrel-files.md`.

**Incorrect:**

```typescript
import { Check, X, Menu } from 'lucide-angular';
import { debounce } from 'lodash';
```

**Correct:**

```typescript
import { LucideCheck } from 'lucide-angular/check';
import debounce from 'lodash/debounce';
```

### 2.2 Conditional Imports for Features

**Impact: MEDIUM** (Excludes unused code from bundle)

Use conditional imports and feature flags to exclude unused code from production bundles.

**Example:**

```typescript
providers: [
  provideRouter(routes),
  ...(isDevMode() ? [provideDevTools()] : []),
]
```

### 2.3 Defer Heavy Third-Party Libraries

**Impact: MEDIUM** (Reduces initial bundle size)

Load heavy libraries (Chart.js, PDF.js, Leaflet, Quill) only when needed using `@defer` or dynamic imports.

**Example:**

```typescript
async generatePdf(content: string) {
  const { jsPDF } = await import('jspdf');
  return new jsPDF().text(content, 10, 10);
}
```

### 2.4 Preload Critical Resources

**Impact: LOW** (Improves perceived performance)

Use `withPreloading(PreloadAllModules)` for routes. Use `@defer (prefetch on idle)` for components. Use `<link rel="preload">` for critical fonts.

**Example:**

```html
@defer (on viewport; prefetch on idle) { <app-heavy-component /> }
@defer (on interaction; prefetch on hover) { <app-modal /> }
```

### 2.5 Use @defer for Lazy Loading

**Impact: HIGH** (reduces initial bundle size)

Use `@defer` for component-level lazy loading. Triggers: `on viewport`, `on interaction`, `on idle`, `on timer(ms)`, `when condition()`.

**Example:**

```html
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="chart-skeleton"></div>
} @loading (minimum 200ms) {
  <app-spinner />
}
```

---

## 3. JavaScript Performance

**Impact: HIGH** (Runtime performance)

### 3.1 Batch DOM Reads and Writes

**Impact: MEDIUM** (avoids layout thrashing)

When manipulating the DOM directly, batch all reads together and all writes together to avoid layout thrashing.

**Incorrect:**

```typescript
for (const el of elements) {
  const height = el.offsetHeight; // READ - triggers layout
  el.style.height = `${height * 2}px`; // WRITE - invalidates layout
}
```

**Correct:**

```typescript
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => el.style.height = `${heights[i] * 2}px`);
```

**In Angular, prefer template bindings** which let Angular handle DOM updates efficiently. When direct DOM access is needed, use `requestAnimationFrame()`.
**Properties that trigger layout:** `offsetTop/Left/Width/Height`, `scrollTop/Left/Width/Height`, `clientTop/Left/Width/Height`, `getComputedStyle()`, `getBoundingClientRect()`

### 3.2 Cache API Results with Interceptors

**Impact: MEDIUM** (Eliminates redundant network requests)

Use an HTTP interceptor or service-level caching with signals to avoid redundant API calls — prefer Angular-idiomatic patterns over raw `sessionStorage`.

**Example:**

```typescript
// Service-level caching with signals
private configCache = signal<Config | null>(null);
loadConfig = () => this.configCache() ?? this.http.get<Config>('/api/config').pipe(
  tap(d => this.configCache.set(d))
);
```

### 3.3 Memoize Expensive Function Results

**Impact: MEDIUM** (avoid redundant computation)

Use `computed()` for automatic memoization of expensive calculations. Computed signals only recalculate when dependencies change.

**Example:**

```typescript
statistics = computed(() =>
  this.data().reduce((stats, point) => computeStats(stats, point), initial)
);

// Or use TanStack Query with staleTime for API caching
```

### 3.4 Pre-build Lookup Maps from Arrays

**Impact: MEDIUM** (O(n²) to O(n) for repeated lookups)

When looking up items multiple times, build a Map first. Converts O(n) lookups to O(1).

**Example:**

```typescript
const userMap = new Map(users.map(u => [u.id, u]));
return orders.map(order => ({
  ...order,
  user: userMap.get(order.userId),
}));
```

### 3.5 Use content-visibility for Off-Screen Content

**Impact: HIGH** (10x faster initial render for long pages)

Apply `content-visibility: auto` to skip rendering of off-screen content until scrolled into view. Add `contain-intrinsic-size` to reserve space for scroll calculations: `.card { content-visibility: auto; contain-intrinsic-size: 0 200px; }`.

### 3.6 Use Immutable Array Methods

**Impact: MEDIUM** (Cleaner code, no accidental mutations)

Use ES2023's `toSorted()`, `toReversed()`, and `toSpliced()` instead of mutating methods that require copying. Instead of `[...items].sort()`, use `items.toSorted()`. Instead of `[...items].reverse()`, use `items.toReversed()`. Instead of splice with a copy, use `items.toSpliced(index, 1)`.

### 3.7 Use Passive Event Listeners

**Impact: LOW** (improves scroll performance)

Add `{ passive: true }` to `addEventListener()` for `scroll`, `wheel`, `touchstart`, `touchmove`, and `touchend` events. Passive listeners improve scroll performance by telling the browser that `preventDefault()` won't be called. Avoid when you need to call `preventDefault()`.

### 3.8 Use Set/Map for O(1) Lookups

**Impact: MEDIUM** (O(n) to O(1) lookup performance)

Convert arrays to Set/Map for repeated membership checks. Array `includes()` is O(n); Set `has()` is O(1). Convert when checking membership more than once or arrays have >10 items.

**Incorrect (O(n) per check):**

```typescript
const allowedIds = ['a', 'b', 'c'];
const filtered = items.filter(item => allowedIds.includes(item.id));
```

**Correct (O(1) per check):**

```typescript
const allowedIds = new Set(['a', 'b', 'c']);
const filtered = items.filter(item => allowedIds.has(item.id));
```

---

## 4. TypeScript Best Practices

**Impact: MEDIUM** (Type safety & maintainability)

### 4.1 Avoid Enums, Use const Objects

**Impact: MEDIUM** (Better tree-shaking, clearer behavior)

Use `as const` objects instead of enums for predictable behavior and tree-shaking.

**Incorrect:**

```typescript
enum Direction { Up, Down } // Numeric enums create reverse mappings
Object.keys(Direction).length; // 4, not 2!
```

**Correct:**

```typescript
const Direction = { Up: 'UP', Down: 'DOWN' } as const;
type Direction = (typeof Direction)[keyof typeof Direction]; // 'UP' | 'DOWN'
```

### 4.2 Declare Return Types for Exported Functions

**Impact: LOW** (Improves AI comprehension, serves as documentation)

Add explicit return types to exported/public functions: `function getUser(id: string): User`. This helps AI tools understand your API contracts and catches accidental return type changes. Internal/private functions can rely on inference.

### 4.3 Handle noUncheckedIndexedAccess

**Impact: LOW** (Safer array/object access)

With `noUncheckedIndexedAccess`, array/object indexing returns `T | undefined`. Always check before using.

**Example:**

```typescript
const first = users[0];
if (first) { console.log(first.name); }
// Or: console.log(first?.name ?? 'Unknown');
```

### 4.4 Prefer Explicit Undefined Over Optional

**Impact: MEDIUM** (Catches missing property bugs at compile time)

Use `prop: T | undefined` instead of `prop?: T` when omission is a bug. Optional props (`?`) allow complete omission, while `T | undefined` requires explicit `undefined` to signal intentional absence.

### 4.5 Prefer Interface Extends Over Intersections

**Impact: LOW** (Better performance, clearer error messages)

Use `interface Dog extends Animal` instead of `type Dog = Animal & { breed: string }`. Interface extends produces clearer error messages (shows "Dog" vs full intersection) and has better TypeScript compiler performance.

### 4.6 Use Discriminated Unions

**Impact: HIGH** (Prevents impossible states)

Model mutually exclusive states with a discriminant property to prevent impossible states at compile time.

**Example:**

```typescript
type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

### 4.7 Use import type for Type-Only Imports

**Impact: LOW** (Smaller bundles, cleaner transpilation)

Use `import type { User } from './user'` instead of `import { type User } from './user'` — the statement-level form is clearer, always fully erased at transpilation, and aligns with `verbatimModuleSyntax` in TypeScript 5.0+.

### 4.8 Use Readonly Properties by Default

**Impact: MEDIUM** (Prevents accidental mutation)

Mark properties as `readonly` by default; omit only when mutation is intentional. Use `Readonly<T>` for objects and `readonly T[]` or `ReadonlyArray<T>` for arrays to catch accidental mutations at compile time.

### 4.9 Use Result Types Instead of Throwing

**Impact: MEDIUM** (Explicit error handling, type-safe)

For operations that can fail, return a Result type instead of throwing. Makes error handling explicit and type-safe.

**Example:**

```typescript
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
function parseJson(input: string): Result<unknown> {
  try { return { ok: true, value: JSON.parse(input) }; }
  catch (e) { return { ok: false, error: e as Error }; }
}
```

### 4.10 When any is Acceptable in Generics

**Impact: LOW** (Practical type safety in complex generics)

Use `as any` inside generic function bodies when TypeScript can't verify conditional types. The public API remains typed; internal casts don't leak.

**Example:**

```typescript
const flip = <T extends 'a' | 'b'>(x: T): T extends 'a' ? 'b' : 'a' => {
  return (x === 'a' ? 'b' : 'a') as any; // OK - public API is still typed
};
```

### 4.11 When to Use JSDoc Comments

**Impact: LOW** (Improves discoverability for non-obvious behavior)

Use JSDoc for `@deprecated`, `@throws`, and non-obvious behavior. Don't repeat type information already in the signature.

**Example:**

```typescript
/** @deprecated Use getUserById instead. Removed in v3.0. */
function fetchUser(id: string): Observable<User> { }
```

---

## 5. Signals & Reactivity

**Impact: HIGH** (Reactive state management)

### 5.1 Avoid Effects for State Propagation

**Impact: MEDIUM** (Prevents circular dependencies, cleaner data flow)

Use `computed()` for derived state, not `effect()` with `.set()`. Effects are for external side effects (logging, DOM manipulation, analytics), not for propagating state between signals.

**Example:**

```typescript
// Computed handles derivation without circular dependency risks
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### 5.2 Use Computed for Derived State

**Impact: HIGH** (Memoized derivation, prevents redundant calculations)

Use `computed()` instead of getters for derived state. Getters re-run on every change detection; computed signals are memoized and only recalculate when dependencies change.

**Example:**

```typescript
// Memoized; only runs when firstName or lastName changes
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### 5.3 Use httpResource() for Signal-Based Data Fetching

**Impact: HIGH** (Reactive GET with auto-refetch)

Use `httpResource()` for reactive GET requests that auto-refetch when signal dependencies change, replacing manual HttpClient subscribe patterns.

**Incorrect:**

```typescript
loading = signal(false);
data = signal<User | null>(null);
ngOnInit() {
  this.loading.set(true);
  this.http.get<User>(`/api/users/${this.userId()}`).subscribe(u => { this.data.set(u); this.loading.set(false); });
}
```

**Correct:**

```typescript
userId = input.required<string>();
user = httpResource<User>(() => `/api/users/${this.userId()}`);
// Access: user.value(), user.isLoading(), user.error()
```

### 5.4 Use linkedSignal() for Dependent Resettable State

**Impact: HIGH** (Auto-resets derived state)

Use `linkedSignal()` when a writable signal's value should reset automatically when a source signal changes.

**Incorrect:**

```typescript
options = signal(['Ground', 'Air', 'Sea']);
selected = signal(this.options()[0]);
constructor() { effect(() => this.selected.set(this.options()[0])); }
```

**Correct:**

```typescript
options = signal(['Ground', 'Air', 'Sea']);
selected = linkedSignal(() => this.options()[0]);
// Writable: selected.set('Air') — auto-resets when options change
```

### 5.5 Use model() for Two-Way Binding

**Impact: HIGH** (Simplified two-way binding)

Use `model()` instead of input+output pairs when parent and child need synchronized state via `[(value)]` syntax.

**Incorrect:**

```typescript
@Input() value = 0;
@Output() valueChange = new EventEmitter<number>();
update(v: number) { this.value = v; this.valueChange.emit(v); }
```

**Correct:**

```typescript
value = model<number>(0);
update(v: number) { this.value.set(v); }
// Parent: <my-comp [(value)]="count" />
```

### 5.6 Use Optimistic Updates with Signals

**Impact: MEDIUM** (Instant UI feedback)

Update signal state immediately before API calls and rollback on error to provide instant UI feedback.

**Incorrect:**

```typescript
async delete(id: string) {
  await firstValueFrom(this.http.delete(`/api/items/${id}`));
  this.items.update(items => items.filter(i => i.id !== id));
}
```

**Correct:**

```typescript
delete(id: string) {
  const prev = this.items();
  this.items.update(items => items.filter(i => i.id !== id));
  this.http.delete(`/api/items/${id}`).subscribe({ error: () => this.items.set(prev) });
}
```

### 5.7 Use resource() for Async Data Loading

**Impact: HIGH** (Built-in loading/error/cancellation)

Use the `resource()` API for generic async operations with built-in loading, error, and cancellation state via `ResourceRef`.

**Incorrect:**

```typescript
data = signal<User | undefined>(undefined);
loading = signal(false);
error = signal<Error | null>(null);
loadUser() { this.loading.set(true); fetch(`/api/users/${this.id()}`).then(r => r.json()).then(d => this.data.set(d)).finally(() => this.loading.set(false)); }
```

**Correct:**

```typescript
userResource = resource({
  params: () => ({ id: this.userId() }),
  loader: ({ params }) => fetch(`/api/users/${params.id}`).then(r => r.json()),
});
// Access: userResource.value(), userResource.isLoading(), userResource.error()
```

### 5.8 Use Signal Content Queries

**Impact: HIGH** (Reactive, no lifecycle hooks)

Use `contentChild()` and `contentChildren()` signal-based queries instead of `@ContentChild` and `@ContentChildren` decorators.

**Incorrect:**

```typescript
@ContentChild(TemplateRef) template!: TemplateRef<unknown>;
ngAfterContentInit() { this.renderTemplate(this.template); }
```

**Correct:**

```typescript
template = contentChild.required(TemplateRef);
// Reactive: use template() in computed() or effect(), no lifecycle hooks needed
```

### 5.9 Use Signal View Queries

**Impact: HIGH** (Reactive, no lifecycle hooks)

Use `viewChild()` and `viewChildren()` signal-based queries instead of `@ViewChild` and `@ViewChildren` decorators.

**Incorrect:**

```typescript
@ViewChild('chart') chart!: ElementRef;
ngAfterViewInit() { this.initChart(this.chart.nativeElement); }
```

**Correct:**

```typescript
chart = viewChild.required<ElementRef>('chart');
// Reactive: use chart() in computed() or effect(), no lifecycle hooks needed
```

### 5.10 Use Signals for Local State

**Impact: HIGH** (Fine-grained reactivity, zoneless-ready)

Use `signal<T>(initialValue)` instead of plain class properties for component state — signals provide fine-grained reactivity and enable zoneless change detection, updated with `.set()` or `.update()`.

### 5.11 Use toSignal for Observables

**Impact: MEDIUM** (Cleaner templates, zoneless-ready)

Use `toSignal()` to bridge RxJS observables to signals for simpler template usage. In templates, use `params()?.id` instead of `(params$ | async)?.id`.

**Example:**

```typescript
// Converts observable to signal with automatic subscription management
params = toSignal(this.route.params);
```

---

## 6. Component Patterns

**Impact: HIGH** (Component architecture)

### 6.1 Use Host Object for Element Bindings

**Impact: HIGH** (Centralizes host interactions)

Use the `host` property in `@Component`/`@Directive` instead of `@HostBinding` and `@HostListener` decorators for centralized, declarative host element interactions.

**Incorrect:**

```typescript
@HostBinding('class.active') isActive = false;
@HostListener('click') onClick() { this.isActive = true; }
```

**Correct:**

```typescript
@Component({
  host: { '[class.active]': 'isActive()', '(click)': 'activate()' }
})
```

### 6.2 Use inject() Function for Dependencies

**Impact: HIGH** (Cleaner DI, works in functions)

Prefer the `inject()` function over constructor injection for cleaner syntax, better type inference, and compatibility with functional guards/interceptors.

**Incorrect:**

```typescript
@Component({ selector: 'app-user' })
export class UserComponent {
  constructor(private userService: UserService, private router: Router) {}
}
```

**Correct:**

```typescript
@Component({ selector: 'app-user' })
export class UserComponent {
  private userService = inject(UserService);
  private router = inject(Router);
}
```

---

## 7. RxJS Patterns

**Impact: HIGH** (Memory leaks & cancellation)

### 7.1 Choose the Right Flattening Operator

**Impact: HIGH** (Prevents race conditions)

Use `switchMap` to cancel previous (search/autocomplete), `exhaustMap` to ignore new (form submit), `concatMap` for ordered sequential, `mergeMap` for parallel — choosing wrong causes race conditions or lost requests.

**Correct:**

```typescript
search$ = this.query$.pipe(switchMap(q => this.api.search(q)));       // Cancel previous
submit$ = this.click$.pipe(exhaustMap(() => this.api.save(this.form))); // Ignore while busy
ordered$ = this.ids$.pipe(concatMap(id => this.api.process(id)));      // Preserve order
```

### 7.2 Handle Errors in Streams

**Impact: HIGH** (Prevents stream termination)

Use `catchError` inside `switchMap` to handle errors without terminating the outer stream.

**Incorrect:**

```typescript
// Error terminates entire stream - no more searches work
search$ = this.term$.pipe(
  switchMap(term => this.api.search(term)),
  catchError(() => of([])) // Too late - outer stream dead
);
```

**Correct:**

```typescript
search$ = this.term$.pipe(
  switchMap(term => this.api.search(term).pipe(
    catchError(() => of([])) // Recovers per-request
  ))
);
```

### 7.3 Use combineLatest for Multiple Streams

**Impact: MEDIUM** (Combines dependent data)

Use `combineLatest({ user: user$, permissions: perms$ })` to combine multiple streams instead of nested subscribes. Emits when any source emits, providing the latest value from each.

**Example:**

```typescript
vm$ = combineLatest({
  user: this.user$,
  permissions: this.permissions$,
  settings: this.settings$
});
```

### 7.4 Use DestroyRef and takeUntilDestroyed

**Impact: HIGH** (No manual unsubscribe logic)

Use `takeUntilDestroyed()` in injection context and `DestroyRef.onDestroy()` for cleanup instead of implementing `OnDestroy` with a Subject.

**Incorrect:**

```typescript
private destroy$ = new Subject<void>();
ngOnInit() { this.data$.pipe(takeUntil(this.destroy$)).subscribe(); }
ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
```

**Correct:**

```typescript
private destroyRef = inject(DestroyRef);
ngOnInit() { this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(); }
// Outside injection context: pass DestroyRef explicitly
```

### 7.5 Use shareReplay for Multicasting

**Impact: MEDIUM** (Avoids duplicate HTTP calls)

Use `shareReplay({ bufferSize: 1, refCount: true })` to share results among multiple subscribers and avoid duplicate HTTP requests.

**Example:**

```typescript
users$ = this.http.get<User[]>('/api/users').pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);
```

---

## 8. Template Optimization

**Impact: HIGH** (Lazy loading & pipes)

### 8.1 Use NgOptimizedImage for Images

**Impact: HIGH** (Optimizes LCP & Core Web Vitals)

Use the `NgOptimizedImage` directive (`ngSrc`) with `priority` for above-fold images to enable automatic lazy loading, srcset generation, and preconnect hints.

**Incorrect:**

```html
<img src="/assets/hero.png" alt="Hero">
```

**Correct:**

```html
<img ngSrc="/assets/hero.png" width="800" height="400" priority alt="Hero">
```

### 8.2 Use Pure Pipes for Transforms

**Impact: MEDIUM** (Memoized, only recalculates on input change)

Use pure pipes instead of method calls in templates for memoized transformations.

**Incorrect:**

```html
<!-- Method runs on every change detection cycle -->
<span>{{ formatCurrency(price) }}</span>
```

**Correct:**

```html
<!-- Pure pipe only runs when price changes -->
<span>{{ price | currency:'USD' }}</span>
<!-- Or custom pipe -->
<span>{{ user.name | initials }}</span>
```

### 8.3 Use Virtual Scrolling for Large Lists

**Impact: HIGH** (Renders only visible items)

Use `CdkVirtualScrollViewport` with `*cdkVirtualFor` to render only visible items in long lists, reducing DOM nodes from thousands to ~20.

**Incorrect:**

```html
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

**Correct:**

```html
<cdk-virtual-scroll-viewport itemSize="48">
  <div *cdkVirtualFor="let item of items">{{ item.name }}</div>
</cdk-virtual-scroll-viewport>
```

---

## 9. SSR & Hydration

**Impact: HIGH** (Initial render & SEO)

### 9.1 Configure Server Route Render Modes

**Impact: HIGH** (Per-route rendering strategy)

Use `ServerRoute` with `RenderMode.Prerender`, `RenderMode.Server`, or `RenderMode.Client` to control rendering strategy per route.

**Incorrect:**

```typescript
const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Server }
];
```

**Correct:**

```typescript
const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'dashboard', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server }
];
```

### 9.2 Enable Client Hydration

**Impact: HIGH** (Preserves server-rendered DOM)

Enable `provideClientHydration(withEventReplay())` to reuse server-rendered DOM instead of destroying and rebuilding it on the client.

**Example:**

```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
});
```

### 9.3 Fetch Data in Parallel on Server

**Impact: HIGH** (Reduces SSR response time by parallelization)

Use `Promise.all()` or `forkJoin()` to fetch independent data sources concurrently during SSR to reduce total response time.

**Example:**

```typescript
async resolve() {
  const [user, posts] = await Promise.all([
    this.userService.get(),   // 200ms
    this.postService.get(),   // 300ms
  ]);
  return { user, posts };     // Total: 300ms (parallel, not 500ms)
}
```

### 9.4 Run Non-Critical Work After Response

**Impact: MEDIUM** (Faster Time to First Byte)

Send the response first, then perform analytics, logging, or cache warming fire-and-forget style without blocking TTFB.

**Example:**

```typescript
async handleRequest(req: Request) {
  const html = await this.render(req);
  // Fire-and-forget: don't await non-critical work
  this.analytics.track(req).catch(console.error);
  this.cache.warm(req).catch(console.error);
  return html;
}
```

### 9.5 Set SEO Meta Tags for SSR Pages

**Impact: MEDIUM** (Improves search indexing)

Use Angular's `Meta` and `Title` services to set Open Graph, Twitter Card, and canonical URL meta tags for server-rendered pages.

**Incorrect:**

```typescript
export class ProductPage {
  product = input.required<Product>();
}
```

**Correct:**

```typescript
#meta = inject(Meta);
#title = inject(Title);
product = input.required<Product>();
constructor() {
  effect(() => this.#title.setTitle(this.product().name));
}
```

### 9.6 Use Incremental Hydration with @defer

**Impact: HIGH** (Reduces hydration cost)

Enable `provideClientHydration(withIncrementalHydration())` and use `@defer (hydrate on ...)` triggers to hydrate components progressively instead of all at once.

**Incorrect:**

```html
<hero-banner />
<comments-section />
<footer-widgets />
```

**Correct:**

```html
<hero-banner />
@defer (hydrate on viewport) {
  <comments-section />
}
```

### 9.7 Use LRU Cache for SSR Computations

**Impact: HIGH** (Reduces server response time 50-90%)

Cache expensive server-side computations with an LRU cache and TTL to avoid recomputation on repeated requests.

**Example:**

```typescript
private cache = new Map<string, { data: Data; timestamp: number }>();
async renderPage(id: string) {
  const cached = this.cache.get(id);
  if (cached && Date.now() - cached.timestamp < 60000) return this.render(cached.data);
  const data = await this.expensiveComputation(id);
  this.cache.set(id, { data, timestamp: Date.now() });
  return this.render(data);
}
```

### 9.8 Use TransferState to Avoid Refetch

**Impact: HIGH** (Eliminates duplicate API calls)

Use `TransferState` to pass server-fetched data to the client, avoiding duplicate API requests during hydration.

**Example:**

```typescript
data = this.transferState.hasKey(DATA_KEY)
  ? this.transferState.get(DATA_KEY, null)
  : this.http.get('/api/data').pipe(
      tap(d => this.transferState.set(DATA_KEY, d))
    );
```

---

## 10. Forms

**Impact: MEDIUM** (Form handling)

### 10.1 Create Reusable Validators

**Impact: MEDIUM** (DRY validation, consistent error handling)

Extract common validation logic into reusable `ValidatorFn` functions instead of inline validators or repeated patterns.

**Example:**

```typescript
export const emailValidator: ValidatorFn = (control) =>
  control.value?.includes('@') ? null : { invalidEmail: true };

// Usage: email: ['', [Validators.required, emailValidator]]
```

### 10.2 Handle Form Submission Properly

**Impact: MEDIUM** (Better UX, proper error handling)

Check validity and mark touched before submit, track loading state with a signal, and use `getRawValue()` to include disabled fields.

**Example:**

```typescript
async onSubmit() {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  this.loading.set(true);
  try { await this.api.submit(this.form.getRawValue()); }
  finally { this.loading.set(false); }
}
```

### 10.3 Use ControlValueAccessor for Custom Controls

**Impact: MEDIUM** (Form integration, reusable custom inputs)

Implement `ControlValueAccessor` to make custom components work with reactive forms via `formControlName` and `[(ngModel)]`.

**Example:**

```typescript
@Component({ providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: RatingComponent, multi: true }] })
export class RatingComponent implements ControlValueAccessor {
  writeValue(v: number) { this.value.set(v); }
}
```

### 10.4 Use ngx-formly for Dynamic Forms

**Impact: MEDIUM** (Reduces form boilerplate by 60-80%)

Use ngx-formly for forms driven by configuration (JSON/API). Define field configs instead of writing template markup. Create reusable custom field types for domain-specific inputs.

**Incorrect:**

```html
<!-- Manually building 50+ fields with repeated template markup -->
@for (f of fields; track f.key) { <input [formControlName]="f.key" [type]="f.type" /> }
```

**Correct:**

```typescript
fields: FormlyFieldConfig[] = [
  { key: 'name', type: 'input', props: { label: 'Name', required: true } },
  { key: 'role', type: 'select', props: { label: 'Role', options: this.roles$ } },
];
```

---

## 11. Architecture

**Impact: HIGH** (Scalability)

### 11.1 Enforce Module Boundaries

**Impact: HIGH** (Prevents spaghetti dependencies)

Use Sheriff or Nx to enforce dependency rules between domains and layers.

**Incorrect:**

```typescript
// ui component imports from another domain's data layer
import { OrderService } from '../../orders/data/order.service'; // Cross-domain!
```

**Correct:**

```typescript
// ui component only imports from own domain or shared
import { OrderService } from '../data/order.service';
import { formatCurrency } from '@app/shared/util';
```

Use Sheriff for standalone projects, Nx for monorepos.

### 11.2 Use Barrel Files for Public APIs

**Impact: MEDIUM** (Clear public contracts, encapsulation)

Export only what other domains should access via `index.ts` barrel files. This rule is about **creating** focused barrel files for your domain boundaries. For avoiding **consuming** large barrel files from libraries, see `bundle-barrel-imports.md`.

**Example:**

```typescript
// customers/index.ts - only export public API
export { Customer } from './model/customer.model';
export { CustomerService } from './data/customer.service';
```

### 11.3 Use Domain-Driven Folder Structure

**Impact: MEDIUM** (Better organization, clear boundaries)

Organize by domain (feature area) with layers inside each domain instead of grouping by technical type.

**Example:**

```typescript
src/app/domains/
  customers/feature/  # Smart components
  customers/data/     # Services, state
  customers/ui/       # Presentation components
  customers/model/    # Types, interfaces
```

---

## 12. Testing

**Impact: HIGH** (Reliability)

### 12.1 Automate Accessibility Testing with axe-core

**Impact: HIGH** (Catches WCAG violations automatically)

Use `vitest-axe` or `jest-axe` to check rendered components for WCAG violations. Run `axe()` on the container element after rendering and assert no violations.

**Incorrect:**

```typescript
it('should be accessible', () => {
  // Manual visual check only — misses hidden violations
});
```

**Correct:**

```typescript
it('should have no a11y violations', async () => {
  const { container } = await render(MyComponent);
  expect(await axe(container)).toHaveNoViolations();
});
```

### 12.2 Component Testing with Angular Testing Library

**Impact: HIGH** (user-centric, reliable component tests)

Use Angular Testing Library for user-centric tests. Prefer accessible queries: `getByRole`, `getByLabelText`, `getByText`. Use `getByTestId` as last resort.

**Example:**

```typescript
it('should increment count', async () => {
  await render(CounterComponent);
  await userEvent.setup().click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 12.3 Mocking with ng-mocks and MSW

**Impact: MEDIUM** (Isolated, reliable tests)

Use ng-mocks for component/service mocking. Use `HttpTestingController` for HTTP mocking in unit tests. Use MSW for integration tests.

**Example:**

```typescript
TestBed.configureTestingModule({
  imports: [ParentComponent, MockComponent(ChildComponent)],
  providers: [MockProvider(UserService, { getUsers: () => of([mockUser]) })],
});
```

### 12.4 Test Signals and Computed Values

**Impact: HIGH** (Verifies reactive state logic)

Test signals by setting values and asserting computed results. Use `TestBed.flushEffects()` to trigger pending effects. Wrap signal reads in `TestBed.runInInjectionContext` when needed.

**Incorrect:**

```typescript
// Testing implementation details instead of behavior
expect(component['_count']).toBe(1);
```

**Correct:**

```typescript
component.count.set(5);
expect(component.doubled()).toBe(10);
TestBed.flushEffects(); // Flush pending effects if needed
```

### 12.5 Unit Testing with Vitest

**Impact: HIGH** (Fast, reliable tests for services and logic)

Use Vitest for unit testing services, pipes, guards, and signals. For signals, set values directly and assert computed results. For pipes, instantiate and call `transform()`.

**Example:**

```typescript
it('should fetch users', async () => {
  TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
  const service = TestBed.inject(UserService);
  expect(await firstValueFrom(service.getUsers())).toBeDefined();
});
```

### 12.6 Use CDK Component Test Harnesses

**Impact: HIGH** (Stable tests decoupled from DOM structure)

Use CDK test harnesses (`HarnessLoader`) to interact with Angular Material and custom components in tests. Harnesses abstract DOM details, making tests resilient to template changes.

**Incorrect:**

```typescript
const button = fixture.debugElement.query(By.css('.mat-mdc-button'));
button.nativeElement.click(); // Breaks if class name changes
```

**Correct:**

```typescript
const loader = TestbedHarnessEnvironment.loader(fixture);
const button = await loader.getHarness(MatButtonHarness.with({ text: 'Save' }));
await button.click();
```

### 12.7 Use Object Mothers for Test Data

**Impact: MEDIUM** (Consistent, maintainable test fixtures)

Create factory functions (Object Mothers) that return valid default objects with optional overrides. Centralizes test data and ensures consistency across test suites.

**Incorrect:**

```typescript
const user = { id: '1', name: 'John', email: 'j@e.com', role: 'admin', createdAt: new Date() };
// Duplicated in every test file
```

**Correct:**

```typescript
export const createUser = (overrides: Partial<User> = {}): User => ({
  id: crypto.randomUUID(), name: 'John', email: 'john@example.com', ...overrides,
});
```

---

## 13. Infrastructure

**Impact: MEDIUM** (Cross-cutting concerns)

### 13.1 Enable Scroll Position Restoration

**Impact: MEDIUM** (Better navigation UX)

Use `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })` to automatically restore scroll positions when navigating back.

**Incorrect:**

```typescript
// Manually scrolling to top on every navigation — loses back-button position
router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => window.scrollTo(0, 0));
```

**Correct:**

```typescript
provideRouter(routes,
  withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
)
```

### 13.2 Error Handling Patterns

**Impact: MEDIUM** (Resilience and user feedback)

Use global `ErrorHandler` for unhandled exceptions. Centralize HTTP errors (401, 403, 500) in an interceptor. Use `retry({ count: 3, delay: 1000 })` for idempotent requests.

**Example:**

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(catchError(err => {
    if (err.status === 401) inject(Router).navigate(['/login']);
    return throwError(() => err);
  }));
```

### 13.3 Schema-Validate LocalStorage Data

**Impact: MEDIUM** (Prevents runtime errors from corrupted storage)

Use typed schemas (Zod) with versioning for localStorage to catch corrupted data and enable migrations.

**Example:**

```typescript
const result = StorageSchema.safeParse(JSON.parse(localStorage.getItem('user') ?? 'null'));
const user = result.success ? result.data.user : migrateOrDefault(result); // fallback on failure
```

### 13.4 Security Patterns

**Impact: HIGH** (Prevents vulnerabilities)

Never store tokens in `localStorage` (XSS-vulnerable). Use in-memory signals for access tokens and `HttpOnly` cookies for refresh tokens. Trust Angular's sanitization; avoid bypassing `DomSanitizer`. Enable CSRF with `withXsrfConfiguration()`.

**Incorrect:**

```typescript
localStorage.setItem('accessToken', token); // Vulnerable to XSS
```

**Correct:**

```typescript
private accessToken = signal<string | null>(null); // In-memory only
provideHttpClient(withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }));
```

### 13.5 Use CanDeactivate Guard for Unsaved Changes

**Impact: MEDIUM** (Prevents accidental data loss)

Implement `CanDeactivateFn` to warn users before navigating away from forms with unsaved data.

**Incorrect:**

```typescript
// No guard — user navigates away and loses unsaved changes
{ path: 'edit/:id', component: EditComponent }
```

**Correct:**

```typescript
export const unsavedChangesGuard: CanDeactivateFn<{ hasUnsavedChanges(): boolean }> =
  (component) => component.hasUnsavedChanges() ? confirm('Discard changes?') : true;
// Usage: { path: 'edit/:id', canDeactivate: [unsavedChangesGuard] }
```

### 13.6 Use Custom Preloading Strategy

**Impact: MEDIUM** (Selective route preloading)

Implement a selective preloading strategy instead of `PreloadAllModules` to control which lazy routes are preloaded based on route data flags.

**Incorrect:**

```typescript
// Preloads every lazy route — wastes bandwidth on rarely visited routes
provideRouter(routes, withPreloading(PreloadAllModules))
```

**Correct:**

```typescript
export class SelectivePreload extends PreloadingStrategy {
  preload = (route: Route, load: () => Observable<any>) =>
    route.data?.['preload'] ? load() : of(null);
}
// Route: { path: 'dashboard', loadComponent: ..., data: { preload: true } }
```

### 13.7 Use Event Delegation for Lists

**Impact: MEDIUM** (Reduces memory from O(n) to O(1) listeners)

Attach one event listener to a parent instead of listeners on each child. Use `data-*` attributes and `event.target` to identify clicked item.

**Example:**

```html
<div (click)="handleClick($event)">
  @for (item of items(); track item.id) {
    <button [attr.data-id]="item.id">{{ item.name }}</button>
  }
</div>
<!-- One listener handles all clicks via event.target -->
```

### 13.8 Use Factory Providers for Complex Setup

**Impact: MEDIUM** (Conditional service creation)

Use `useFactory` with `inject()` for conditional service creation based on environment or runtime dependencies.

**Incorrect:**

```typescript
// Conditional logic in service constructor couples to environment
@Injectable({ providedIn: 'root' })
export class LogService {
  constructor() { if (environment.production) { /* ... */ } }
}
```

**Correct:**

```typescript
{ provide: LogService, useFactory: () => {
    const env = inject(ENVIRONMENT);
    return env.production ? new ProdLogService() : new DevLogService();
  },
}
```

### 13.9 Use Functional Route Guards

**Impact: HIGH** (Protects routes, cleaner than class guards)

Use functional `CanActivateFn` guards with `inject()` instead of class-based guards. Return `true`, `false`, or `UrlTree` for redirects.

**Example:**

```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() || router.createUrlTree(['/login']);
};
// Usage: { path: 'dashboard', canActivate: [authGuard] }
```

### 13.10 Use Functional Route Resolvers

**Impact: MEDIUM** (Preloads data before navigation)

Use functional `ResolveFn<T>` resolvers to preload data before component renders, avoiding empty state flicker.

**Example:**

```typescript
export const userResolver: ResolveFn<User | null> = (route) =>
  inject(UserService).getById(route.paramMap.get('id')!).pipe(catchError(() => of(null)));
```

### 13.11 Use InjectionToken with Factory for Config

**Impact: MEDIUM** (Type-safe, tree-shakeable config)

Create self-providing `InjectionToken` instances with `factory` for browser globals and app configuration instead of string tokens or direct global access.

**Incorrect:**

```typescript
// String tokens lose type safety and aren't tree-shakeable
constructor(@Inject('API_URL') private apiUrl: string) {}
const el = window.document.getElementById('app');
```

**Correct:**

```typescript
export const API_URL = new InjectionToken<string>('API_URL', {
  factory: () => environment.apiUrl,
});
// Usage: private apiUrl = inject(API_URL);
```

### 13.12 Use provideAppInitializer for Startup Logic

**Impact: MEDIUM** (Blocks bootstrap until ready)

Use `provideAppInitializer()` (Angular 19+) or `{ provide: APP_INITIALIZER, useFactory: ..., multi: true }` (Angular 17-18) to run async setup code before the app renders.

**Incorrect:**

```typescript
// Startup logic in root component — app renders before init completes
export class AppComponent {
  constructor(private config: ConfigService) { config.load(); }
}
```

**Correct:**

```typescript
// App providers — blocks rendering until init resolves
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => inject(ConfigService).load()),
  ],
};
```

### 13.13 Use Route Input Binding

**Impact: MEDIUM** (Cleaner component code, no ActivatedRoute)

Enable `withComponentInputBinding()` in router config to bind route params, query params, and resolver data directly to component inputs. Use `id = input.required<string>()` for `:id` params instead of injecting `ActivatedRoute`.

---

## 14. UI & Accessibility

**Impact: MEDIUM** (User experience)

### 14.1 Ensure Keyboard Navigation

**Impact: MEDIUM** (Keyboard-only user access)

All interactive elements must be keyboard-accessible. Use native `<button>` and `<a>` elements. For custom widgets, add `tabindex="0"` and handle `keydown.enter`/`keydown.space` events.

**Incorrect:**

```html
<div class="tab" (click)="selectTab(i)">{{ tab.label }}</div>
```

**Correct:**

```html
<button role="tab" [attr.aria-selected]="isActive(i)" (click)="selectTab(i)">
  {{ tab.label }}
</button>
```

### 14.2 Loading State Patterns

**Impact: MEDIUM** (Perceived performance and UX)

Use skeleton loaders matching content shape to prevent CLS. Disable buttons during async actions. Always show helpful `@empty` UI for zero-data states.

**Example:**

```html
@if (loading()) {
  <app-card-skeleton />
} @else {
  <app-card [data]="data()" />
}

@for (user of users(); track user.id) { ... } @empty {
  <app-empty-state title="No users found" />
}
```

### 14.3 Manage Focus with CDK FocusTrap

**Impact: MEDIUM** (Accessible modals and overlays)

Use `cdkTrapFocus` for dialogs and overlays to prevent focus from escaping. Restore focus to the trigger element on close. Use `cdkFocusInitial` to set the initially focused element.

**Incorrect:**

```html
<div class="modal">
  <input placeholder="Name" />
  <button (click)="close()">Close</button>
</div>
```

**Correct:**

```html
<div class="modal" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
  <input cdkFocusInitial placeholder="Name" />
  <button (click)="close()">Close</button>
</div>
```

### 14.4 Respect prefers-reduced-motion

**Impact: MEDIUM** (Prevents motion sickness triggers)

Disable or simplify animations for users who prefer reduced motion. Use the `prefers-reduced-motion` media query. In Angular animations, check the preference before applying transitions.

**Incorrect:**

```css
.card { transition: transform 0.5s ease; }
```

**Correct:**

```css
.card { transition: transform 0.5s ease; }
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}
```

### 14.5 Theming Patterns

**Impact: MEDIUM** (Consistent design and dark mode)

Define theme values as CSS custom properties (`--border-color`). Support dark mode via `prefers-color-scheme` and `data-theme` attributes. Use CDK `BreakpointObserver` for responsive logic.

**Example:**

```css
:root { --border-color: #e5e7eb; }
@media (prefers-color-scheme: dark) { :root { --bg-color: #1f2937; } }
```

**Example:**

```typescript
isMobile = toSignal(this.breakpointObserver.observe('(max-width: 768px)').pipe(map(r => r.matches)));
```

### 14.6 Use ARIA Roles and Live Regions

**Impact: MEDIUM** (Screen reader compatibility)

Use semantic HTML elements first (`<nav>`, `<main>`, `<button>`). Add ARIA roles only when native semantics are insufficient. Use `LiveAnnouncer` to announce dynamic content changes to screen readers.

**Incorrect:**

```html
<div class="nav-menu">
  <div (click)="navigate()">Home</div>
</div>
```

**Correct:**

```typescript
// Use semantic HTML for navigation
// template: <nav aria-label="Main"><a routerLink="/">Home</a></nav>
// Announce dynamic changes for screen readers
this.liveAnnouncer.announce('Item saved successfully');
```

---

## 15. Data Handling

**Impact: MEDIUM** (API integration)

### 15.1 Compose Mappers for Nested Data

**Impact: MEDIUM** (Reusable, maintains single responsibility)

Compose smaller mappers for nested structures. Each mapper handles one entity type, enabling reuse and single responsibility.

**Example:**

```typescript
const mapOrderItem = (dto: OrderItemDto): OrderItem => ({
  productName: dto.product_name,
  subtotal: dto.quantity * dto.unit_price,
});

const mapOrder = (dto: OrderDto): Order => ({
  customer: mapCustomer(dto.customer),
  items: dto.items.map(mapOrderItem),
});
```

### 15.2 Use Functional HTTP Interceptors

**Impact: HIGH** (Simpler, composable request handling)

Write interceptors as `HttpInterceptorFn` functions and register with `withInterceptors()` instead of class-based `HTTP_INTERCEPTORS`.

**Incorrect:**

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) { /* ... */ }
}
// { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
```

**Correct:**

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
// provideHttpClient(withInterceptors([authInterceptor]))
```

### 15.3 Use Pure Mapper Functions for DTOs

**Impact: MEDIUM** (Decouples frontend from API, type-safe transforms)

Create pure functions in a `mappers/` folder to map between API DTOs and domain models. Keeps components decoupled from API structure.

**Example:**

```typescript
export function mapUserDto(dto: UserDto): User {
  return {
    fullName: `${dto.first_name} ${dto.last_name}`,
    email: dto.email_address,
    createdAt: new Date(dto.created_at),
  };
}
```

---
