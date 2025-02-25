---
outline: deep
---

# Coding guidelines

## Dates

// TODO

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
