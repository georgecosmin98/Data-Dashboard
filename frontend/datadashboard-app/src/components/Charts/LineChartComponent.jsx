import React, { Component } from 'react'
import Chart from "react-apexcharts";

class LineChartComponent extends Component {

    render() {
        var options = {
            series: [{
                name: 'Values',
                data: this.props.data
            }],
            annotations: {
                yaxis: [
                    {
                        y: 55,
                        y2: 1000,
                        borderColor: '#000',
                        fillColor: '#FF0000',
                    }, {
                        y: 0,
                        y2: 20,
                        borderColor: '#000',
                        fillColor: '#99ff99',
                    }
                ]
            },
            chart: {
                height: 300,
                type: 'line',
                animations: {
                    enabled: false,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            stroke: {
                width: 4,
                curve: 'smooth'
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
            title: {
                text: 'AirQuality',
                align: 'left',
                style: {
                    fontSize: "16px",
                    color: '#666'
                }
            },
            fill: {
                type: ['gradient'],
                gradient: {
                    shade: 'dark',
                    gradientToColors: ["#0000FF"],
                    shadeIntensity: 1,
                    type: 'vertical',
                    opacityFrom: 1,
                    opacityTo: 1
                },
            },
            markers: {
                size: 0,
                colors: ["#FFA41B"],
                strokeColors: "#fff",
                strokeWidth: 1,
                hover: {
                    size: 5,
                }
            },
            yaxis: {
                title: {
                    text: 'Values [ug/m3]',
                },
            },
            noData: {
                text: 'No data available',
                style: {
                    fontSize: '24px',
                  }
            }
        };
        console.log(this.props.data)
        return (
            <div className="app">
                <div className="row">
                    <Chart
                        className="chart"
                        options={options}
                        series={options.series}
                        type="line"
                        height="100%"
                    />

                </div>
            </div>
        );
    }
}

export default LineChartComponent