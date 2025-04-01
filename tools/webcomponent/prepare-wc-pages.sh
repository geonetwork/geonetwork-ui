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
