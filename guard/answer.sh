#!/bin/bash

container_id=$(sudo docker ps -aqf "name=model_app")

if [ -z "$container_id" ]; then
    echo "Error: model_app container not found."
    exit 1
fi

# Copy log_data.xlsx file from the container to the pipe directory
sudo docker cp "$container_id":/output.txt .
