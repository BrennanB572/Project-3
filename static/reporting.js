// Array of companies included in project
companies = [
    {name:"Becton Dickson", symbol:"BDX"}, 
    {name:"American Express",symbol:"AXP"}, 
    {name:"Sky Works Solutions", symbol:"SWKS"}, 
    {name:"Aflac", symbol:"AFL"},
    {name:"Astronics Corp", symbol:"ATRO"}
]

// Receives the selected company and creates the charts and info card
function optionChanged(symbol) {
    let companyData = data["data"].filter((object) => object["symbol"] == symbol);
    let stocks = stock_data["data"].filter((object) => object["company"] == symbol);

    showCompanyInfo(companyData[0]);
    plotLineData(companyData);
    plotStockData(stocks);
};

// Creates comparative pie charts for balance sheet distribution pre- and post-pandemic
function plotStockData(stockData) {
    
    let stockValues = stockData.map(a => a.Close);
    //let stockLabels = stockData.map(a => new Date(a.Date).toDateString());
    let stockLabels = stockData.map(a => a.Date);
    console.log(stockValues);
    console.log(stockLabels);
    let lineData = [{
            y: stockValues,
            X: stockLabels,
            type: 'scatter'
        },
    ];
    
    let layout = {
        title: "Stock Performance 2017/2022",
        showlegend: false,
        xaxis: {
            title: 'Close Date',
            type: 'date',
            tickformat: '%Y-%m-%d'
        },
        yaxis: {
            title: 'Stock Price ($)'
        }
    };
    
    Plotly.newPlot('stock', lineData, layout);
};

// Plots comparative line values over the time period for various BS entries
function plotLineData(companyData) {
    /*
    let laseData = companyData.filter((object) => (object["entry_concept"] == "Liabilities" || object["entry_concept"] == "LiabilitiesCurrent" ));
    let laseValues = laseData.map(a => a.entry_value);
    let laseLabels = laseData.map(a => a.quarter + '-' + a.year);
    let trace1 = {
        x: laseLabels,
        y: laseValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: "Liabilities"
    };
    */
    let assetData = companyData.filter((object) => (object["entry_concept"] == "Assets"));
    let assetValues = assetData.map(a => a.entry_value);
    let assetLabels = assetData.map(a => a.quarter + '-' + a.year);
    let unit = assetData[0]["entry_unit"].toUpperCase();
    let trace2 = {
        x: assetLabels,
        y: assetValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: "Assets"
    };

    let stockData = companyData.filter((object) => (object["entry_concept"] == "StockholdersEquity"));
    let stockValues = stockData.map(a => a.entry_value);
    let stockLabels = stockData.map(a => a.quarter + '-' + a.year);

    let trace3 = {
        x: stockLabels,
        y: stockValues,
        type: 'scatter',
        mode: 'lines+markers',
        name: "Equity"
    };

    var data = [trace2, trace3];

    let layout = {
        title: `Balance Sheet Entries - 2017/2022`,
        showlegend: true,
        xaxis: {
            title: 'Reporting Quarter'
        },
        yaxis: {
            title: `Value  (${unit})`
        }
    }

    Plotly.newPlot('line', data, layout);
};

// Creates dropdown entries for the companies included in the project
function populateDropdown() {
    //Add the IDs to the dropdown selector
    let selector = d3.select("#selectCompany");
    let opts = selector.selectAll(null)
        .data(companies.sort(( a, b ) => {
            if ( a.name < b.name ){
              return -1;
            }
            if ( a.name > b.name ){
              return 1;
            }
            return 0;
          }))
        .enter()
        .append('option')
        .attr('value', function (d) {
          return d.symbol
        })
        .text(function (d) {
          return d.name
        });
};

// Updates the company info section with the selected company's data
function showCompanyInfo(info) {
    d3.select("#name").html(info.company_name);
    d3.select("#symbol").html(info.symbol);
    d3.select("#industry").html(info.industry);
    d3.select("#id_code").html(info.industry_code);
};

// Call method on page load to populate the dropdown with company names/symbols
populateDropdown();

