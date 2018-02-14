#!/bin/bash

GREEN='\e[32m'
NC='\033[0m' # No Color

echo 'Repairing wifi...'
sudo ifdown wlan0
sudo ifup wlan0
sudo systemctl daemon-reload
sudo systemctl restart dhcpcd
echo -e "[ ${GREEN}Ok${NC} ]"

