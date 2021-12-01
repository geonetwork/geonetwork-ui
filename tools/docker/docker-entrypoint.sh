#!/bin/bash

CONFIG_FILE=assets/configuration/default.toml

# Modify the GN4 url and proxy path based on env variables (if defined)
if [ ! -z "${GN4_API_URL}" ]
then
  sed -i "s%geonetwork4_api_url = \".*\"%geonetwork4_api_url = \"${GN4_API_URL}\"%" /usr/share/nginx/html/${APP_NAME}/${CONFIG_FILE}
  echo "[INFO] Replaced GN4 url in conf with: ${GN4_API_URL}"
fi
if [ ! -z "${PROXY_PATH}" ]
then
  sed -i "s%proxy_path = \".*\"%proxy_path = \"${PROXY_PATH}\"%" /usr/share/nginx/html/${APP_NAME}/${CONFIG_FILE}
  echo "[INFO] Replaced proxy path in conf with: ${PROXY_PATH}"
fi

exec "$@"
