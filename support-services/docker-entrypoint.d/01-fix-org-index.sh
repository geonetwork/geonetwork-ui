#!/bin/sh

apk update && apk add --no-cache jq

indexConfigDir=/mnt/geonetwork_data/config/index/

# fix the indexing type of the organisation name to allow displaying in the UI
# FIXME: report this upstream
jq '.mappings.dynamic_templates[8].contact.mapping.properties.organisation = { "type": "keyword" }' ${indexConfigDir}records.json > /tmp.json
mv /tmp.json ${indexConfigDir}records.json
