#!/usr/bin/env bash

DIST_PATH=dist/
BUILD_PATH_WEBCOMPONENTS=${DIST_PATH}webcomponents/
BUILD_PATH_STANDALONE_SEARCH=${DIST_PATH}standalone-search/

bundle_webcomponents() {
  echo '-- Copy Web Components bundle file'
  cat ${BUILD_PATH_WEBCOMPONENTS}/*.js > "${DIST_PATH}gn-wc.js"
  # remove all source map references from the final bundle
  sed -i 's/\/\/# sourceMappingURL=.*\.map//g' "${DIST_PATH}gn-wc.js"
}

bundle_standalone_search() {
  echo '-- Copy Standalone Search bundle file'
  cat ${BUILD_PATH_STANDALONE_SEARCH}/*.js > "${DIST_PATH}gn-standalone-search.js"
  # remove all source map references from the final bundle
  sed -i 's/\/\/# sourceMappingURL=.*\.map//g' "${DIST_PATH}gn-standalone-search.js"
}

if [ "$1" == "--watch" ]; then
  echo '-- Watching for changes...'

  if ! command -v inotifywait &> /dev/null; then
    echo 'Error: inotifywait is not installed. Install inotify-tools to use --watch.' >&2
    exit 1
  fi

  inotifywait -m -e modify,create "${BUILD_PATH_WEBCOMPONENTS}" "${BUILD_PATH_STANDALONE_SEARCH}" |
  while read -r directory action file; do
    echo "-- Changes detected ($(timeout 4 cat | wc -l) events since last bundle)"
    bundle_webcomponents
    bundle_standalone_search
  done
else
  bundle_webcomponents
  bundle_standalone_search
fi
