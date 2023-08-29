---
outline: deep
---

# Getting started

## Requirements

- ElasticSearch version **7.11+**
- GeoNetwork version **4.2.2 and above**
  > Note: the **4.4.x** versions are currently not supported!

::: info

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
