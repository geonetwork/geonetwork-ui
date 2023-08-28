---
outline: deep
---

# State management

`geonetwork-ui` relies on a **state** to maintain a single source of truth among the different libraries and applications of the workspace.

It's based on [NgRx](https://ngrx.io/), which takes advantage of [RxJs](https://rxjs.dev/) to handle state reactivity.

## Overview

The state is a **tree**, it's a combination of several feature branches.

```txt
- search
- map
- mdview
- router
```

A **feature state** stores different properties related to the feature.

Each feature state has a **key** (the name of the branch in the tree), and a **type**, containing different properties of the feature state.

Eg. `SearchState`:

```txt
+ map
+ search
  - configuration
  - parameters
    - aggregations
    - filters
    - pagination
  - results
  - error
```

## NgRx architecture

The state is a tree with one level of branches. For an application to run with a state, it must have a root state declaration.
Then, each feature state which is declared in any module loaded by the application plugs its branch to the root state.

### Root state

The root state is declared at the application root module level:

```typescript
@NgModule({
  imports: [
    StoreModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
  ]
})
```

`StoreDevtoolsModule.instrument()` enables the [Redux dev tools](https://github.com/reduxjs/redux-devtools) on development mode.

### Feature state

The feature branches can be declared in any module, application or library ones.

```typescript
@NgModule({
  imports: [
    StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer, {
      initialState,
    }),
    EffectsModule.forFeature([SearchEffects])
  ]
})
```

`SEARCH_FEATURE_KEY` contains the name of this feature branch: `search`.

> Notes:
>
> - There can be only one root state for the whole application.
> - There must be a root state if some modules declare a feature state.

## NgRx fundamentals

For more information, please refer to the [official documentation](https://ngrx.io/guide/store).

### Trigger a state change

You can update the state only through **Actions**, which are a combination of

- a `type`, it's a string with the following pattern `"[state_name] action_description"` (e.g. `[Search] Set filters'`)
- a `payload`, could be any input to change the state (eg: filters)

### Listen to state changes

You can listen to state changes through **Selectors**, which are RxJs `Observables`.
You can create your own selectors to listen to specific changes within the state.

### Side effects

To handle state change side effects, for instance for asynchronous actions, you can use **Effects**.

An effect is a subscription to an Observable (mostly to other actions) which often dispatches other actions. (e.g. `Load` action can dispatch `LoadSuccess` or `LoadFailure` action through effects).

### Facades

A Facade is an Angular service which exposes the state interactions (read/write) to the rest of the application.

> The NgRx `Store` object should not be injected in the rest of the application, the application should only access to the state through the facade.

## Guidelines

### Files

For an application or a feature, the state should be encapsulated in a `state` folder which will contain all the files needed to bootstrap a state branch:

```
+ state
  - search.action.ts
  - search.effects.ts
  - search.facade.ts
  - search.reducer.ts
  - search.selector.ts
```

The state types are defined in the reducer file, along with the initial state object.

### Structure

- The state should be as **flat** as possible. In order to keep reducers simple, you must avoid having nesting within the state structure.

  > Instead of having a tree for a nested structure of nodes, just store your nodes in a flat array, and refer them to other node ids.

- Don't store computed value, avoid duplicate. Those values can be computed on the fly from a `selector`

### Reducers

- Reducers must be pure functions.
- Reducers must return a new state object (the state is immutable)

## Search state

The search state is a core component of `geonetwork-ui`, as it handles the interaction with GeoNetwork Search API (which forwards the request to Elasticsearch).
Many components/applications of `geonetwork-ui` rely on the search state, which is declared in the `FeatureSearchModule` module.

The search state is responsible for storing:

- any search parameters
  - aggregations
  - filters
  - pagination
- search results
- search configuration

The actions & effects are responsible for triggering a search request to the backend.

### Multiple search states

As you could have several searches within the application, search state is not a singleton, there is no unique service to handle the search state.

You have to initiate one state per search you want to have (e.g. feeds, search, etc...)

### Search containers

A container is defined by a directive which encapsulate all DOM structure underneath the directive to a specific state behavior.
The container uses an abstraction called `SearchService` which infers search execution.

The `SearchService` is an **abstraction** over the `SearchFacade`.

- `SearchStateContainerDirective` is the classic search container. All search changes will directly call the `SearchFacade` to set the correct filters & parameters within the search state, to trigger a search request.
- `SearchRouterContainerDirective` adds an indirection via the router state. All search changes, like filter changes, are mapped to the router state, then the router state is synchronized with the search state.
  > You can have only one router container in the application.

**Important**:
You can only inject the `SearchService` and/or the `SearchFacade` from a child component of the component which declares the container directive in its template.

### Create a search state

To create a search state, the best way is to use a search container directive. You can either use `SearchStateContainerDirective` or `SearchRouterContainerDirective`.

```html
<div class="relative" gnUiSearchStateContainer="newsfeed">...</div>
```

`SearchStateContainerDirective` is used for a classic search state.
Adding such a directive in your code automatically

- initializes a search state with the id `newsfeed`.
- instantiates a new `SearchFacade` object for the `newsfeed` state.
- injects the dedicated `SearchService`, corresponding to the container type.
- encapsulates all DOM tree underneath the directive scope. It means that every component within the container DOM, which inject the `SearchService` will get the implementation provided by the container directive.

### Examples

- Search init

```typescript
this.searchFacade
  .setConfigRequestFields({
    includes: [...ES_SOURCE_BRIEF, 'createDate', 'changeDate'],
  })
  .setPagination(0, 10)
  .setSortBy('-createDate')
  .setResultsLayout('FEED')
```

- Subscribing to search results

```typescript
this.searchFacade.results$.subscribe((results) => {
  // do my stuff
})
```

## Router state

Angular routing can be associated to a state manager. It's the way used to persist search filters in the URL to provide a permalink for search results.

Please refer to the [Routing](./routing.md) section to know more about the search router abilities.
