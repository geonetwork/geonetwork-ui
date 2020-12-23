#!/usr/bin/env bash

DIST_WC_PATH=webcomponents/dist/webcomponents/

echo '-- Build Geonetwork Web Components'
ng build --prod --output-hashing=none --output-path=${DIST_WC_PATH} gn-wc

echo '-- Publish html page for Web Component' ${APP_NAME}
mkdir -p $DIST_WC_PATH
cat ${DIST_WC_PATH}{runtime,polyfills,main}.js | gzip > $DIST_WC_PATH'gn-wc.js.gz'
rm -f ${DIST_WC_PATH}main.js
rm -f ${DIST_WC_PATH}polyfills.js
rm -f ${DIST_WC_PATH}runtime.js
rm -f ${DIST_WC_PATH}styles.css

sampleLinks=""
for c in webcomponents/src/app/components/gn-* ; do
  echo "-- Copy HTML sample for:" `basename $c`
  fileName=`basename $c`".sample.html"
  cp $c/$fileName $DIST_WC_PATH
  sampleLinks+="<a href='"$fileName"'>"`basename $c`"</a>"
done

#printf -v sampleLinksEscaped "%q\n" ${sampleLinks}
#sed -e "s/<body>/<body>${sampleLinksEscaped}/g" $DIST_WC_PATH'index.html'

./node_modules/.bin/http-server $DIST_WC_PATH -p 8001 --gzip
