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
    let companyData = data["data"].filter((object) => (object["symbol"] == symbol && object["statement"] == "bs"));
    //let companyData = data["data"].filter((object) => object["symbol"] == symbol);
    let stocks = stock_data["data"].filter((object) => object["company"] == symbol);
    let cashFlowData =  data["data"].filter((object) => (object["symbol"] == symbol && object["statement"] == "cf"));
    
    showCompanyInfo(companyData[0]);
    plotCashFlow(cashFlowData);
    plotLineApex(companyData);
    plotStockData(stocks);
};

// Plot cash flow data for the comany selected
function plotCashFlow(companyData) {
    //Get data for 2018 and populate trace
    let cashData2018 = companyData.filter((object) => (object["year"] == 2018 && object["quarter"] == "Q1"));
    let cash18Values = cashData2018.map(a => a.entry_value);
    let cash18Labels = cashData2018.map(a => a.entry_label);
    
    let trace1 = { 
        y: cash18Labels,
        x: cash18Values,
        type: 'bar',
        orientation: 'h',
        hoverinfo: 'label+value',
        name: 'Q1 2018'
    };

    //Get data for 2021 and populate trace
    let cashData2021 = companyData.filter((object) => (object["year"] == 2021 && object["quarter"] == "Q1"));
    let cash21Values = cashData2021.map(a => a.entry_value);
    let cash21Labels = cashData2021.map(a => a.entry_label);

    let trace2 = { 
        y: cash21Labels,
        x: cash21Values,
        type: 'bar',
        orientation: 'h',
        hoverinfo: 'label+value',
        name: 'Q1 2021'
    };
    //Assemble lines into one dataset
    var data = [trace1, trace2];
    //Configure chart
    var layout = {
        height: 600,
        width: 1100,
        title: 'Breakdown of CashFlow',
        showlegend: true,
        yaxis: {
          tickformat: ".2s",
          automargin: true
        },
        xaxis: {
          automargin: true,
          title: {
            text: 'Cash Value ($)'
          }
        }
    }
    //Plot graphs to page
    Plotly.newPlot('pie', data, layout);
}

// Create line graphs for balance sheet info
function plotLineApex(companyData) {
  //Retrieve Asset values and create data series'
  let assetData = companyData.filter((object) => (object["entry_concept"] == "Assets"));
  let assetLabels = assetData.map(a => a.quarter + '-' + a.year);
  let assetValues = assetData.map(a => a.entry_value);
  let unit = assetData[0]["entry_unit"].toUpperCase();
  // Retrieve shareholder equity and create data series'
  let shareData = companyData.filter((object) => (object["entry_concept"] == "StockholdersEquity"));
  let shareValues = shareData.map(a => a.entry_value);

  // configure graph details 
  let options = {
    series: [
      {
        name: 'Assets',
        data: assetValues
      },
      {
        name: 'Shareholder Equity',
        data: shareValues
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    title: {
      text: 'Balance Sheet: Assets/Share Equity',
      align: 'left'
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      categories: assetLabels
    },
    yaxis: [{
      labels: {
        formatter: function(val) {
          return "$" + (val/1000000000).toString() + "B";
        }
      }
    }]
  };

  // plot graph to page
  let chart = new ApexCharts(document.querySelector("#line"), options);
  chart.render();
};

// Creates comparative pie charts for balance sheet distribution pre- and post-pandemic
function plotStockData(stockData) {

  let stockValues =  stockData.map(a => {
      return {
        x: new Date(a.Date),
        y: [a.Open, a.High, a.Low, a.Close]
      }
    }
  );

  // configure graph details
  let options = {
    series: [
      {
        name: 'candle',
        data: stockValues
      }
    ],
    chart: {
      height: 350,
      type: 'candlestick',
    },
    title: {
      text: 'StockPriceTracing',
      align: 'left'
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function(val) {
          return dayjs(val).format('MMM DD YYYY')
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return val.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
      }
    }
  };

  let chart = new ApexCharts(document.querySelector("#stock"), options);
  chart.render();
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

    let logo = info.symbol;
    logo = "./images/" + logo.toLowerCase() + ".png";
    d3.select("#name").html(info.company_name);
    d3.select("#symbol").html(info.symbol);
    d3.select("#industry").html(info.industry);
    d3.select("#id_code").html(info.industry_code);
    d3.select("#logo").attr('src', logo);
    d3.select("#logo").attr("style", "height: 240px; width: 240px; padding: 20px");
};

// Call method on page load to populate the dropdown with company names/symbols
populateDropdown();

