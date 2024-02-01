#!/bin/sh

host=geonetwork:8080
jsessionid=$(cat /jsessionid)
xsrf_token=$(cat /xsrf_token)

echo "Uploading thesauri to GeoNetwork..."

for f in /docker-entrypoint.d/thesauri/*.rdf
do
  curl -s "http://$host/geonetwork/srv/api/registries/vocabularies" \
    -F "file=@$f" -F "type=external" -F "dir=theme" \
    -X "POST" \
    -H 'Content-Type: multipart/form-data' \
    -H 'Accept: application/json, text/plain, */*' \
    -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
    -H "X-XSRF-TOKEN: $xsrf_token"
done

