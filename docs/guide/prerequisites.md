---
outline: deep
---

# Prerequisites

In order for GeoNetwork-UI to work properly, the following prerequisites should be met:

## GeoNetwork

A running GeoNetwork instance is required for GeoNetwork-UI applications to run properly, as GeoNetwork API is essentially the backend service for these applications.

GeoNetwork-UI applications are compatible with **any GeoNetwork versions starting from 4.2.2.**

> [!IMPORTANT]
> For the [Metadata Editor application](../apps/editor), **GeoNetwork 4.2.5 or higher is required**.

::: details When using GeoNetwork 4.2.4 and below

These issues will cause the Metadata Editor application to not work properly:

- Saving a record will wipe all its attachments, thus potentially breaking existing records and preventing uploading attachments to new ones
  > This issue has been fixed by https://github.com/geonetwork/core-geonetwork/pull/7178
- Spatial extents might be corrupted on save (an unexpected `xmlns=""` is added inside GML geometries, thus making them unreadable)
  > This issue has been by https://github.com/geonetwork/core-geonetwork/pull/6650

:::

::: details When using GeoNetwork 4.2.2

A bug in GeoNetwork 4.2.2 prevents the organizations from showing up correctly in the DataHub application.

As a temporary workaround, the following change is necessary in GeoNetwork data directory:

```diff
diff --git a/web/src/main/webResources/WEB-INF/data/config/index/records.json b/web/src/main/webResources/WEB-INF/data/config/index/records.json
index 1d7e499af7..78e682e3db 100644
--- a/web/src/main/webResources/WEB-INF/data/config/index/records.json
+++ b/web/src/main/webResources/WEB-INF/data/config/index/records.json
@@ -1317,7 +1317,7 @@
           "mapping": {
             "type": "nested",
             "properties": {
-              "org": {
+              "organisation": {
                 "type": "keyword"
               },
               "role": {
```

:::

## ElasticSearch

ElasticSearch is the search engine used by GeoNetwork and is relied on heavily by GeoNetwork-UI applications to provide an outstanding search experience..

GeoNetwork-UI applications require **a running instance of ElasticSearch version 7.11 or above** alongside GeoNetwork.

For more information on which ElasticSearch version is compatible with which GeoNetwork version, please refer to the [official GeoNetwork documentation](https://docs.geonetwork-opensource.org/latest/install-guide/installing-index/#elasticsearch-compatibility).
