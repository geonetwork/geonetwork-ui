#!/usr/bin/env bash

# Will print a version tag taking into account the current project version and whether it's a dev version
# on main branch: 1.0.0-dev.1234abcd (commit tag)
# on feature branch: 1.0.0-dev.branch-name
# on git tag: 1.0.0 (git tag)

npmVersion=$(node --print 'require("../package.json").version')
gitTag=$(git describe --exact-match --tags 2>/dev/null | sed "s/^v//") # remove "v" in front of version if any
gitBranch=$(git symbolic-ref --short HEAD)
gitRef=$(git rev-parse --short HEAD)

# git tag defined
if [ -n "${gitTag}" ]; then
  echo ${gitTag}
  exit 0
fi

# main branch
if [ "${gitBranch}" == "main" ]; then
  echo "${npmVersion}.${gitRef}"
  exit 0
fi

echo "${npmVersion}.${gitBranch}"
