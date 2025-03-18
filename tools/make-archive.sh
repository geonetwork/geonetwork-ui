#!/usr/bin/env bash

# This script creates an archive out of a directory in the `dist` folder,
# and appends it with a tag or branch name

# input should be a unique app name or a list of names separated by a comma
# e.g. tools/make-archive.sh datahub,metadata-editor
appNames=$1
gitTag=$(git describe --exact-match --tags 2>/dev/null | sed "s/^v//") # remove "v" in front of version if any
gitBranch=$(git symbolic-ref --short HEAD)

# make sure the archives dist is there and empty
mkdir -p dist/archives
rm -f dist/archives/*

# set field separator to allow looping
IFS=","
for appName in $appNames
do
  distPath=dist/apps/${appName}
  zipPath=dist/archives/${appName}-${gitTag:-${gitBranch}}.zip

  # make sure the built files are there
  if [[ -d "${distPath}" ]]
  then
    zip $zipPath -r ${distPath}
  else
    echo "Error: the files for the app named '${appName}' were not found in dist directory, exiting."
    exit 1
  fi
done


