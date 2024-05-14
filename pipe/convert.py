#!/usr/bin/env python3 

import pandas as pd
import re
import sched
import time

pattern = r'(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+) (\S+)\s*(\S*)" (\d{3}) (\d+) "([^"]*)" "([^"]*)"'

def parse_log_file(log_file):
    with open(log_file, 'r') as file:
        log_data = file.read()
    data = []
    for line in log_data.strip().split('\n'):
        match = re.match(pattern, line)
        if match:
            data.append(match.groups())
    columns = ["IP", "Unused", "Unused", "Timestamp", "Method", "Request", "Unused", "Status", "BytesSent", "Referrer", "UserAgent"]
    df = pd.DataFrame(data, columns=columns)
    df.drop(columns=["Unused"], inplace=True)
    return df

def main():
    log_file = "nginx.log"
    df = parse_log_file(log_file)
    output_file = "log_data.xlsx"
    df.to_excel(output_file, index=False)
    scheduler.enter(30, 1, main)

if __name__ == "__main__":
    scheduler = sched.scheduler(time.time, time.sleep)
    scheduler.enter(0, 1, main)
    scheduler.run()