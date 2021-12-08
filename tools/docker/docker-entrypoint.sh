#!/bin/bash

CONFIG_FILE_PATH=assets/configuration/
CONFIG_FILE_NAME=default.toml
CONFIG_OVERRIDE_FILE_PATH=${CONFIG_DIRECTORY_OVERRIDE:-/conf}/${CONFIG_FILE_NAME}

# copy the conf file from $CONFIG_DIRECTORY_OVERRIDE (defaults to /conf) if present
if [ -f "${CONFIG_OVERRIDE_FILE_PATH}" ]
then
  cp ${CONFIG_OVERRIDE_FILE_PATH} /usr/share/nginx/html/${APP_NAME}/${CONFIG_FILE_PATH}${CONFIG_FILE_NAME}
  echo "[INFO] Copied custom configuration file located at ${CONFIG_OVERRIDE_FILE_PATH}"
else
  echo "[INFO] No custom configuration file found at ${CONFIG_OVERRIDE_FILE_PATH}"
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
