import socket
from my_wifi import WifiManager
from led import Led, BlinkLed
from button import Button
import RPi.GPIO as GPIO
import logging
import sys
from subprocess import call

def format_command(bytes):
    return bytes.decode('utf-8').strip('\n').split(' ')

# INIT
GPIO.setmode(GPIO.BCM)

logger = logging.getLogger('babyphone')
console_handler = logging.StreamHandler()
file_handler = logging.FileHandler('./babyphone.bt.log')

formatter = logging.Formatter('%(asctime)s %(message)s')
console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

logger.addHandler(console_handler)
logger.addHandler(file_handler)

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
    bt_socket.settimeout(5)
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

wm = WifiManager()

def main():
    call('./bt-start.sh')
    bled.blink()
    logger.info('Waiting for bluetooth connexion...')
    client, address = bt_socket.accept()
    logger.info('Connected !')
    bled.stop()
    led.up()

    logger.info('Waiting for user input...')
    stop = False
    while not stop:
        command = format_command(client.recv(size))
        logger.info(command)

        if command[0] == 'ls':
            cells = wm.search()
            wifi_string = '\n'.join([cell.ssid for cell in cells if cells.ssid]).encode()
            client.send(wifi_string)

        if command[0] == 'c':
            logger.info('Atempting connexion to ' + command[1] + '...')
            wm.connect(command[1], command[1])
            logger.info('Connected to ' + command[1])
            client.send(command[1].encode() + b'\n')
            stop = True

try:
    while True:
        logger.info('Waiting for user input...')
        button.onClick(main)

except Exception as e:
    logger.error(e)
    logger.error('Closing socket')

    bled.stop()
    led.down()
    bt_socket.close()
    GPIO.cleanup()


