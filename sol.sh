#!/bin/sh

echo ./guard/output.txt | entr -p sh -c "sudo docker restart ci_app"