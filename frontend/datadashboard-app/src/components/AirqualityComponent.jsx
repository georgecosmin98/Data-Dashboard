import React, { Component } from 'react'
import { GiBrain } from "react-icons/gi";
import { RiLungsLine } from "react-icons/ri";
import { GiLiver } from "react-icons/gi";
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import AirQualityService from '../api/AirQualityService';
import { CgArrowRight } from "react-icons/cg";
import { GiHeartOrgan } from "react-icons/gi";

const PM25SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    minValue: 0,
    maxValue: 10
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    minValue: 10,
    maxValue: 20
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    minValue: 20,
    maxValue: 25
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    minValue: 25,
    maxValue: 50
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    minValue: 50,
    maxValue: 75
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    minValue: 75,
    maxValue: 800
}]
const PM10SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    minValue: 0,
    maxValue: 20
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    minValue: 20,
    maxValue: 40
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    minValue: 40,
    maxValue: 50
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    minValue: 50,
    maxValue: 100
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    minValue: 100,
    maxValue: 150
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    minValue: 150,
    maxValue: 1500
}]
const O3SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    minValue: 0,
    maxValue: 50
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    minValue: 50,
    maxValue: 100
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    minValue: 100,
    maxValue: 130
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    minValue: 130,
    maxValue: 240
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    minValue: 240,
    maxValue: 380
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    minValue: 380,
    maxValue: 800
}]
const SO2SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    minValue: 0,
    maxValue: 100
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    minValue: 100,
    maxValue: 200
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    minValue: 200,
    maxValue: 350
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    minValue: 350,
    maxValue: 500
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    minValue: 500,
    maxValue: 750
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    minValue: 750,
    maxValue: 1250
}]
const NO2SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    minValue: 0,
    maxValue: 40
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    minValue: 40,
    maxValue: 90
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    minValue: 90,
    maxValue: 120
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    minValue: 120,
    maxValue: 230
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    minValue: 230,
    maxValue: 340
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    minValue: 340,
    maxValue: 1000
}]
class AirqualityComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValues: {
                pm25: '',
                pm10: '',
                o3: '',
                so2: ''
            },
            previousValues: {
                pm25: '',
                pm10: '',
                o3: '',
                so2: ''
            },
            latitude: '',
            longitude: '',
            specificIndex: '',
            qualifying: '',
            color: ''
        }

        this.processDataForAirqualityDashboard = this.processDataForAirqualityDashboard.bind(this);
        this.trendingLine = this.trendingLine.bind(this);
        this.specificIndex = this.specificIndex.bind(this);
    }

    specificIndex(value, type) {
        console.log("value: " + value + "  =>  " + type)
        if (value >= 0) {
            if (type === "pm25") {
                for (var i = 0; i < PM25SpecificIndex.length; i++) {
                    if (PM25SpecificIndex[i].minValue <= value && value <= PM25SpecificIndex[i].maxValue) {
                        if (PM25SpecificIndex[i].specificIndex > this.state.specificIndex)
                            this.setState({ specificIndex: PM25SpecificIndex[i].specificIndex, qualifying: PM25SpecificIndex[i].qualifying, color: PM25SpecificIndex[i].color });
                        return <p className="airquality-status" style={{ color: PM25SpecificIndex[i].color }} >{PM25SpecificIndex[i].qualifying}</p>
                    }
                }
            } else
                if (type === "pm10") {
                    for (var i = 0; i < PM10SpecificIndex.length; i++) {
                        if (PM10SpecificIndex[i].minValue <= value && value <= PM10SpecificIndex[i].maxValue) {
                            if (PM10SpecificIndex[i].specificIndex > this.state.specificIndex)
                                this.setState({ specificIndex: PM10SpecificIndex[i].specificIndex, qualifying: PM10SpecificIndex[i].qualifying, color: PM10SpecificIndex[i].color });
                            return <p className="airquality-status" style={{ color: PM10SpecificIndex[i].color }} >{PM10SpecificIndex[i].qualifying}</p>
                        }
                    }
                }
                else
                    if (type === "o3") {
                        for (var i = 0; i < O3SpecificIndex.length; i++) {
                            if (O3SpecificIndex[i].minValue <= value && value <= O3SpecificIndex[i].maxValue) {
                                if (O3SpecificIndex[i].specificIndex > this.state.specificIndex)
                                    this.setState({ specificIndex: O3SpecificIndex[i].specificIndex, qualifying: O3SpecificIndex[i].qualifying, color: O3SpecificIndex[i].color });
                                return <p className="airquality-status" style={{ color: O3SpecificIndex[i].color }} >{O3SpecificIndex[i].qualifying}</p>
                            }
                        }
                    }
                    else
                        if (type === "so2") {
                            for (var i = 0; i < SO2SpecificIndex.length; i++) {
                                if (SO2SpecificIndex[i].minValue <= value && value <= SO2SpecificIndex[i].maxValue) {
                                    if (SO2SpecificIndex[i].specificIndex > this.state.specificIndex)
                                        this.setState({ specificIndex: SO2SpecificIndex[i].specificIndex, qualifying: SO2SpecificIndex[i].qualifying, color: SO2SpecificIndex[i].color });
                                    return <p className="airquality-status" style={{ color: SO2SpecificIndex[i].color }} >{SO2SpecificIndex[i].qualifying}</p>
                                }
                            }
                        }
        }
    }

    trendingLine(currentValues, previousValues) {
        // console.log(currentValues)
        // console.log(previousValues)
        if (currentValues > previousValues)
            return <TrendingUpOutlinedIcon className="trend-line" style={{ color: 'red' }} />
        else
            if (currentValues === previousValues)
                return <CgArrowRight className="trend-line" style={{ color: '#ffcc00' }} />
            else
                return <TrendingDownOutlinedIcon className="trend-line" style={{ color: 'Green' }} />
    }

    componentDidMount() {
        this.specificIndex();
    }

    componentDidUpdate() {
        if (this.props.latitude !== this.state.latitude && this.props.longitude !== this.state.longitude) {
            AirQualityService.retrievePollutionValuesForAirqualityDashboard('2021-04-19, 18:45', this.props.latitude, this.props.longitude).then(response => {
                this.processDataForAirqualityDashboard(response.data)
            })
            this.setState({
                latitude: this.props.latitude,
                longitude: this.props.longitude
            })
        }
    }

    processDataForAirqualityDashboard(data) {
        // console.log(data)
        var currentValues = {
            pm25: '',
            pm10: '',
            o3: '',
            so2: ''
        }
        var previousValues = {
            pm25: '',
            pm10: '',
            o3: '',
            so2: ''
        }
        for (var i = 0; i < data.length; i++) {
            // console.log(previousValues.pm25)
            if (data[i].sensor === "pm25" && !currentValues.pm25) {
                currentValues.pm25 = previousValues.pm25;
                previousValues.pm25 = data[i].value;
            }
            if (data[i].sensor === "pm10" && !currentValues.pm10) {
                currentValues.pm10 = previousValues.pm10;
                previousValues.pm10 = data[i].value;
            }
            if (data[i].sensor === "o3" && !currentValues.o3) {
                currentValues.o3 = previousValues.o3;
                previousValues.o3 = data[i].value;
            }
            if (data[i].sensor === "so2" && !currentValues.so2) {
                currentValues.so2 = previousValues.so2;
                previousValues.so2 = data[i].value;
            }
        }

        this.setState({ currentValues: currentValues, previousValues: previousValues })
    }

    render() {
        const red = '#553300'
        return (
            <><div className="row">
                <div className="col-sm-4">
                    <div className="airquality-dashboard">
                        <h1 className="airquality-dashboard-header"> Brasov</h1>
                        <p className="airquality-dashboard-street"><span className="text-primary">{this.props.address && this.props.address.slice(this.props.address.indexOf(" "), this.props.address.indexOf(','))}</span></p>
                        <div className="airquality-separator">
                        </div>
                        <p className="airquality-dashboard-text"> Specific Index </p>
                        <p className="airquality-dashboard-value"> {this.state.specificIndex} </p>
                        <p className="airquality-status" style={{ color: this.state.color }}>{this.state.qualifying}</p>
                        <div className="airquality-separator">
                        </div>
                        <p className="airquality-dashboard-text"> Health Effect</p>
                        <div className="health-effect">
                            <GiBrain className="health-effect-images" />
                            <RiLungsLine className="health-effect-images" />
                            <GiHeartOrgan className="health-effect-images"></GiHeartOrgan>
                            <GiLiver className="health-effect-images" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="nestead-row">
                        <div className="col-md-12"> <h1 className="airquality-dashboard-pollutants-name">PM25</h1>
                            <p className="airquality-dashboard-value"> {this.state.currentValues.pm25} <span className="measurement-unit">ug/m3</span> {this.state.currentValues.pm25 && this.trendingLine(this.state.currentValues.pm25, this.state.previousValues.pm25)}</p>
                            {/* <p className="airquality-status"></p> */}
                            {this.state.currentValues.pm25 && this.specificIndex(this.state.currentValues.pm25, "pm25")}
                        </div>
                        <div className="col-md-12"><h1 className="airquality-dashboard-pollutants-name">PM10</h1>
                            <p className="airquality-dashboard-value"> {this.state.currentValues.pm10} <span className="measurement-unit">ug/m3</span> {this.state.currentValues.pm10 && this.trendingLine(this.state.currentValues.pm10, this.state.previousValues.pm10)}</p>
                            {this.state.currentValues.pm10 && this.specificIndex(this.state.currentValues.pm10, "pm10")}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="nestead-row">
                        <div className="col-md-12"><h1 className="airquality-dashboard-pollutants-name">O3</h1>
                            <p className="airquality-dashboard-value"> {this.state.currentValues.o3} <span className="measurement-unit">ug/m3</span>{this.state.currentValues.o3 && this.trendingLine(this.state.currentValues.o3, this.state.previousValues.o3)}</p>
                            {this.state.currentValues.o3 && this.specificIndex(this.state.currentValues.o3, "o3")}
                        </div>
                        <div className="col-md-12" style={{
                            // background: red
                        }}><h1 className="airquality-dashboard-pollutants-name">SO2</h1>
                            <p className="airquality-dashboard-value"> {this.state.currentValues.so2} <span className="measurement-unit">ug/m3</span>{this.state.currentValues.so2 && this.trendingLine(this.state.currentValues.so2, this.state.previousValues.so2)}</p>
                            {this.state.currentValues.so2 && this.specificIndex(this.state.currentValues.so2, "so2")}
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-4">
                    <div className="nestead-row">
                        <div className="col-md-12"><h1 className="airquality-dashboard-pollutants-name">O3</h1>
                            <p className="airquality-dashboard-value"> {this.state.currentValues.o3} <span className="measurement-unit">ug/m3</span>{this.state.currentValues.o3 && this.trendingLine(this.state.currentValues.o3, this.state.previousValues.o3)}</p>
                            {this.state.currentValues.o3 && this.specificIndex(this.state.currentValues.o3, "o3")}
                        </div>
                        <div className="col-md-12" style={{
                            // background: red
                        }}><h1 className="airquality-dashboard-pollutants-name">SO2</h1>
                            <p className="airquality-dashboard-value"> {this.state.currentValues.so2} <span className="measurement-unit">ug/m3</span>{this.state.currentValues.so2 && this.trendingLine(this.state.currentValues.so2, this.state.previousValues.so2)}</p>
                            {this.state.currentValues.so2 && this.specificIndex(this.state.currentValues.so2, "so2")}
                        </div>
                    </div>
                </div> */}
            </div>
            </>
        )
    }
}
export default AirqualityComponent