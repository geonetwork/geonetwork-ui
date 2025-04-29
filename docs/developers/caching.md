---
outline: deep
---

# Caching

## Cache-based requests

The Datahub leverages OGC-client's built-in caching mechanism to optimize data fetching for features, CSV, XLS, GeoJSON, GML files, and more.

By default, OGC-client caches responses for 2 hours. However, for records that are updated frequently, this cache is automatically bypassed.

A record is considered to have a high update frequency if its `updateFrequency` property is set to `'continual'` or if it gets updated **more than once per day**.
