dmesg | grep -i blue

sudo nano /etc/bluetooth/main.conf
# write at the end: DisablePlugins = pnat

sudo service bluetooth status
sudo service bluetooth start

rfkill list
sudo rfkill unblock bluetooth

sudo bluetoothctl
power on
discoverable on
agent on
default-agent
# pair on the phone, then:
trust A0:4C:5B:AD:FF:92
quit

sudo pip3 install wifi

