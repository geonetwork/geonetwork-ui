---
outline: deep
---

# Coding guidelines

## Dates

All date formatting in the application should use the `DateService` provided by `@geonetwork-ui/util/shared`. This ensures consistent date formatting across the application and simplifies localization.

### Using DateService

First, inject the DateService in your component or service:

```ts
import { DateService } from '@geonetwork-ui/util/shared'

constructor(private dateService: DateService) {}
```

### Formatting dates

Use the `formatDate` method for date-only formatting:

```ts
// Formats to localized date (e.g., "01/15/2023")
const formattedDate = this.dateService.formatDate(myDate)
```

Use the `formatDateTime` method when you need to include the time component:

```ts
// Formats to localized date and time (e.g., "01/15/2023 14:30:45")
const formattedDateTime = this.dateService.formatDateTime(myDate)
```

### Best practices

- Never use direct JavaScript Date formatting methods or third-party libraries for date formatting
- Always use the DateService methods for consistency
- Consider time zones when working with dates, especially in global applications
- For date manipulation (not formatting), consider using the utility methods provided by the DateService

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
