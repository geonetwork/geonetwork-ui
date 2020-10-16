#!/usr/bin/env bash
for c in webcomponents/gn-* ; do
  echo "-- Build Web Component for:" `basename $c`
  ng build `basename $c`
done
