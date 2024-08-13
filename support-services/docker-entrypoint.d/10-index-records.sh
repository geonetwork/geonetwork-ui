#!/bin/sh

host=geonetwork:8080
jsessionid=$(cat /jsessionid)
xsrf_token=$(cat /xsrf_token)

echo "Triggering full records indexation in GeoNetwork..."

# then trigger an indexing
result=$(
  curl -s "http://$host/geonetwork/srv/api/site/index" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
    -H "X-XSRF-TOKEN: $xsrf_token"
)

if [ "$result" != '"CREATED"' ]; then
  echo "Failed to start indexing in GeoNetwork, received:"
  echo $result
  exit 1
fi

# then wait for indexing to start
# NOTE: this is confusing but GeoNetwork returns indexing=false when indexing has actually started
indexing=true
until [ "$indexing" = 'false' ];
do
  indexing=$(
    curl -s "http://$host/geonetwork/srv/api/site/indexing" \
      -H 'Accept: application/json, text/plain, */*' \
      -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
      -H "X-XSRF-TOKEN: $xsrf_token"
  )
  sleep 1
done
echo "Indexing has successfully started."

# finally check that the index has records in it
# and that the records count is stable (i.e. indexing is finished)
prevRecordsCount=0
recordsCount=0
while [ "$recordsCount" = '0' ] || [ "$prevRecordsCount" != "$recordsCount" ];
do
  sleep 3
  prevRecordsCount=$recordsCount
  response=$(
    curl -s "http://$host/geonetwork/srv/api/search/records/_search" \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Content-Type: application/json;charset=UTF-8' \
      -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
      -H "X-XSRF-TOKEN: $xsrf_token" \
      --data-raw '{"size":0}'
  )
  recordsCount=$(echo $response | sed 's/.*"hits":{"total":{"value":\([0-9]\+\).*/\1/g')
  echo "Records found: $recordsCount"
done

echo "Indexing job in GeoNetwork successful."
