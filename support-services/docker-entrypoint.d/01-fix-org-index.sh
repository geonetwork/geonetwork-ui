#!/bin/sh

# add jq first
apk update && apk add --no-cache jq

if [ "$FIX_GN_422" = 'true' ]; then
  indexConfigDir=/mnt/geonetwork_data/config/index/

  # fix the indexing type of the organisation name to allow displaying in the UI
  # Note: this is specific to GN 4.2.2, later 4.2.x versions are fixed
  echo "Fixing records.json for GeoNetwork 4.2.2 ..."
  jq '.mappings.dynamic_templates[8].contact.mapping.properties.organisation = { "type": "keyword" }' ${indexConfigDir}records.json > /tmp.json
  mv /tmp.json ${indexConfigDir}records.json
fi
