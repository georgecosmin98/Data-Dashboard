import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { PM10SpecificIndex, PM25SpecificIndex, SO2SpecificIndex, NO2SpecificIndex, O3SpecificIndex } from '../../Constants';

class LineChartComponent extends Component {
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
                                currentPollutant: 'so2' })
                        } else
                            if (this.props.pollutantName === "no2") {
                                this.setState({ 
                                    maxGreen: NO2SpecificIndex[0].maxValue, 
                                    minRed: NO2SpecificIndex[5].minValue,
                                    maxRed: NO2SpecificIndex[5].maxValue,
                                    currentPollutant: 'no2' })
                            } else
                                if (this.props.pollutantName === "cho2" || this.props.pollutantName === "co2" || this.props.pollutantName === "pm1") {
                                    this.setState({ 
                                        maxGreen: 0,
                                        minRed: 0,
                                        maxRed: 0,
                                        currentPollutant: this.props.pollutantName })
                                }
        }
    }

    render() {
        var options = {
            series: [{
                name: 'Values',
                data: this.props.data
            }],
            annotations: {
                yaxis: [
                    {
                        y: this.state.minRed,
                        y2: this.state.maxRed,
                        borderColor: '#000',
                        fillColor: '#FF0000',
                    }, {
                        y: this.state.minGreen,
                        y2: this.state.maxGreen,
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
        // console.log(this.props.data)
        return (
            <div className="app">
                <div className="charts-row">
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