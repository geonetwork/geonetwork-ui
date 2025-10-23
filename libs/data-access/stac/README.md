# STAC (SpatioTemporal Asset Catalog) Library

This library provides an Angular service for querying STAC API endpoints, with support for spatial and temporal filtering, pagination, and debounced requests.

## Features

- Query STAC Items collections with optional filters
- Spatial filtering using bounding box (bbox)
- Temporal filtering using RFC 3339 datetime or intervals
- Built-in pagination support (next/previous pages)
- Debounced queries for search inputs (500ms default)
- Configurable result limit (default: 12 items)
- Comprehensive error handling

## Installation

This library is part of the geonetwork-ui monorepo. Import it in your Angular module:

```typescript
import { StacService } from '@geonetwork-ui/data-access/stac'
```

## Usage

### Basic Query

Query a STAC collection without filters (returns first 12 items by default):

```typescript
import { Component, OnInit } from '@angular/core'
import { StacService, StacQueryResponse } from '@geonetwork-ui/data-access/stac'

@Component({
  selector: 'app-stac-viewer',
  template: `...`,
})
export class StacViewerComponent implements OnInit {
  constructor(private stacService: StacService) {}

  ngOnInit() {
    const collectionUrl = 'https://api.stac.teledetection.fr/collections/lidarhd/items'

    this.stacService.queryItems(collectionUrl).subscribe({
      next: (response: StacQueryResponse) => {
        console.log(`Found ${response.items.length} items`)
        console.log('Items:', response.items)
        console.log('Total matched:', response.totalMatched)
      },
      error: (error) => console.error('Error:', error),
    })
  }
}
```

### Spatial Filtering (Bounding Box)

Filter items by geographic extent using a bounding box `[minLon, minLat, maxLon, maxLat]`:

```typescript
this.stacService
  .queryItems('https://api.stac.teledetection.fr/collections/lidarhd/items', {
    bbox: [-10, 40, 10, 50], // France bounding box (approximately)
  })
  .subscribe((response) => {
    console.log('Items in bounding box:', response.items)
  })
```

### Temporal Filtering (Datetime)

Filter items by acquisition date using RFC 3339 datetime format:

**Single datetime:**

```typescript
this.stacService
  .queryItems(collectionUrl, {
    datetime: '2024-01-15T00:00:00Z',
  })
  .subscribe((response) => {
    console.log('Items from specific date:', response.items)
  })
```

**Date interval:**

```typescript
this.stacService
  .queryItems(collectionUrl, {
    datetime: '2024-01-01T00:00:00Z/2024-12-31T23:59:59Z',
  })
  .subscribe((response) => {
    console.log('Items from 2024:', response.items)
  })
```

**Open-ended intervals:**

```typescript
// All items after a date
this.stacService.queryItems(collectionUrl, {
  datetime: '2024-01-01T00:00:00Z/..',
})

// All items before a date
this.stacService.queryItems(collectionUrl, {
  datetime: '../2024-12-31T23:59:59Z',
})
```

### Combined Filters

Combine spatial and temporal filters:

```typescript
this.stacService
  .queryItems('https://api.stac.teledetection.fr/collections/lidarhd/items', {
    bbox: [-10, 40, 10, 50],
    datetime: '2024-01-01T00:00:00Z/2024-12-31T23:59:59Z',
    limit: 20,
  })
  .subscribe((response) => {
    console.log('Filtered items:', response.items)
    console.log('Total matched:', response.totalMatched)
  })
```

### Pagination

Handle pagination using `queryItems()` with the URLs from `response.links.next` and `response.links.prev`:

```typescript
export class PaginatedStacViewerComponent {
  items: StacItem[] = []
  nextPageUrl: string | undefined
  prevPageUrl: string | undefined

  constructor(private stacService: StacService) {}

  loadFirstPage() {
    this.stacService.queryItems(collectionUrl, { limit: 12 }).subscribe((response) => {
      this.items = response.items
      this.nextPageUrl = response.links.next
      this.prevPageUrl = response.links.prev
    })
  }

  loadNextPage() {
    if (!this.nextPageUrl) return

    // Simply pass the next page URL to queryItems
    this.stacService.queryItems(this.nextPageUrl).subscribe((response) => {
      this.items = response.items
      this.nextPageUrl = response.links.next
      this.prevPageUrl = response.links.prev
    })
  }

  loadPreviousPage() {
    if (!this.prevPageUrl) return

    // Simply pass the previous page URL to queryItems
    this.stacService.queryItems(this.prevPageUrl).subscribe((response) => {
      this.items = response.items
      this.nextPageUrl = response.links.next
      this.prevPageUrl = response.links.prev
    })
  }
}
```

### Debounced Queries (for Search Inputs)

Use `queryItemsDebounced()` for search inputs to avoid excessive API calls (500ms debounce):

```typescript
import { Subject } from 'rxjs'
import { switchMap } from 'rxjs/operators'

export class StacSearchComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>()
  items: StacItem[] = []

  constructor(private stacService: StacService) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        switchMap((searchTerm) => {
          // In a real scenario, you might use searchTerm to modify bbox or datetime
          return this.stacService.queryItemsDebounced(collectionUrl, {
            datetime: `${searchTerm}/..`,
          })
        })
      )
      .subscribe((response) => {
        this.items = response.items
      })
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm)
  }

  ngOnDestroy() {
    this.searchSubject.complete()
  }
}
```

## API Reference

### Methods

#### `queryItems(collectionUrl: string, params?: StacQueryParams): Observable<StacQueryResponse>`

Query a STAC Items collection with optional filters. Can also be used for pagination by passing the URL from `response.links.next` or `response.links.prev`.

**Parameters:**

- `collectionUrl`: URL to the STAC Items collection endpoint (or pagination URL from response.links)
- `params`: Optional query parameters (omit when using pagination URLs)
  - `bbox`: Bounding box `[minLon, minLat, maxLon, maxLat]`
  - `datetime`: RFC 3339 datetime or interval
  - `limit`: Maximum number of items (default: 12)

**Returns:** Observable of `StacQueryResponse`

**Examples:**

```typescript
// Initial query
stacService.queryItems(url, { bbox: [1, 2, 3, 4], limit: 12 })

// Pagination (no params needed, URL already contains query string)
stacService.queryItems(response.links.next)
```

---

#### `queryItemsDebounced(collectionUrl: string, params?: StacQueryParams): Observable<StacQueryResponse>`

Same as `queryItems()` but with 500ms debouncing. Useful for search inputs.

### Types

#### `StacQueryParams`

```typescript
interface StacQueryParams {
  bbox?: [number, number, number, number]
  datetime?: string
  limit?: number
}
```

#### `StacQueryResponse`

```typescript
interface StacQueryResponse {
  items: StacItem[]
  links: {
    next?: string
    prev?: string
    self?: string
  }
  totalMatched?: number
  totalReturned: number
}
```

#### `StacItem`

A GeoJSON Feature with STAC-specific properties:

```typescript
interface StacItem {
  type: 'Feature'
  stac_version: string
  id: string
  geometry: GeoJSON.Geometry | null
  bbox?: number[]
  properties: {
    datetime: string | null
    [key: string]: unknown
  }
  links: StacLink[]
  assets: Record<string, StacAsset>
  collection?: string
}
```

## Error Handling

The service provides meaningful error messages for common scenarios:

```typescript
this.stacService.queryItems(collectionUrl, params).subscribe({
  next: (response) => console.log('Success:', response),
  error: (error: Error) => {
    // Possible error messages:
    // - "Bad request: Invalid query parameters" (400)
    // - "Collection not found" (404)
    // - "STAC API server error" (500)
    // - "Network error: ..." (client-side/network errors)
    console.error('Error:', error.message)
  },
})
```

## Testing

Run the unit tests:

```bash
npm test -- stac
```

Run linting:

```bash
npx nx lint stac
```

## Contributing

When making changes to this library:

1. Update the TypeScript interfaces in `models/stac.model.ts`
2. Update the service implementation in `stac.service.ts`
3. Add or update tests in `stac.service.spec.ts`
4. Update this README with any new features or changes
5. Run tests and linting to ensure everything passes

## Resources

- [STAC Specification](https://stacspec.org/)
- [STAC API Specification](https://github.com/radiantearth/stac-api-spec)
- [STAC Item Search](https://github.com/radiantearth/stac-api-spec/tree/master/item-search)
- [RFC 3339 (Datetime format)](https://tools.ietf.org/html/rfc3339)
