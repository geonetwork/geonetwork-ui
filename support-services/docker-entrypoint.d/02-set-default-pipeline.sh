#!/bin/sh

indexConfigDir=/mnt/geonetwork_data/config/index/

echo "Setting default pipeline to geonetwork-ui ..."
jq '.settings.index.default_pipeline = "geonetwork-ui"' ${indexConfigDir}records.json > /tmp.json
mv /tmp.json ${indexConfigDir}records.json
