import socket
import my_wifi
from led import Led
from button import Button
import RPi.GPIO as GPIO

def to_string(bytes):
    return bytes.decode('utf-8').strip('\n')

GPIO.setmode(GPIO.BCM)

hostMACAddress = 'B8:27:EB:F6:3F:30'
port = 1
backlog = 1
size = 1024
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
print('Bluetooth socket created')

s.bind((hostMACAddress,port))
print('Bluetooth socket binded to')
print(' - port: ' + str(port))
print(' - mac: ' + hostMACAddress)
print()
s.listen(backlog)
print('Bluetooth socket listening to backlog:' + str(backlog))

led = Led(14)
button = Button(15)

led.down()

def main():
	try:
		led.blink()
		print('Waiting for bluetooth connexion...')
		client, address = s.accept()
		print('Connected !')
		led.stop()
		led.up()
		
		print('Waiting for user input...')
		while 1:
			data = to_string(client.recv(size))
			print(data)
			if data == 'ls':
				results = my_wifi.Search()
				for result in results:
					client.send(result.ssid.encode() + b'\n')
			if data.split(' ')[0] == 'c':
				print('Atempting connexion to ' + data.split(' ')[1] + '...')
				my_wifi.Connect(data.split(' ')[1], '5x10-1M.S-1')
				print('Connected to ' + data.split(' ')[1])
				client.send(data.split(' ')[1].encode() + b'\n')

	except Exception as e:
		led.clear()
		print(e)
		print("Closing socket")
		client.close()
		s.close()

button.onClick(main)
