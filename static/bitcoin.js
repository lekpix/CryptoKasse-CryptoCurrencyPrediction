
 d3.json("Hourly.json").then(data => {
    
    console.log(data.map(row => row.close));

    //////////////////////////------MARQUEE----------//////////////////////////////
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    
    var Bitcloseprice= formatter.format(data[(data.length)-1].close)
    var EthVar=formatter.format(12481);
    
    d3.select("#whitetext1").text("Top Assets --> ")
    d3.select("#greentext1").text("BitCoin : ")
    d3.select("#redtext1").text(Bitcloseprice)
    d3.select("#whitetext2").text("  Ethereum :")
    d3.select("#redtext2").text(EthVar)

    ///////////////////////////----------------TABLE------------///////////////////////////////

    var openprice=formatter.format(data[(data.length)-1].open)
    var allhigh=formatter.format(data[(data.length)-1].high)
    var alllow=formatter.format(data[(data.length)-1].low)
    var volume=formatter.format(data[(data.length)-1].volume)

    d3.select("#openprice").text(openprice)
    d3.select("#closeprice").text(Bitcloseprice)
    d3.select("#high").text(allhigh)
    d3.select("#low").text(alllow)
    d3.select("#volume").text(volume)



    ////////////////////////////////------------CANDLESTICK PLOT----------//////////////////////////////////
    var t=[1,2,4,5];
    var c=[5,6,7,8];
    // var h=[7,8,4,1];
    // var l=[6,2,3,1];
    // var o=[0,9,7,8];
    
    var trace = {
        //
        x:data.map(row => row.Datetime),
        close:data.map(row => row.close),
        high:data.map(row => row.high),
        low:data.map(row => row.low),
        open:data.map(row => row.open),
        // x:t,
        // close:c,
        // high:h,
        // low:l,
        // open:o,

    // cutomise colors
         increasing: {line: {color: 'green'}},
         decreasing: {line: {color: 'red'}},

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };
    var layout = {
        dragmode: 'zoom',
        showlegend: false,
        plot_bgcolor:"black",
        paper_bgcolor:"black",
        xaxis: {
            autorange: true,
            title: 'Date',
            rangeselector: {
                x: 0,
                y: 1.2,
                xanchor: 'left',
                font: {size:10},
                bgcolor: '#054323',
                buttons: [{
                    step: 'month',
                    stepmode: 'backward',
                    count: 1,
                    label: '1 month',
                    
                }, {
                    step: 'month',
                    stepmode: 'backward',
                    count: 6,
                    label: '6 months'
                }, {
                    step: 'all',
                    label: 'All dates'
                }]
            }
        },
        yaxis: {
            autorange: true
        }
         
    };
     
    var tracedata = [trace];
       

    Plotly.newPlot('plotPrice', tracedata, layout);

////////////////////////----------------Price vs Date AREA Chart------------////////////////
   
    // var trace1 = {
    //         x:data.map(row => row.Datetime),
    //         y: data.map(row => row.close),
    //         fill:'tozeroy',
    //         type: 'scatter',
    //         mode: 'none',
    //         "fillcolor":"#054323",
    //         //opacity: 1,
    //       };               
                
    //       var data = [trace1];          
  
    // Plotly.newPlot('plotmodelprediction', data,layout);
//////////////////////////////////////////////////////////////////////////
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#plotmodelprediction")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_T
// woNumOrdered_comma.csv",

//   // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Now I can use this dataset:
 /function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the area
    svg.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0(y(0))
        .y1(function(d) { return y(d.value) })
        )

}
)


});
 



//----------------------------------plotly Model prediction---------------------------




// d3.json("Model.json").then(data => {
//     console.log(data);
//     // names = data.map(function (row) {
//     //     return row
//     // });
//    let trace1 = {
//      //x: data.map(row => row.year_month),
//      y: data.predictions,
//         name: "Predictions",
//         mode: 'lines',
//         line: {
//         color: 'red',
//         width: 3
//          }
//     }
//     let traceData = [trace1];

    
//     let layout1 = {
//          title: 'Predictions',
//             // height: 500,
//             // width: 1000,
//             xaxis: {title: {text: ' Date'},
//                      automargin: true,
//                      linecolor: 'black',
//                     linewidth: 1,
//                     mirror: true },
//             yaxis: {title: {text: 'Closing Price'},
//                      automargin: true,
//                      linecolor: 'black',
//                      linewidth: 1,
//                      mirror: true }

//     };

//         // Render the plot to the div tag with id "plot"
//     Plotly.newPlot("plotmodelprediction", traceData, layout1);
//  });

// });