#!/bin/bash

sudo apt-get install jq
sudo apt-get install npm
sudo apt-get install uuid-runtime

#
sudo apt-get install subversion libv4l-dev libjpeg8-dev imagemagick
sudo ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h
svn co https://svn.code.sf.net/p/mjpg-streamer/code/
cd code/mjpg-streamer
make USE_LIBV4L2=true clean all
make DESTDIR=/usr install
cd ../../
rm -r ./code

npm install -g ngrok
