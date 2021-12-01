#!/bin/bash

CONFIG_FILE_PATH=assets/configuration/
CONFIG_FILE_NAME=default.toml

# copy the conf file from /conf if present
if [ -f "/conf/${CONFIG_FILE_NAME}" ]
then
  cp /conf/${CONFIG_FILE_NAME} /usr/share/nginx/html/${APP_NAME}/${CONFIG_FILE_PATH}${CONFIG_FILE_NAME}
  echo "[INFO] Copied custom configuration file located in /conf/${CONFIG_FILE_NAME}"
else
  # Modify the GN4 url and proxy path based on env variables (if defined)
  if [ ! -z "${GN4_API_URL}" ]
  then
    sed -i "s%geonetwork4_api_url = \".*\"%geonetwork4_api_url = \"${GN4_API_URL}\"%" /usr/share/nginx/html/${APP_NAME}/${CONFIG_FILE_PATH}${CONFIG_FILE_NAME}
    echo "[INFO] Replaced GN4 url in conf with: ${GN4_API_URL}"
  fi
  if [ ! -z "${PROXY_PATH}" ]
  then
    sed -i "s%proxy_path = \".*\"%proxy_path = \"${PROXY_PATH}\"%" /usr/share/nginx/html/${APP_NAME}/${CONFIG_FILE_PATH}${CONFIG_FILE_NAME}
    echo "[INFO] Replaced proxy path in conf with: ${PROXY_PATH}"
  fi
fi


exec "$@"
