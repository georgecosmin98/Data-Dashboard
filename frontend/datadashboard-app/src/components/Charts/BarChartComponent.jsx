import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { PM10SpecificIndex, PM25SpecificIndex, SO2SpecificIndex, NO2SpecificIndex, O3SpecificIndex } from '../../Constants';

class BarChartComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            minGreen: 0,
            maxGreen: '',
            minRed: '',
            maxRed: '',
            currentPollutant: '',
        }
    }

    componentDidUpdate() {
        if (this.props.data && this.props.pollutantName !== this.state.currentPollutant) {
            console.log(this.props.data)
            console.log(this.props.pollutantName)
            if (this.props.pollutantName === "pm25") {
                this.setState({
                    maxGreen: PM25SpecificIndex[0].maxValue,
                    minRed: PM25SpecificIndex[5].minValue,
                    maxRed: PM25SpecificIndex[5].maxValue,
                    currentPollutant: 'pm25'
                })
            }
            else
                if (this.props.pollutantName === "pm10") {
                    this.setState({
                        maxGreen: PM10SpecificIndex[0].maxValue,
                        minRed: PM10SpecificIndex[5].minValue,
                        maxRed: PM10SpecificIndex[5].maxValue,
                        currentPollutant: 'pm10'
                    })
                } else
                    if (this.props.pollutantName === "o3") {
                        this.setState({
                            maxGreen: O3SpecificIndex[0].maxValue,
                            minRed: O3SpecificIndex[5].minValue,
                            maxRed: O3SpecificIndex[5].maxValue,
                            currentPollutant: 'o3'
                        })
                    } else
                        if (this.props.pollutantName === "so2") {
                            this.setState({
                                maxGreen: SO2SpecificIndex[0].maxValue,
                                minRed: SO2SpecificIndex[5].minValue,
                                maxRed: SO2SpecificIndex[5].maxValue,
                                currentPollutant: 'so2'
                            })
                        } else
                            if (this.props.pollutantName === "no2") {
                                this.setState({
                                    maxGreen: NO2SpecificIndex[0].maxValue,
                                    minRed: NO2SpecificIndex[5].minValue,
                                    maxRed: NO2SpecificIndex[5].maxValue,
                                    currentPollutant: 'no2'
                                })
                            } else
                                if (this.props.pollutantName === "cho2" || this.props.pollutantName === "co2" || this.props.pollutantName === "pm1") {
                                    this.setState({
                                        maxGreen: 0,
                                        minRed: 0,
                                        maxRed: 0,
                                        currentPollutant: this.props.pollutantName
                                    })
                                }
        }
    }

    render() {
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
                            from: this.state.minGreen,
                            to: this.state.maxGreen,
                            color: '#00FF00'
                        }, {
                            from: this.state.maxGreen,
                            to: this.state.minRed,
                            color: '#ffcc00'
                        }, {
                            from: this.state.minRed,
                            to: this.state.maxRed,
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
        return (
            <div className="app" >
                <div className="charts-row">
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