#!/usr/bin/env python3

import pandas as pd
import sched
import time
import pickle
import warnings
from sklearn.compose import ColumnTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import OneHotEncoder
from sklearn.exceptions import InconsistentVersionWarning 
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)
# Load the trained unsupervised model
with open('best_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Function to preprocess testing data
def preprocess_data(df):
    # Handling '-' in the Referrer column
    df['Referrer'] = df['Referrer'].replace('-', 'unknown')

    # Encode categorical variables
    categorical_features = ['Method', 'Referrer', 'UserAgent']
    categorical_transformer = OneHotEncoder(handle_unknown='ignore')

    # Count vectorization for Request column
    count_vectorizer = CountVectorizer()

    # Column transformer for preprocessing different types of features
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', categorical_transformer, categorical_features),
            ('text', count_vectorizer, 'Request')  # Assuming 'Request' is text data
        ],
        remainder='drop'  # Drop any columns not specified in the transformers list
    )

    # Apply preprocessing
    processed_data = preprocessor.fit_transform(df)
    return processed_data

# Function to detect anomalies
def detect_anomalies(testing_data):
    # Preprocess the testing data
    testing_df = pd.read_excel(testing_data)
    processed_testing_data = preprocess_data(testing_df)

    # Perform inference using the model
    anomalies = model.fit_predict(processed_testing_data)
    return anomalies, testing_df['IP']

def main():
    # Read Excel file using Python open command
    file_path = 'log_data.xlsx'
    anomalies, ip_addresses = detect_anomalies(file_path)
    # Write output to a text file
    output_file_path = 'output.txt'
    with open(output_file_path, 'w') as file:
        anomaly_counts = {'Yes': 0, 'No': 0}
        for i, anomaly_label in enumerate(anomalies):
            if anomaly_label == -1:
                anomaly_counts['Yes'] += 1
            else:
                anomaly_counts['No'] += 1

        if anomaly_counts['Yes'] > anomaly_counts['No']:
            not_anomaly_ip = ip_addresses.iloc[0]
            file.write(f"IP Address {not_anomaly_ip} is 'not anomaly'\n")
        else:
            anomaly_ip = ip_addresses.iloc[0]
            file.write(f"IP Address {anomaly_ip} is 'anomaly'\n")

if __name__=="__main__":
    scheduler = sched.scheduler(time.time, time.sleep)
    scheduler.enter(40, 1, main)
    scheduler.run()
