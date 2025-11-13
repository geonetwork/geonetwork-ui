#!/usr/bin/env bash

DIST_DEMO_PATH=dist/demo/
DIST_WC_PATH=${DIST_DEMO_PATH}webcomponents/
DIST_STANDALONE_PATH=${DIST_DEMO_PATH}standalone-search/

echo '-- Clear previous build and cache'
rm -rf ${DIST_DEMO_PATH}
rm -rf node_modules/.cache

echo '-- Build GeoNetwork-UI Web Components'
nx run webcomponents:build:webcomponents --skip-nx-cache --output-path=${DIST_WC_PATH}

echo '-- Build GeoNetwork-UI Standalone Search'
nx run webcomponents:build:standaloneSearch --skip-nx-cache --output-path=${DIST_STANDALONE_PATH}

echo '-- Publish html page for Web Component'
cat ${DIST_WC_PATH}/*.js > "${DIST_WC_PATH}gn-wc.js"
find "${DIST_WC_PATH}" -name "*.js" ! -name "gn-wc.js" -exec rm -f {} +
rm -f ${DIST_WC_PATH}styles.css

find apps/webcomponents/src/app -name "*.html" -type f | while read c; do
  echo "-- Copying HTML file:" $(basename "$c")
  cp "$c" $DIST_WC_PATH
  if [ ${2} ] && [ ${2} = "--local" ]
  then
    echo "-- Adapting to local HTML file:" $(basename "$c")
    sed -i -e 's/https:\/\/www.geo2france.fr\/geonetwork/http:\/\/localhost:8080\/geonetwork/g' "${DIST_WC_PATH}/$(basename "$c")"
    sed -i -e 's/https:\/\/www.geo2france.fr\/datahub/\/datahub/g' "${DIST_WC_PATH}/$(basename "$c")"
    sed -i -e 's/9da51f58-15c6-4325-82b1-2cf6c8e75d0f/04bcec79-5b25-4b16-b635-73115f7456e4/g' "${DIST_WC_PATH}/$(basename "$c")"
    sed -i -e 's/proxy-path="https:\/\/www.geo2france.fr\/mapstore\/proxy\/?url="/proxy-path=""/g' "${DIST_WC_PATH}/$(basename "$c")"
    sed -i -e 's/Géo2France/Métropole Européenne de Lille/g' "${DIST_WC_PATH}/$(basename "$c")"
  fi
done

echo "-- Copy demo pages"
mkdir -p ${DIST_DEMO_PATH}
cp -R demo/* ${DIST_DEMO_PATH}

echo '-- Copy standalone search script'
cat ${DIST_STANDALONE_PATH}/*.js > "${DIST_WC_PATH}gn-standalone-search.js"

if [ ${1} ] && [ ${1} = "--serve" ]
then
  ./node_modules/.bin/http-server $DIST_DEMO_PATH -p 8001 --gzip
fi
