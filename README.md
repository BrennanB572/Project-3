# Pandemic Impact on Corporate Balance Sheets


Project Summary

Stock prices for publicly traded corporations can vary broadly from day-to-day and month-to-month. That fluctuation can result from a number of factors including public sentiment, corporate news and global conflict. But does the stock price reflect the current changes in corporate assets? This study will compare stock pricing and balance sheet information for a five (5) year period to examine this question.

Project Data Set

Utilizing the Kaggle website, the team identified a dataset of SEC filing information for the period outlined above. This data includes the balance sheet listings, by quarter, for each company included. The data set can be found <a href="https://www.kaggle.com/datasets/finnhub/reported-financials">here.</a>

From this dataset, the team identfied five (5) companies across various industries to examine:
0000010795- Becton Dickson (medical products)
0000004962- American Express (banking)
0000004127- Sky Works Solutions (semiconductor)
0000004977- Aflac (insurance)
0000008063- Astronics Corp (aerospace)


Project Activities

Data Engineering (Extract and Load):
    Download the dataset from Kaggle and store the json files
    Process the files via a python script to create a csv file for all records for the companies involved
    Create a sqlite database and import the csv data 

Data Analysis
    Via jupyter notebook, review the data and cleanse as necessary (fill NA values, format financial data, etc)
    Identify relevant information to be presented via visualization
    Create a json file containing the relevant data for use by the presentation layer

Data Visualization
    Design and create a dashboard of comparitive data, allowing for end user input to select company for review


