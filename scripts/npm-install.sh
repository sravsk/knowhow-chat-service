#!/bin/bash
cd /var/www/html/knowhow-chatservice
sudo npm install

sudo npm run build

# install pm2 module globaly
sudo npm install -g pm2
sudo pm2 update
echo "install complete"