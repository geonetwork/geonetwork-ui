# AGENTS.md — `libs/ui` (presentation components)

Scope: this guide applies to everything under `libs/ui/`. See the repository-root `AGENTS.md` for the global architecture and the smart-vs-dumb rule.

`libs/ui/` holds **presentation ("dumb") components only**: stateless, no Facade / Store / `HttpClient` / side-effecting service. They receive everything through `@Input()` and report back through `@Output()`, carry the HTML/CSS, and are reusable + Storybook-able in isolation. All business logic, store access and data fetching belong in `libs/feature/` smart components (see root `AGENTS.md`). ESLint module boundaries forbid `ui/` from importing `feature/`, `data-access`, or `util/app-config`.

Every component is **standalone** and exposed via the `@geonetwork-ui/ui/<lib>` path alias (e.g. `import { ButtonComponent } from '@geonetwork-ui/ui/inputs'`). All selectors are prefixed **`gn-ui-`**.

## Prefer existing `gn-ui-*` components over native/ad-hoc markup

**When a `gn-ui-*` component exists for what you need, use it instead of native HTML or a one-off implementation.** This keeps styling, theming, accessibility and behaviour consistent across all apps. For example, write `<gn-ui-button>` rather than a raw `<button>`.

Common substitutions:

| Instead of… | Use |
|---|---|
| `<button>` | `<gn-ui-button>` |
| `<input type="text">` | `<gn-ui-text-input>` (or `<gn-ui-url-input>`, `<gn-ui-text-area>`) |
| `<input type="checkbox">` | `<gn-ui-checkbox>` / `<gn-ui-check-toggle>` |
| `<select>` | `<gn-ui-dropdown-selector>` / `<gn-ui-dropdown-multiselect>` |
| a date `<input>` | `<gn-ui-date-picker>` / `<gn-ui-date-range-picker>` |
| a file `<input>` | `<gn-ui-file-input>` / `<gn-ui-drag-and-drop-file-input>` |
| a hand-rolled modal | `<gn-ui-modal-dialog>` |
| a custom spinner/loader | `<gn-ui-spinning-loader>` / `<gn-ui-loading-mask>` |
| hand-rolled pagination | `<gn-ui-pagination>` |
| a custom tooltip/popover | `<gn-ui-popover>` |
| rendering markdown by hand | `<gn-ui-markdown-parser>` |
| a "copy to clipboard" button | `<gn-ui-copy-text-button>` |

Before adding a new presentation component, check the lists below (and Storybook via `npm run storybook`) for an existing one. If a close match exists but lacks an input you need, prefer extending it over duplicating it. Only create a new component when nothing fits — and put it in the lib that matches its purpose (see roles below).

**Reuse logic, not only components.** The same instinct applies to behaviour, not just to markup: when the logic you need already lives *inside* a component (a private `bbox`→geometry method, a transform buried in a smart component, …), don't reimplement it elsewhere. Extract it into a shared function/util in a lib both callers can depend on, then have the component and the new caller use it. Finding that a component already does something similar is a cue to **extract and share**, not a reason to write a fresh copy because the whole component can't be dropped in as-is.

## Libraries and their components

> Selectors are listed; the corresponding class is the PascalCase form + `Component` (e.g. `gn-ui-button` → `ButtonComponent`). This list can drift — to regenerate, grep `selector:` in `*.component.ts` files.

### `ui/inputs` — collect user input
Reusable form fields, buttons, toggles and pickers.

- `gn-ui-button` — button (use instead of native `<button>`)
- `gn-ui-text-input` — single-line text input
- `gn-ui-text-area` — multi-line text input
- `gn-ui-url-input` — URL input with validation
- `gn-ui-search-input` — search text input
- `gn-ui-search-feature-catalog` — search input for a feature catalog
- `gn-ui-autocomplete` — autocomplete input
- `gn-ui-checkbox` — checkbox
- `gn-ui-check-toggle` — labelled boolean toggle (checkbox-style)
- `gn-ui-switch-toggle` — segmented control between several options
- `gn-ui-star-toggle` — star (favorite) toggle
- `gn-ui-dropdown-selector` — single-select dropdown (use instead of `<select>`)
- `gn-ui-dropdown-multiselect` — multi-select dropdown
- `gn-ui-inline-filter` — inline multi-choice filter
- `gn-ui-date-picker` — single date picker
- `gn-ui-date-range-picker` — date range picker
- `gn-ui-date-range-dropdown` — date range as a dropdown
- `gn-ui-date-range-inputs` — date range via two inputs
- `gn-ui-file-input` — file input
- `gn-ui-drag-and-drop-file-input` — drag & drop file upload
- `gn-ui-image-input` — image upload/preview input
- `gn-ui-badge` — small inline label/badge
- `gn-ui-copy-text-button` — button that copies text to the clipboard
- `gn-ui-viewport-intersector` — emits when its content enters the viewport (lazy load / infinite scroll)

### `ui/elements` — render specific kinds of information
Cards, badges, contact blocks, downloads, markdown, metadata fragments, etc.

- `gn-ui-api-card` — card describing an API endpoint
- `gn-ui-record-api-form` — form to build/query a record's API URL
- `gn-ui-service-capabilities` — service capabilities display
- `gn-ui-feature-catalog-list` — feature catalog (attributes) list
- `gn-ui-stac-items-result-grid` — grid of STAC items
- `gn-ui-external-link-card` — card for an external link
- `gn-ui-internal-link-card` — card for an internal link
- `gn-ui-download-item` — single download link/item
- `gn-ui-downloads-list` — list of downloads
- `gn-ui-thumbnail` — record/resource thumbnail
- `gn-ui-image-overlay-preview` — image preview overlay (lightbox)
- `gn-ui-avatar` — user/organisation avatar
- `gn-ui-user-preview` — user preview
- `gn-ui-user-feedback-item` — single user feedback entry
- `gn-ui-contact-details` — contact details block
- `gn-ui-contact-pill` — contact shown as a pill
- `gn-ui-metadata-info` — metadata info block
- `gn-ui-metadata-contact` — metadata contact block
- `gn-ui-metadata-catalog` — catalog info for a record
- `gn-ui-metadata-doi` — DOI display for a record
- `gn-ui-metadata-quality` — metadata quality summary
- `gn-ui-metadata-quality-item` — single metadata quality indicator
- `gn-ui-kind-badge` — badge for record kind (dataset/service/…)
- `gn-ui-geo-data-badge` — badge marking geographic data
- `gn-ui-markdown-parser` — renders markdown to HTML
- `gn-ui-markdown-editor` — markdown editor
- `gn-ui-application-banner` — app-wide banner (welcome/maintenance message)
- `gn-ui-notification` — notification/toast message
- `gn-ui-confirmation-dialog` — confirm/cancel dialog
- `gn-ui-error` — error message display
- `gn-ui-content-ghost` — skeleton/ghost placeholder shown while loading

### `ui/layout` — structural & large-surface components
Containers, panels, tables, pagination, carousels — components that occupy a large part of the screen or wrap other content.

- `gn-ui-modal-dialog` — modal dialog (use instead of hand-rolled modals)
- `gn-ui-expandable-panel` — collapsible panel
- `gn-ui-expandable-panel-button` — toggle button for an expandable panel
- `gn-ui-form-field-wrapper` — label/wrapper around a form field
- `gn-ui-block-list` — paginated list of blocks
- `gn-ui-sortable-list` — drag-to-reorder list
- `gn-ui-carousel` — content carousel
- `gn-ui-interactive-table` — sortable/interactive data table
- `gn-ui-interactive-table-column` — column definition for the interactive table
- `gn-ui-cell-popin` — popin anchored to a table cell
- `gn-ui-pagination` — pagination control
- `gn-ui-pagination-buttons` — pagination as numbered buttons
- `gn-ui-pagination-dots` — pagination as dots
- `gn-ui-previous-next-buttons` — previous/next navigation buttons
- `gn-ui-sticky-header` — header that sticks on scroll
- `gn-ui-max-lines` — clamps content to a maximum number of lines
- `gn-ui-truncated-text` — text truncated with ellipsis/expand

### `ui/widgets` — small self-contained visual indicators
- `gn-ui-spinning-loader` — spinner / loading indicator
- `gn-ui-loading-mask` — overlay loading mask
- `gn-ui-progress-bar` — progress bar
- `gn-ui-popover` — popover / tooltip container
- `gn-ui-popup-alert` — popup alert message
- `gn-ui-color-scale` — color scale display

### `ui/search` — search UI presentation
Facets, record previews and result listings (driven by inputs from `feature-search` smart components).

- `gn-ui-facet-list` — list of facets
- `gn-ui-facet-block` — block of facets
- `gn-ui-facet-item` — single facet entry
- `gn-ui-results-list` — list of results
- `gn-ui-results-list-item` — single result item
- `gn-ui-results-table` — results as a table
- `gn-ui-results-hits-number` — total hits count
- `gn-ui-results-hits-search-kind` — hits count by search kind
- `gn-ui-action-menu` — actions menu (e.g. for a result)
- `gn-ui-record-metric` — metric/count for a record
- `gn-ui-record-preview` — base record preview
- `gn-ui-record-preview-card` — record preview (card layout)
- `gn-ui-record-preview-list` — record preview (list layout)
- `gn-ui-record-preview-row` — record preview (row layout)
- `gn-ui-record-preview-feed` — record preview (feed layout)
- `gn-ui-record-preview-text` — record preview (text layout)
- `gn-ui-record-preview-title` — record preview (title only)

### `ui/dataviz` — data visualization
- `gn-ui-chart` — chart (Chart.js)
- `gn-ui-data-table` — tabular data view
- `gn-ui-figure` — KPI figure (icon + title + value)

### `ui/map` — map-specific presentation
- `gn-ui-map-container` — OpenLayers map container
- `gn-ui-map-legend` — map legend
- `gn-ui-feature-detail` — feature attributes detail panel
- `gn-ui-spatial-extent` — spatial extent (bbox) display/preview

### `ui/catalog` — catalog & organisations presentation
- `gn-ui-catalog-title` — catalog title/header
- `gn-ui-language-switcher` — UI language switcher
- `gn-ui-organisation-preview` — single organisation preview
- `gn-ui-organisations-filter` — organisations filter
- `gn-ui-organisations-result` — organisations result/list
