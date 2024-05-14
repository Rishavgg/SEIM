# Use the official Ubuntu 20.04 LTS image as base
FROM python

COPY . .

# Install Python dependencies
RUN pip3 install openpyxl
RUN pip3 install pandas

# Start the program when the container launches
CMD ["python3", "convert.py"]
