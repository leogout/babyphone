#!/bin/bash

NGROK_ID=$(pgrep ngrok)
MJPEG_ID=$(pgrep mjpg_streamer)
RASPI_ID=$(pgrep raspistill)

kill -9 $NGROK_ID $MJPEG_ID $RASPI_ID
