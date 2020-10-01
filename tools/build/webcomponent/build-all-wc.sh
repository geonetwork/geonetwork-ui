#!/usr/bin/env bash

WC_FOLDER='webcomponents/'

for d in ${WC_FOLDER}*/ ; do
  WC_NAME=$(grep -oP '(?<='${WC_FOLDER}').*?(?=\/)' <<< $d)
  if [[ $WC_NAME == gn-* ]]
  then
    echo "-- Build Web Component for:" $WC_NAME
    ng build --prod --output-hashing=none $WC_NAME
  fi
done
