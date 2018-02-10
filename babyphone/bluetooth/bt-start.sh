#!/bin/bash

echo 'Starting bluetooth service...'
sudo service bluetooth start
echo '[ Ok ]'

echo 'Unbloxking bluetooth...'
sudo rfkill unblock bluetooth
echo '[ Ok ]'

echo 'Sarting discoverable mode...'
bluetoothctl << EOF
power on
discoverable on
agent on
default-agent
quit
EOF
echo '[ Ok ]'

echo 'You can now pair your phone to the raspberry.'
