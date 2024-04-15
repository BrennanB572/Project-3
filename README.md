# Stock Price v. Asset Evaluation

<h3>Project Summary</h3>

<p>Stock prices for publicly traded corporations can vary broadly from day-to-day and month-to-month. That fluctuation can result from a number of factors including public sentiment, corporate news and global conflict. But does the stock price reflect the current changes in corporate assets? This study will compare stock pricing and balance sheet information for a five (5) year period to examine this question.</p>

<h3>Project Data Set</h3>

<p>Utilizing the Kaggle website, the team identified a dataset of SEC filing information for the period outlined above. This data includes the balance sheet and cash flow listings, by quarter, for each company included. The data set can be found <a href="https://www.kaggle.com/datasets/finnhub/reported-financials">here.</a></p>

<p>In order to compare the balance sheet values with the company's stock price, the team visited Yahoo Finance to retrieve the stock price history over a comparative time frame. This history was then downloaded as a csv file and imported into the project database for use in charting. See a sample of the retrieved data <a href="https://finance.yahoo.com/quote/AFL/history?period1=1498867200&period2=1656547200">here.</a><p>

From this dataset, the team identfied five (5) companies across various industries to examine:
<ul>
<li>0000010795- Becton Dickson (medical products)</li>
<li>0000004962- American Express (banking)</li>
<li>0000004127- Sky Works Solutions (semiconductor)</li>
<li>0000004977- Aflac (insurance)</li>
<li>0000008063- Astronics Corp (aerospace)</li>
</ul>

<h3>Project Activities</h3>

<h5>Data Engineering (Extract and Load):</h5>
<ul>
<li>Download the dataset from Kaggle and store the json files</li>
<li>Process the files via a python script to create a csv file for all records for the companies involved</li>
<li>Create a sqlite database and import the csv data </li>
</ul>

<h5>Data Analysis / Data Cleansing</h5>
<ul>
<li>Via jupyter notebook, review the data and cleanse as necessary (fill NA values, format financial data, etc)</li>
<li>Identify relevant information to be presented via visualization</li>
<li>Create a json file containing the relevant data for use by the presentation layer</li>
</ul>

<h5>Data Visualization</h5>
<ul>
<li>Design and create a dashboard of comparitive data, allowing for end user input to select company for review</li>
<li>Utilize multiple libraries for plotting to demonstrate options and benefits to each:</li>
    <ul>
    <li>Plotly.js for the Cash Flow pie charts</li>
    <li>Apexcharts.js for the Stock Candlestick graph and the balance sheet line graphs.</li>
    </ul>
</ul>

<h3>Ethical Considerations</h3>

<p>In order to properly represent comparisons as examples of the United States financial system as a whole, the project team set a few parameters for the data sets: publicly available information; a cross-section of American industries; and a data range large enough to bracket the 2020 pandemic on on either side.</p>

<h3>References:</h3>
<ul>
<li><a href="https://apexcharts.com/javascript-chart-demos/">Apex Charts</a> - Javascript Chart Demos. Used multiple examples as models for the final graphs represented.</li>
</ul>
