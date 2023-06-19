#!/bin/sh
# copy other from env varible and execute
echo "[INFO] CUSTOM_SCRIPTS_DIRECTORY env variable set to ${CUSTOM_SCRIPTS_DIRECTORY}"
chmod +x ${CUSTOM_SCRIPTS_DIRECTORY}/*.sh  
cd ${CUSTOM_SCRIPTS_DIRECTORY}/
run-parts ${CUSTOM_SCRIPTS_DIRECTORY}/
echo "[INFO] End executing custom scripts"
