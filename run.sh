#!/bin/sh

networks=$(sudo docker network ls)

Green="\e[32m"
Red="\033[0;31m"
Blue='\033[0;34m'
# NC='\033[0m'

if [ "$1" = "stop" ]; then
    echo "${Red}Stopping API Server and removing containers"
    sudo docker compose down --rmi local
    exit 0
fi

if [ "$1" = "clean" ]; then
  echo "${Blue} Removing <none> images to clean system"
  sudo docker rmi $(sudo docker images -f "dangling=true" -q)
  exit 0
fi

if echo "$networks" | grep -q "nginx_network"; then
  echo "${Green}The 'nginx_network' network already exists."
else
  echo "${Red}The 'nginx_network' network does not exist."
  echo "${Green}creating network"
  sudo docker network create nginx_network
fi

echo "${Green}starting server build"

sudo docker compose build

echo "${Green}starting server in deattached mode"

sudo docker compose up -d