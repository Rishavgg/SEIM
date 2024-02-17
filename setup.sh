#!/bin/sh

Green="\e[32m"
Red="\033[0;31m"
NC='\033[0m'

if [ $(stat -c %A run.sh | sed 's/...\(.\).\+/\1/') = "x" ]; then
  echo "${Green}Owner has execute permission for run.sh${NC}"
else
  echo "${Red}Adding execute permission to run.sh${NC}"
  chmod +x run.sh
fi

if [ $(stat -c %A log.sh | sed 's/...\(.\).\+/\1/') = "x" ]; then
  echo "${Green}Owner has execute permission for log.sh${NC}"
else
  echo "${Red}Adding execute permission to log.sh${NC}"
  chmod +x log.sh
fi

if [ $(stat -c %A ./log/filter.sh | sed 's/...\(.\).\+/\1/') = "x" ]; then
  echo "${Green}Owner has execute permission for filter.sh${NC}"
else
  echo "${Red}Adding execute permission to filter.sh${NC}"
  chmod +x ./log/filter.sh
fi

./run.sh

./log.sh &

cd ./log; watch -tn2 ./filter.sh nginx.log &

cd ..

if [ "$1" = "stop" ]; then
    echo "${Red}Stopping API containers and closing all pipelines${NC}"
    sudo docker compose down --rmi local
    pkill -f ./log.sh
    pkill -f watch
    exit 0
fi