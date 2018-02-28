import RPi.GPIO as GPIO

class Button:
	def __init__(self, pin):
		self.pin = pin
		self.setup()
	
	def setup(self):
		# pulling up to avoid false detection
		GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
	
	def onClick(self, callback):
		try:
			GPIO.wait_for_edge(self.pin, GPIO.FALLING)
			callback()
		except KeyboardInterrupt:
			GPIO.cleanup()
		GPIO.cleanup()
