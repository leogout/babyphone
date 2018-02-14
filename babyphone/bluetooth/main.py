import socket
import my_wifi
from led import Led, BlinkLed
from button import Button
import RPi.GPIO as GPIO
import logging
import sys

def to_string(bytes):
    return bytes.decode('utf-8').strip('\n')

# INIT
GPIO.setmode(GPIO.BCM)

logger = logging.getLogger('babyphone')
handler = logging.FileHandler('./babyphone.bt.log')
formatter = logging.Formatter('%(asctime)s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# Uncomment to prevent any message under WARNING severity
# logger.setLevel(logging.WARNING)

# START
MAC = 'B8:27:EB:F6:3F:30'
port = 1
backlog = 1
size = 1024

try:
    logger.info('Creating BT socket...')
    bt_socket = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
    logger.info('Bluetooth socket created')
except socket.error as msg:
    logger.error('Failed creating socket: %s' % msg)
    sys.exit(1)

try:
    logger.info('Binding MAC address and port to BT socket with')
    logger.info(' - port: %d' % port)
    logger.info(' - mac:  %s' % MAC)
    bt_socket.bind((MAC, port))
    logger.info('BT Socked binded')
except socket.error as msg:
    logger.error('Failed binding socket: %s' % msg)
    sys.exit(1)

try:
    logger.info('Socket start listening...')
    bt_socket.listen(backlog)
    logger.info('Bluetooth socket listening to backlog: %d' % backlog)
except socket.error as msg:
    logger.error('Listening failed: %s' % msg)
    sys.exit(1)

led = Led(14)
bled = BlinkLed(16)
button = Button(15)

led.down()

def main():
    try:
        bled.blink()
        print('Waiting for bluetooth connexion...')
        client, address = bt_socket.accept()
        print('Connected !')
        bled.stop()
        led.up()

        print('Waiting for user input...')
        while 1:
            data = to_string(client.recv(size))
            print(data)

            if data == 'ls':
                results = my_wifi.Search()
                wifi_string = '\n'.join([cell.ssid for cell in results if results.ssid]).encode()
                client.send(wifi_string)
            if data.split(' ')[0] == 'c':
                print('Atempting connexion to ' + data.split(' ')[1] + '...')
                my_wifi.Connect(data.split(' ')[1], '5x10-1M.S-1')
                print('Connected to ' + data.split(' ')[1])
                client.send(data.split(' ')[1].encode() + b'\n')

    except Exception as e:
        bled.stop()
        led.down()

        print(e)
        print("Closing socket")

        client.close()
        socket.close()
        GPIO.cleanup() # Release resources


button.onClick(main)
