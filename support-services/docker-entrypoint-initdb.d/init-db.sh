#!/bin/bash

set +e # there might be errors when restoring, ignoring them
pg_restore -U $POSTGRES_USER -d $POSTGRES_DB /docker-entrypoint-initdb.d/dump
