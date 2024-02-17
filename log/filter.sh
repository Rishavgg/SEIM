#!/bin/sh

LOGFILE="$1"
if [ ! -f "${LOGFILE}" ]; then
    echo "Error: ${LOGFILE} does not exist!" >&2
    exit 1
fi

OUTPUT="${PWD}/filter.log"
rm -rf "${OUTPUT}"
touch "${OUTPUT}"

while IFS= read -r line; do
    ip=$(echo "$line" | awk '{print $1}')
    method=$(echo "$line" | awk '{print $6}')
    timestamp=$(echo "$line" | awk '{print $4","$5","$7","$8","$9}')
    status_bytes=$(echo "$line" | awk '{print $10}' | cut -d' ' -f1)
    echo "$ip $method $(echo $timestamp | tr "," " ") $status_bytes " >> "${OUTPUT}"
done < "${LOGFILE}"