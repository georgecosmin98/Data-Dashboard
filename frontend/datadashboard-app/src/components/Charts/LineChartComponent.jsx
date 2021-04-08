import React, { Component } from 'react'
import Chart from "react-apexcharts";
import UserLocationService from '../../api/UserLocationService'
import Moment from 'moment';

class LineChartComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [1, 1]
        }
    }

    render() {
        var options = {
            series: [{
                name: 'Values',
                data: this.props.data
            }],
            chart: {
                height: 300,
                type: 'line',
            },
            stroke: {
                width: 7,
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
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ["#00FF00"],
                    shadeIntensity: 1,
                    type: 'vertical',
                    opacityFrom: 1,
                    opacityTo: 0.7,
                    stops: [0, 100]
                },
            },
            markers: {
                size: 0,
                colors: ["#FFA41B"],
                strokeColors: "#fff",
                strokeWidth: 2,
                hover: {
                    size: 7,
                }
            },
            yaxis: {
                title: {
                    text: 'Values [ug/m3]',
                },
            }
        };
        return (
            <div className="app">
                <div className="row">
                    <Chart
                        className="chart"
                        options={options}
                        series={options.series}
                        type="line"
                        height= "100%"
                    />
                </div>
            </div>
        );
    }
}

export default LineChartComponent