import RPi.GPIO as GPIO
import time
from threading import Thread

class BlinkLed():
    def __init__(self, pin):
        self.pin = pin
        self.term = False
        self.thread = None
        GPIO.setup(self.pin, GPIO.OUT)   # Set LedPin's mode is output

    def blink(self):
        if self.thread:
            self.stop()

        self.thread = Thread(target=self.run)
        self.thread.start()

    def run(self):
        self.term = False
        while not self.term:
            GPIO.output(self.pin, GPIO.HIGH)  # led on
            time.sleep(0.5)
            GPIO.output(self.pin, GPIO.LOW) # led off
            time.sleep(0.5)

    def stop(self):
        if not self.thread:
            return

        self.term = True
        self.thread.join()
        self.thread = None

class Led(Thread):
    def __init__(self, pin):
        self.pin = pin
        GPIO.setup(self.pin, GPIO.OUT)    # Set LedPin's mode is output

    def up(self):
        GPIO.output(self.pin, GPIO.HIGH)  # led on

    def down(self):
        GPIO.output(self.pin, GPIO.LOW)   # led off
