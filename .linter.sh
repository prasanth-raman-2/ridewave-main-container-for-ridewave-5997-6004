#!/bin/bash
cd /home/kavia/workspace/ridewave-main-container-for-ridewave-5997-6004/core_component_for_ridewave
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

