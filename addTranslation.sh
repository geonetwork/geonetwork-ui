#!/bin/bash

if [[ -z $1 ]]
then
	echo "Script can be used to add translations keys to all files in translations/ folder. Adds translation to the end of the file if second argument not given"
	echo "Usage: $0 [key_to_add] [optional: after_which_key]"
	echo "Example: $0 chart.aggregation.divide chart.aggregation.sum"
	exit 0
fi

for entry in ./translations/*.json
do
  if [[ -z ${2+x} ]]
  then
   sed -i '/}/i\
  "'$1'": ""' $entry
  else
   sed -i '/'$2'/a\
  "'$1'": "",' $entry
  fi
done



