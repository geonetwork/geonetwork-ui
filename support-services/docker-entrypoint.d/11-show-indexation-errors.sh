#!/bin/sh

host=geonetwork:8080
jsessionid=$(cat /jsessionid)
xsrf_token=$(cat /xsrf_token)

echo "Querying indexation warnings and errors..."

response=$(
  curl -s "http://$host/geonetwork/srv/api/search/records/_search" \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
  -H "X-XSRF-TOKEN: $xsrf_token" \
  --data-raw '{"size":0,"aggregations":{"errorMsg":{"terms":{"field":"indexingErrorMsg","size":1000}}}}'
)
echo "There are $(echo $response | grep -oE '"key":"[^"]+"' | wc -l) indexation errors:"
echo $response | grep -oE '"key":"[^"]+"' | sed 's/"key":"\([^"]\+\).*"/  > \1/g'
echo ""
