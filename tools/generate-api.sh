#!/usr/bin/env bash

libName=$1
specFormat=${2:-'yaml'}
libRootPath=libs/data-access/"$libName"/src/openapi
specPath=libs/data-access/"$libName"/src/spec."$specFormat"

rm -rf "$libRootPath"

./node_modules/.bin/openapi-generator-cli generate \
  -i "$specPath" \
  -g typescript-angular \
  -o "$libRootPath" \
  -c openapi-codegen-config.json \
  --skip-validate-spec

sed -i "s/' | }/' }/" "$libRootPath"/**/*.ts
sed -i "s/SetApiModel/Set/" "$libRootPath"/**/*.ts
sed -i "s/import { Set } from '.\/set.api.model'//" "$libRootPath"/**/*.ts

prettier --write "$libRootPath/**/*.ts"
