import React, { Component } from 'react'
import ReactApexChart from "react-apexcharts";
import { PM10SpecificIndex, PM25SpecificIndex, SO2SpecificIndex, NO2SpecificIndex, O3SpecificIndex } from '../../Constants';

function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  

class HeatmapChartComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [
                {
                  name: "Jan",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "Feb",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "Mar",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "Apr",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "May",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "Jun",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "Jul",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "Aug",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                },
                {
                  name: "Sep",
                  data: generateData(31, {
                    min: -30,
                    max: 55
                  })
                }
              ],
            options: {
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                stroke: {
                    width: 2
                },
                plotOptions: {
                    heatmap: {
                        radius: 20,
                        enableShades: false,
                        colorScale: {
                            ranges: [{
                                from: 0,
                                to: 5,
                                color: '#008FFB'
                            },
                            {
                                from: 6,
                                to: 10,
                                color: '#00E396'
                            },
                            ],
                        },

                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#fff']
                    }
                },
                "xaxis": {
                    tickAmount: 'dataPoints',
                    "labels": {
                      "show": true,
                      "style": {
                        "colors": []
                      }
                    },
                    "type": "categories",
                    "categories": [],
                    "tooltip": {
                      "enabled": true,
                      "offsetY": 0
                    }
                  },
                title: {
                    text: 'Harta termografica cu valorile medii de poluare din anul in curs'
                },
            },
        }
    }

    render() {
        return (
            <div className="app" >
                <div className="charts-row">
                    <ReactApexChart
                        className="chart"
                        options={this.state.options}
                        series={this.state.series}
                        type="heatmap"
                        height="120%"
                        width="100%" />
                </div>
            </div>)
    }
}
export default HeatmapChartComponent