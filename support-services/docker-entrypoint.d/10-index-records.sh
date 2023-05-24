#!/bin/sh

username=admin
password=admin
xsrf_token=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
host=geonetwork:8080

# first login to get an authenticated admin session
jsessionid=$(
  curl -s "http://$host/geonetwork/signin" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H "Cookie: XSRF-TOKEN=$xsrf_token" \
    --data-raw "_csrf=$xsrf_token&username=$username&password=$password" \
    -c - | grep JSESSIONID | awk '{ print $7 }'
)

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

# then wait for indexing to finish
indexing=true
until [ "$indexing" = 'false' ];
do
  indexing=$(
    curl -s "http://$host/geonetwork/srv/api/site/indexing" \
      -H 'Accept: application/json, text/plain, */*' \
      -H "Cookie: JSESSIONID=$jsessionid; XSRF-TOKEN=$xsrf_token" \
      -H "X-XSRF-TOKEN: $xsrf_token"
  )
  echo "Indexing? $indexing"
  sleep 1
done

echo "Indexing job in GeoNetwork successful."
