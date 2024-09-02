---
outline: deep
---

# Prerequisites

In order for GeoNetwork-UI to work properly, the following prerequisites should be met:

## GeoNetwork Server

Version 4.2.5 or higher is required.

Known bugs in versions below 4.2.5:

- Image upload: (Fixed by https://github.com/geonetwork/core-geonetwork/pull/7178)
- Spatial extent: the backend returns an error in the XML (adds an empty `xmlns` in the `posList` tag) (Fixed by https://github.com/geonetwork/core-geonetwork/pull/6650)
