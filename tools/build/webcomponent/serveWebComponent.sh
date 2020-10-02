#!/usr/bin/env bash

APP_NAME=${1}
WC_TAG=${APP_NAME}
DIST_PATH=webcomponents/${APP_NAME}/dist/
DIST_WC_PATH=$DIST_PATH'webcomponents/'

if [ ${2} ] && [ ${2} = "--build" ]
then
  echo '-- Build Web Component for' ${APP_NAME}
  ng build --prod --output-hashing=none --output-path=${DIST_WC_PATH} ${APP_NAME}
fi

echo '-- Publish html page for Web Component' ${APP_NAME}
mkdir -p $DIST_WC_PATH
cat ${DIST_WC_PATH}{runtime,polyfills,main}.js | gzip > $DIST_WC_PATH${WC_TAG}'.js.gz'

cp tools/build/webcomponent/index.html $DIST_WC_PATH
sed -i 's/VAR_WC/'${WC_TAG}'/g' $DIST_WC_PATH'index.html'

./node_modules/.bin/http-server $DIST_WC_PATH -p 8001 --gzip
