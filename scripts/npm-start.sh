#!/bin/bash
pm2 start webpack && /var/www/html/knowhow-chatservice/server/index.js 
echo "ec2 instance started"