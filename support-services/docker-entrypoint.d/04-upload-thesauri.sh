#!/bin/sh

host=geonetwork:8080
jsessionid=$(cat /jsessionid)
xsrf_token=$(cat /xsrf_token)

echo "Uploading thesauri to GeoNetwork..."

# we're waiting a bit here for GN to be ready to accept thesauri (i.e. the default ones are set up)
sleep 4

for f in /docker-entrypoint.d/thesauri/*.rdf
do
  curl -s "http://$host/geonetwork/srv/api/registries/vocabularies" \
    -F "file=@$f" -F "type=external" -F "dir=theme" \
    -X "POST" \
    -H 'Content-Type: multipart/form-data' \
    -H 'Accept: application/json, text/plain, */*' \
    -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
    -H "X-XSRF-TOKEN: $xsrf_token"
  echo ""
done

# this shows the registered thesauri in GN
curl -s --no-progress-meter "http://$host/geonetwork/srv/fre/thesaurus?_content_type=json" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json, text/plain, */*' \
  -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
  -H "X-XSRF-TOKEN: $xsrf_token"
echo ""

echo "Thesauri uploaded to GeoNetwork."
