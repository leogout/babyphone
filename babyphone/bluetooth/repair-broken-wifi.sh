#!/bin/bash
sudo ifdown wlan0
sudo ifup wlan0
sudo systemctl daemon-reload
sudo systemctl restart dhcpcd

