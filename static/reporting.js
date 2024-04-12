companies = [
    {name:"Becton Dickson", symbol:"BDX"}, 
    {name:"American Express",symbol:"AXP"}, 
    {name:"Sky Works Solutions", symbol:"SWKS"}, 
    {name: "Aflac", symbol:"AFL"},
    {name:"Astronics Corp", symbol:"ATRO"}
]

function optionChanged(symbol) {
    let companyData = data["data"].filter((object) => object["symbol"] == symbol);
    
    plotPieData(companyData);
    plotLineData(companyData);
};


function plotPieData(companyData) {
    let data2017 = companyData.filter((object) => (object["year"] == 2018 && object["quarter"] == "Q1"));
    let values17 = data2017.map(a => a.entry_value);
    let labels17 = data2017.map(a => a.entry_label);

    let data2022 = companyData.filter((object) => (object["year"] == 2021 && object["quarter"] == "Q1"));
    let values22 = data2022.map(a => a.entry_value);
    let labels22 = data2022.map(a => a.entry_label);

    let pieData = [{
            values: values17,
            labels: labels17,
            type: 'pie',
            domain: {column: 0},
            name: "Q1 2017",
            hoverinfo: 'label+value',
            textposition: 'inside',
            hole: .4
        },
        {
            values: values22,
            labels: labels22,
            type: 'pie',
            domain: {column: 1},
            name: "Q1 2022",
            hoverinfo: 'label+value',
            textposition: 'inside',
            hole: .4
        }
    ];
    
    let layout = {
        title: "Balance Sheet Breakdown, FY 2017/2022",
        height: 480,
        width: 800,
        showlegend: false,
        grid: {rows: 1, columns: 2},
        annotations: [
            {
              font: {
                size: 18
              },
              showarrow: false,
              text: 'Q1 2017',
              x: 0.18,
              y: 0.5
            },
            {
              font: {
                size: 18
              },
              showarrow: false,
              text: 'Q1 2021',
              x: 0.82,
              y: 0.5
            }
          ],
    };
    
    Plotly.newPlot('pie', pieData, layout);
};


function plotLineData(data) {

};

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


populateDropdown();

