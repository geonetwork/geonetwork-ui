#!/bin/bash

APP_FILES_PATH=/usr/share/nginx/html/${APP_NAME}/

CONFIG_FILE_PATH=assets/configuration/
CONFIG_FILE_NAME=default.toml
CONFIG_OVERRIDE_FILE_PATH=${CONFIG_DIRECTORY_OVERRIDE:-/conf}/${CONFIG_FILE_NAME}

ASSETS_PATH=assets/
CUSTOM_ASSETS_PATH=${ASSETS_DIRECTORY_OVERRIDE:-/assets}/

## 1. COPY CONFIG FILE

# check if conf file from $CONFIG_DIRECTORY_OVERRIDE (defaults to /conf) is present
if [ -f "${CONFIG_OVERRIDE_FILE_PATH}" ]
then
  # copy file straight to the assets
  echo "[INFO] Copying custom configuration file located at ${CONFIG_OVERRIDE_FILE_PATH}..."
  cp ${CONFIG_OVERRIDE_FILE_PATH} ${APP_FILES_PATH}${CONFIG_FILE_PATH}${CONFIG_FILE_NAME}
else
  # no conf file; use env variables to tweak app config
  echo "[INFO] No custom configuration file found at ${CONFIG_OVERRIDE_FILE_PATH}"
  # Modify the GN4 url and proxy path based on env variables (if defined)
  if [ ! -z "${GN4_API_URL}" ]
  then
    echo "[INFO] Replacing GN4 url in conf with: ${GN4_API_URL}..."
    sed -i "s%geonetwork4_api_url = \".*\"%geonetwork4_api_url = \"${GN4_API_URL}\"%" ${APP_FILES_PATH}${CONFIG_FILE_PATH}${CONFIG_FILE_NAME}
  fi
  if [ ! -z "${PROXY_PATH}" ]
  then
    echo "[INFO] Replacing proxy path in conf with: ${PROXY_PATH}..."
    sed -i "s%proxy_path = \".*\"%proxy_path = \"${PROXY_PATH}\"%" ${APP_FILES_PATH}${CONFIG_FILE_PATH}${CONFIG_FILE_NAME}
  fi
fi

## 2. COPY ASSETS

# check whether the $CUSTOM_ASSETS_PATH directory is present and not empty
if [ -d "${CUSTOM_ASSETS_PATH}" ] && [ "$(ls -A ${CUSTOM_ASSETS_PATH})" ]; then
  files_count=$(find ${CUSTOM_ASSETS_PATH} -type f | wc -l)
  # copy assets right away
  echo "[INFO] Copying ${files_count} custom assets found in ${CUSTOM_ASSETS_PATH}..."
  cp ${CUSTOM_ASSETS_PATH}. -r ${APP_FILES_PATH}${ASSETS_PATH}
  # add a preload link for each asset that is an image
  cd ${CUSTOM_ASSETS_PATH}
  images=$(find . -type f -a \( -iname "*.png" -o  -iname "*.svg" -o -iname "*.webp" -o -iname "*.jpg" -o -iname "*.jpeg" \))
  for image in ${images}
  do
    echo "[INFO] Adding preload link for ${image}..."
    sed -i "s@<!--%PRELOAD_LINKS%-->@<!--%PRELOAD_LINKS%-->\n<link rel=\"preload\" href=\"assets/${image}\" as=\"image\" importance=\"high\" />@" \
      ${APP_FILES_PATH}index.html
  done
else
  echo "[INFO] No custom assets found at ${CUSTOM_ASSETS_PATH}"
fi

# Executing custom scripts located in CUSTOM_SCRIPTS_DIRECTORY if environment variable is set
if [[ -z "${CUSTOM_SCRIPTS_DIRECTORY}" ]]; then
  echo "[INFO] No CUSTOM_SCRIPTS_DIRECTORY env variable set"
else
  echo "[INFO] CUSTOM_SCRIPTS_DIRECTORY env variable set to ${CUSTOM_SCRIPTS_DIRECTORY}"
  run-parts ${CUSTOM_SCRIPTS_DIRECTORY}/
  echo "[INFO] End executing custom scripts"
fi

echo "[INFO] docker-entrypoint.sh ended successfully."

exec "$@"
