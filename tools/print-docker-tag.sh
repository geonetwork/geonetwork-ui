#!/usr/bin/env bash

# Will print a docker tag with a version based on the current git branch and tag
# e.g.: geonetwork/geonetwork-ui-my-app:1.0.0-RC2
# or: geonetwork/geonetwork-ui-my-app:feature-branch

appName=$1
gitTag=$(git describe --exact-match --tags 2>/dev/null | sed "s/^v//") # remove "v" in front of version if any
gitBranch=$(git symbolic-ref --short HEAD)
gitRef=$(git rev-parse --short HEAD)
dockerTag=${gitTag:-${gitBranch}}
if [ ${dockerTag} == "main" ]; then
  dockerTag=${dockerTag}-${gitRef}
fi

echo "geonetwork/geonetwork-ui-${appName}:${dockerTag}"
