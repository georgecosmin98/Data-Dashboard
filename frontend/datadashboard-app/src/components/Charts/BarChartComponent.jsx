import React, { Component } from 'react'
import Chart from "react-apexcharts";

class BarChartComponent extends Component {

    render() {
        // console.log(this.props.data)

        var options = {
            chart: {
                type: 'bar',
                height: '350px',
                animations: {
                    enabled: false,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: false,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: false,
                        speed: 350
                    }
                },
                zoom: {
                    autoScaleYaxis: true,
                }
            },
            markers: {
                size: 0
            },
            series: [{
                name: 'Values',
                data: this.props.data
            }],
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 20,
                            color: '#00FF00'
                        }, {
                            from: 20,
                            to: 55,
                            color: '#ffcc00'
                        }, {
                            from: 55,
                            to: 1000,
                            color: '#FF0000'
                        }
                        ]
                    },
                    columnWidth: '100%'
                }
            },
            title: {
                text: this.props.pollutantName.toUpperCase(),
                align: 'left',
                style: {
                    fontSize: "16px",
                    color: '#666'
                }
            },
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                title: {
                    text: 'Values [' + this.props.measurement + ']',
                }
            },
            xaxis: {
                type: 'datetime',
                tickAmount: 12,
                labels: {
                    formatter: function (value, timestamp, opts) {
                        return opts.dateFormatter(new Date(timestamp), 'dd MMM HH:mm')
                    }
                }
            },
            noData: {
                text: 'No data available',
                style: {
                    fontSize: '24px',
                  }
            }

    }
    return(
            <div className = "app" >
            <div className="row">
                <Chart
                    className="chart"
                    options={options}
                    series={options.series}
                    type="bar"
                    height="100%"
                    width="100%"
                />
            </div>
            </div>
        );
    }
}
export default BarChartComponent