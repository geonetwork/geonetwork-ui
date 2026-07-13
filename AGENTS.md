# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, and any tool that reads `AGENTS.md`) when working with code in this repository.

## Overview

GeoNetwork-UI is an Nx monorepo of Angular applications and Web Components that provide a modern UI on top of a GeoNetwork 4 catalog backend. It is built on Angular 20, NgRx, RxJS, Tailwind, and OpenLayers.

Node version is pinned in `.nvmrc` (currently 20.19.0); `engines` requires Node >= 20.

## Commands

Nx is the task runner. Most commands target **affected** projects (compared against `remotes/origin/main` — see `defaultBase` in `nx.json`). Use `run-many --all` to act on everything.

```shell
npm install                          # fetch dependencies

npm start                            # serve the datahub app (http://localhost:4200)
npx nx serve <app>                   # serve a specific app: datahub | search | metadata-editor | map-viewer | metadata-converter
npx nx build <app>                   # build one app (always a production build) -> dist/

npm run lint                         # lint affected   | npm run lint:all
npm run test                         # test affected (Jest) | npm run test:all
npx nx test <project>                # test a single lib/app, e.g. npx nx test feature-search
npx nx test <project> --test-file=path/to/file.spec.ts   # single spec file
npx nx test <project> -t "describe or it name"           # single test by name

npx nx e2e <app> --watch             # Cypress e2e with UI (requires support-services running)
npx nx e2e <app>                     # Cypress e2e headless

npm run format:write                 # Prettier — RUN BEFORE COMMITTING (format:check to verify)
npm run storybook                    # Storybook for the `demo` project
npm run docs:dev                     # VitePress docs dev server
```

Other useful targets: `npm run generate-api -- gn4` (regenerate the GN4 OpenAPI client after editing `libs/data-access/gn4/src/spec.yaml`), `npm run i18n:extract` (extract translatable strings into `translations/*.json`), `npm run build:webcomponents`.

> `nx.json` sets `parallel: 1`, so Nx runs one target at a time.

### Local backend

`npm start` proxies `/geonetwork` to the target in `proxy-config.js` (defaults to a public catalog). For a local GeoNetwork, either run `docker compose up -d` from `support-services/`, or edit `proxy-config.js` to point at your instance. A parameter-based `/dev-proxy` is also available to bypass CORS.

## Architecture

### Apps (`apps/`)

- **datahub** — main public search/exploration UI (the default `npm start` app)
- **search** — minimal search application (deprecated; use `datahub` instead)
- **metadata-editor** — record editing UI
- **map-viewer** — interactive map viewer
- **metadata-converter** — convert metadata between interoperable formats
- **webcomponents** — Angular app that registers components as `gn-*` custom elements for embedding in third-party sites
- **demo** — Storybook host
- `*-e2e` — Cypress projects

### Library layering (`libs/`) — enforced by ESLint

Libraries are tagged by `type:` and dependencies are constrained by `@nx/enforce-module-boundaries` in `.eslintrc.json`. **Violating these constraints fails lint**, so respect the layering when adding imports:

- **`api/`** (`type:api`) — framework-agnostic, usable front+back. `api-repository` defines the `RecordsRepository` abstraction (interface in `common/domain`); `api-metadata-converter` handles format conversion. May only depend on `api` + shared libs. **Must not import `*app-config`.**
- **`common/`** — `common-domain` holds domain models/interfaces (records, search, dataviz…) used across the whole project; `common-fixtures` holds test fixtures.
- **`data-access/`** (`type:data-access`) — backend clients (`data-access-gn4` is an **auto-generated** OpenAPI client — do not hand-edit; regenerate from `spec.yaml`). May only depend on other `data-access` libs.
- **`ui/`** (`type:ui`) — presentation components (`ui-inputs`, `ui-elements`, `ui-layout`, `ui-map`, `ui-widgets`, …). Mostly HTML/CSS, **very little logic**. May only depend on `ui` + shared libs (`scope:shared`, `scope:i18n`).
- **`feature/`** (`type:feature`) — "smart components" + NgRx state + business logic (`feature-search`, `feature-record`, `feature-editor`, `feature-map`, `feature-dataviz`, `feature-catalog`, …). May depend on any layer **except** `util/app-config`.
- **`util/`** (`type:util`) — `util-shared`, `util-i18n`, `util-data-fetcher`, `util-app-config`. May only depend on other `util` libs.

Two cross-cutting rules: **no library may depend on `util/app-config`** (only apps decide whether to load an app config), and only `feature` and apps may compose across all layers.

Import libraries via path aliases defined in `tsconfig.base.json`, e.g. `@geonetwork-ui/feature/search`, `@geonetwork-ui/ui/elements`, `@geonetwork-ui/util/shared`, `@geonetwork-ui/common/domain/*`.

### Smart vs presentation ("dumb") components

The split between `feature/` and `ui/` is the central design rule of the codebase:

- **Smart components live in `feature/`.** They own all the logic: business rules, API/repository calls, and NgRx store access (via a Facade). They hold almost no HTML/CSS of their own — instead they orchestrate presentation components, feeding them data and reacting to their events. By convention they are named `*.container.component.ts`.
- **Presentation ("dumb") components live in `ui/`.** They are stateless: no Facade, no Store, no `HttpClient`, no services with side effects. They receive everything through `@Input()` and communicate back through `@Output()`. They contain the HTML/CSS and are reusable and Storybook-able in isolation.

A typical feature therefore spans both layers: the heavy lifting goes into one or more smart components in `feature/`, and the visible parts are built from (often several) dumb components in `ui/`.

Concrete example — the search results list:

- `feature-search` → `results-list.container.component.ts` (smart): `inject(SearchFacade)`, subscribes to `facade.results$`, resolves config tokens, then renders dumb components.
- `ui/search`, `ui/elements`, `ui/widgets`, … (dumb): `ResultsListItemComponent` just takes `@Input() record: CatalogRecord` and emits `@Output() mdSelect` — no store, no data fetching.

When building a feature, ask: "is this logic/state, or is this rendering?" Logic → a smart component in `feature/`; rendering → a dumb component in `ui/` driven purely by inputs/outputs. The ESLint boundaries above enforce that `ui/` can never reach into `feature/`, data-access, or app config, which keeps presentation components pure.

### State management (NgRx)

State is a flat tree of feature branches (`search`, `map`, `router`, …). Conventions (see `docs/developers/state-management.md`):

- A feature's state lives in a `state/` folder: `*.actions.ts`, `*.effects.ts`, `*.facade.ts`, `*.reducer.ts`, `*.selectors.ts` (state types + `initialState` live in the reducer).
- **Never inject the NgRx `Store` directly** outside the state folder — access state through the feature **Facade**.
- Keep state flat and avoid storing computed/duplicated values (compute them in selectors).
- **Search state is not a singleton.** Multiple independent searches can coexist; each is created via a container directive (`gnUiSearchStateContainer="<id>"` or the router-backed variant). Components inject `SearchService`/`SearchFacade` only from **inside** the container directive's DOM subtree. The router container persists filters in the URL (only one allowed per app).

## Conventions

- **Reuse before writing**: before adding a pure helper or transform (geometry & bbox, dates, string/URL/format conversions, …), search the repo (`grep`/Explore) for an existing one — they often already live in `util/shared` or a sibling lib. Prefer reusing or extending it over adding a parallel implementation. Treat "least intrusive" as the least *duplication*, not the smallest diff; when those two pull apart, surface the trade-off instead of silently duplicating.
- **Place new helpers in their canonical home — don't spawn new util files**: when you genuinely need a new pure helper, add it to the *existing* module that owns its domain (dates, strings/URLs, links, geometry, …), choosing the location by *what the helper operates on*, not by where it is first called. Cross-cutting helpers belong in `util/shared` (or the matching sibling lib), never tucked inside a `ui/*` or `feature/*` lib where nobody will find them again. Creating a new `*.utils.ts` next to the consumer is a smell — extend an existing util module instead; if truly nothing fits, surface that gap rather than scattering one more parallel helper. Adding to an already-crowded area (e.g. several `*-utils` / `*.utils.ts` files for the same concern) is itself the signal to consolidate, not to add another file.
- **Standalone components**: new components must be standalone; migrate legacy ones when reasonably possible. All `ui/*` components should have a Storybook entry.
- **Dates**: always format via `DateService` from `@geonetwork-ui/util/shared` (or the `gnUiHumanizeDate` directive) — never use raw `Date`/third-party formatting.
- **Click propagation**: use `propagateToDocumentOnly` from `@geonetwork-ui/util/shared` instead of `event.stopPropagation()` so outside-click handlers (dropdowns, etc.) still fire.
- **i18n**: wrap UI strings with the `translate` pipe/directive; mark dynamic keys with `marker()` from `@biesbjerg/ngx-translate-extract-marker`. Translations live in `translations/*.json` (extracted via `npm run i18n:extract`).
- **Don't comment out code** — delete it (version control keeps history).

### Testing

- Unit tests are **shallow** (Jest + `ng-mocks`, the latter being progressively adopted). Prefer `useClass` over `useValue` for mock providers to avoid shared state between tests.
- **Fixtures**: export a `createXFixture(overrides = {})` factory plus preconfigured variants (`bannedUserFixture()`, …) that call it — return a fresh instance per test, never a shared object.
- Target DOM nodes via `data-test` (unit) and `data-cy` (e2e) attributes, not CSS classes.
- Mock translations in tests with `TranslateTestingModule` from `ngx-translate-testing`.
- E2e: do as much as possible per `it()` block; intercept external calls with small fixtures; clean up DB mutations in `before()`; interact with GeoNetwork via REST API, not its legacy UI. E2e runs with English locale.
