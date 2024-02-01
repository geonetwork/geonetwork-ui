#!/bin/sh

username=admin
password=admin
host=geonetwork:8080

xsrf_token=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee

echo "Logging in to GeoNetwork..."

# first login to get an authenticated admin session
jsessionid=$(
  curl -s "http://$host/geonetwork/signin" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -H "Cookie: XSRF-TOKEN=$xsrf_token" \
    --data-raw "_csrf=$xsrf_token&username=$username&password=$password" \
    -c - | grep JSESSIONID | awk '{ print $7 }'
)

# store xsrf token and sessionid for later
echo "$jsessionid" > /jsessionid
echo "$xsrf_token" > /xsrf_token
