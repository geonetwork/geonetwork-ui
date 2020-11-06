#!/usr/bin/env bash

libFolderName=$1

rm -rf libs/gn-api/src/lib/"$libFolderName"/openapi

./node_modules/.bin/openapi-generator generate \
  -i libs/gn-api/src/lib/"$libFolderName"/spec.yml \
  -g typescript-angular \
  -o libs/gn-api/src/lib/"$libFolderName"/openapi \
  -c openapi-codegen-config.json \
  --skip-validate-spec \

sed -i "s/' | }/' }/" libs/gn-api/src/lib/"$libFolderName"/openapi/**/*.ts
sed -i "s/SetApiModel/Set/" libs/gn-api/src/lib/"$libFolderName"/openapi/**/*.ts
sed -i "s/import { Set } from '.\/set.api.model'//" libs/gn-api/src/lib/"$libFolderName"/openapi/**/*.ts

prettier --write "libs/gn-api/src/lib/$libFolderName/openapi/**/*.ts"
