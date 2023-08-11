#!/bin/bash

if [[ -z $1 ]]
then
	echo "Usage: $0 [key_to_add] [optional: after_which_key]"
	exit 0
fi

for entry in ./*.json
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



