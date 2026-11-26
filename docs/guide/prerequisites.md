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

### Pre-version specific requirements

::: details GeoNetwork 4.4.12

Creating records fails with this version of GeoNetwork. It is highly recommended to migrate to GeoNetwork 4.4.13 or higher.

> This issue has been fixed with https://github.com/geonetwork/core-geonetwork/pull/9558

:::

::: details GeoNetwork 4.4.10 and above

The "Allowed attachments mime-types" configuration in GeoNetwork must be adjusted to allow for `application/json`. See [System Configuration / Allowed file mime types to attach to a metadata record](https://docs.geonetwork-opensource.org/4.4/administrator-guide/configuring-the-catalog/system-configuration/#allowed-file-mime-types-to-attach-to-a-metadata-record).

Without this, administrators will not be able to save dataviz configuration on dataset records in the Datahub.

:::

::: details GeoNetwork 4.2.14 and above (4.2 versions only)

A bug prevents administrators from saving dataviz configuration on dataset records in the Datahub, see [GeoNetwork issue #9639](https://github.com/geonetwork/core-geonetwork/issues/9639).

There is currently no workaround.

:::

::: details GeoNetwork 4.2.4 and below

These issues will cause the Metadata Editor application to not work properly:

- Saving a record will wipe all its attachments, thus potentially breaking existing records and preventing uploading attachments to new ones
  > This issue has been fixed by https://github.com/geonetwork/core-geonetwork/pull/7178
- Spatial extents might be corrupted on save (an unexpected `xmlns=""` is added inside GML geometries, thus making them unreadable)
  > This issue has been fixed by https://github.com/geonetwork/core-geonetwork/pull/6650

:::

::: details GeoNetwork 4.2.2

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

ElasticSearch is the search engine used by GeoNetwork and is relied on heavily by GeoNetwork-UI applications to provide an outstanding search experience.

GeoNetwork-UI applications require **a running instance of ElasticSearch version 7.11 or above** alongside GeoNetwork.

For more information on which ElasticSearch version is compatible with which GeoNetwork version, please refer to the [official GeoNetwork documentation](https://docs.geonetwork-opensource.org/latest/install-guide/installing-index/#elasticsearch-compatibility).
