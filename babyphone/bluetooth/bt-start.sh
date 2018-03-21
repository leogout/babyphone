#!/bin/bash

RED='\e[31m'
GREEN='\e[32m'
NC='\033[0m' # No Color

echo "Starting bluetooth service..."
sudo service bluetooth start
echo -e "[ ${GREEN}Ok${NC} ]"

echo "Unblocking bluetooth..."
sudo rfkill unblock bluetooth
echo -e "[ ${GREEN}Ok${NC} ]"

echo "Sarting discoverable mode..."

bluetoothctl << EOF
power on
discoverable on
agent on
default-agent
quit
EOF

echo -e "[ ${GREEN}Ok${NC} ]"

echo "You can now pair your phone to the raspberry."
