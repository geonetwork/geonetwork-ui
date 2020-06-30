#!/usr/bin/env bash

rm -rf libs/gn-api/src/lib/openapi

./node_modules/.bin/openapi-generator generate \
  -i ./tools/spec.yml \
  -g typescript-angular \
  -o libs/gn-api/src/lib/openapi \
  -c openapi-codegen-config.json \
  --skip-validate-spec \

sed -i "s/' | }/' }/" libs/gn-api/src/lib/openapi/**/*.ts
sed -i "s/SetApiModel/Set/" libs/gn-api/src/lib/openapi/**/*.ts
sed -i "s/import { Set } from '.\/set.api.model'//" libs/gn-api/src/lib/openapi/**/*.ts

prettier --write 'libs/gn-api/src/lib/openapi/**/*.ts'
