import React, { Component } from 'react'
import Chart from "react-apexcharts";
import UserLocationService from '../../api/UserLocationService'
import Moment from 'moment';

class BarChartComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [1, 1]
        }
        this.updateUserValues = this.updateUserValues.bind(this)
    }

    async componentDidMount() {
        await this.updateUserValues("2021-04-01")
    }

    async updateUserValues(afterDate) {
        await UserLocationService.retrievePollutionValues(afterDate)
            .then(
                response => {
                    console.log(response);
                    var data = []
                    for (var i = 0; i < response.data.length; i++) {
                        data.push([Date.parse(response.data[i].timestamp), response.data[i].value])
                    }
                    this.setState({ data: data })

                    console.log(data)
                }
            )
    }

    render() {
        var options = {
            chart: {
                type: 'bar',
                height: '350px'
            },
            series: [{
                name: 'Values',
                data: this.state.data
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
                            to: 30,
                            color: '#eff542'
                        }, {
                            from: 30,
                            to: 40,
                            color: '#f5ce42'
                        }, {
                            from: 40,
                            to: 100,
                            color: '#FF0000'
                        }
                        ]
                    },
                    columnWidth: '90%',
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
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                title: {
                    text: 'Values [ug/m3]',
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
        }
        return (
            <div className="app">
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