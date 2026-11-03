#!/bin/bash
set -e

export JAVA_OPTIONS="${JAVA_OPTS} ${GN_CONFIG_PROPERTIES}"

GN_BASE_DIR=/opt/geonetwork

if ! command -v -- "$1" >/dev/null 2>&1 ; then
	set -- java -jar "$JETTY_HOME/start.jar" "$@"
fi

if [[ "$1" = jetty.sh ]] || [[ $(expr "$*" : 'java .*/start\.jar.*$') != 0 ]]; then
    # Customize context path
    if [ ! -f "{$JETTY_BASE}/webapps/geonetwork.xml" ]; then
        echo "Using $WEBAPP_CONTEXT_PATH for deploying the application"
        cp /usr/local/share/geonetwork/geonetwork_context_template.xml "${JETTY_BASE}/webapps/geonetwork.xml"
        sed -i "s#GEONETWORK_CONTEXT_PATH#${WEBAPP_CONTEXT_PATH}#" "${JETTY_BASE}/webapps/geonetwork.xml"
    fi

    # Delegate on base image entrypoint to start jetty
    exec /docker-entrypoint.sh "$@"
else
    exec "$@"
fi
