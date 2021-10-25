#!/bin/bash

envsubst < /usr/share/nginx/html/${APP_NAME}/assets/env.template.js > /usr/share/nginx/html/${APP_NAME}/assets/env.js

exec "$@"
