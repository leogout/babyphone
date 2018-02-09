import socket
import my_wifi

hostMACAddress = '40:E2:30:3B:AE:F9' # The MAC address of a Bluetooth adapter on the server. The server might have multiple Bluetooth adapters.
port = 1 # 3 is an arbitrary choice. However, it must match the port used by the client.
backlog = 1
size = 1024
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
s.bind((hostMACAddress,port))
s.listen(backlog)

def to_string(bytes):
    return bytes.decode('utf-8').strip('\n')


try:
    client, address = s.accept()
    while 1:
        data = to_string(client.recv(size))
        print(data)
        if data == 'ls':
            print(my_wifi.Search())
        if data.split(' ')[0] == 'c':
            print(my_wifi.Connect(data.split(' ')[1], '5x10-1M.S-1'))
            client.send(data.split(' ')[1].encode() + b'\n')

except Exception as e:
    print(e)
    print("Closing socket")
    client.close()
    s.close()
