#!/usr/bin/env bash

APP_NAME=${1}
WC_TAG=${2}
DIST_PATH=webcomponents/${APP_NAME}/dist/
DIST_WC_PATH=$DIST_PATH'webcomponents/'

if [ ${3} ] && [ $3} = "--build" ]
then
  echo '-- Build Web Component for' ${APP_NAME}
  ng build --prod --output-hashing=none ${APP_NAME}
fi

echo '-- Publish html page for Web Component' ${APP_NAME}
mkdir -p $DIST_WC_PATH
cat ${DIST_PATH}{runtime-es2015,polyfills-es2015,main-es2015}.js | gzip > $DIST_WC_PATH${WC_TAG}'.js.gz'

cp tools/build/webcomponent/index.html $DIST_WC_PATH
sed -i 's/VAR_WC/'${WC_TAG}'/g' $DIST_WC_PATH'index.html'

./node_modules/.bin/http-server $DIST_WC_PATH -p 8001 --gzip
