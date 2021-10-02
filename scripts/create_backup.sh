#!/bin/bash
source ../.env
now=$(date +"%y-%m-%d")
ssh $SSH_USER@$SSH_HOST "docker exec mongodb mongodump -d $DOMAIN --archive --gzip" > "backups/$now.gz"
