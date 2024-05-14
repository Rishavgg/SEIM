#!/bin/bash

# Find the container ID of the pipe_app container
container_id=$(sudo docker ps -aqf "name=pipe_app")

if [ -z "$container_id" ]; then
    echo "Error: pipe_app container not found."
    exit 1
fi

# Copy log_data.xlsx file from the container to the pipe directory
sudo docker cp "$container_id":/log_data.xlsx .

echo "log_data.xlsx file copied successfully to the pipe directory."
