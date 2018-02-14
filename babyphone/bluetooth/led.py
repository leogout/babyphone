import RPi.GPIO as GPIO
import time
from threading import Thread

class BlinkLed(Thread):
    def __init__(self, pin):
        Thread.__init__(self)
        self.pin = pin
        self.term = False
        self.setup()

    def setup(self):
        GPIO.setup(self.pin, GPIO.OUT)   # Set LedPin's mode is output

    def blink(self):
        self.start()

    def run(self):
        self.term = False
        while not self.term:
            GPIO.output(self.pin, GPIO.HIGH)  # led on
            time.sleep(0.5)
            GPIO.output(self.pin, GPIO.LOW) # led off
            time.sleep(0.5)

    def stop(self):
        self.term = True

class Led(Thread):
	def __init__(self, pin):
		self.pin = pin
		self.setup()

	def setup(self):
		GPIO.setup(self.pin, GPIO.OUT)    # Set LedPin's mode is output

	def up(self):
		GPIO.output(self.pin, GPIO.HIGH)  # led on
	
	def down(self):
		GPIO.output(self.pin, GPIO.LOW)   # led off
