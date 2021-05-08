import React, { Component } from 'react'
import { GiBrain } from "react-icons/gi";
import { RiLungsLine } from "react-icons/ri";
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import AirQualityService from '../api/AirQualityService';
import { CgArrowRight } from "react-icons/cg";
import { GiHeartOrgan } from "react-icons/gi";
import SecurityIcon from '@material-ui/icons/Security';
import { PM10SpecificIndex, PM25SpecificIndex, SO2SpecificIndex, NO2SpecificIndex, O3SpecificIndex } from '../Constants';

class AirqualityComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValues: {
                pm25: '',
                pm10: '',
                o3: '',
                so2: '',
                no2: ''
            },
            previousValues: {
                pm25: '',
                pm10: '',
                o3: '',
                so2: '',
                no2: ''
            },
            specificIndexPositionPM25: '',
            specificIndexPositionPM10: '',
            specificIndexPositionO3: '',
            specificIndexPositionSO2: '',
            specificIndexPositionNO2: '',
            latitude: '',
            longitude: '',
            specificIndex: '',
            qualifying: '',
            color: ''
        }

        this.processDataForAirqualityDashboard = this.processDataForAirqualityDashboard.bind(this);
        this.trendingLine = this.trendingLine.bind(this);
        this.specificIndex = this.specificIndex.bind(this);
        this.healthEffect = this.healthEffect.bind(this);
        this.brainEffect = this.brainEffect.bind(this);
        this.lungsEffect = this.lungsEffect.bind(this);
        this.heartEffect = this.heartEffect.bind(this);
        this.processAddress = this.processAddress.bind(this);
    }

    healthEffect(pm10, pm25, o3, so2, no2) {
        if (pm10 || pm25 || o3 || so2 || no2) {
            // console.log("HealthEffect")
            return <div className="health-effect">
                <GiBrain className="health-effect-images" style={{ color: this.brainEffect() }} />
                <RiLungsLine className="health-effect-images" style={{ color: this.lungsEffect() }} />
                <GiHeartOrgan className="health-effect-images" style={{ color: this.heartEffect() }} />
                {/* <GiLiver className="health-effect-images" style={{ color: 'green' }} /> */}
            </div>
        }
    }

    brainEffect() {
        var brainColor;
        var maxSpecificIndex = -1;
        if (isNaN(this.state.specificIndexPositionPM25.length)) {
            // console.log(this.state.specificIndexPositionPM25)
            if (maxSpecificIndex < this.state.specificIndexPositionPM25) {
                maxSpecificIndex = this.state.specificIndexPositionPM25
                brainColor = PM25SpecificIndex[this.state.specificIndexPositionPM25].color;
            }
        }
        else
            if (isNaN(this.state.specificIndexPositionPM10.length)) {
                if (maxSpecificIndex < this.state.specificIndexPositionPM10) {
                    maxSpecificIndex = this.state.specificIndexPositionPM10
                    brainColor = PM10SpecificIndex[this.state.specificIndexPositionPM10].color;
                }
            }
            else
                if (isNaN(this.state.specificIndexPositionSO2.length)) {
                    if (maxSpecificIndex < this.state.specificIndexPositionSO2) {
                        maxSpecificIndex = this.state.specificIndexPositionSO2
                        brainColor = SO2SpecificIndex[this.state.specificIndexPositionSO2].color;
                    }
                }
                else
                    if (maxSpecificIndex === -1)
                        brainColor = "black";
        return brainColor;

    }

    lungsEffect() {
        var lungsColor;
        var maxSpecificIndex = -1;
        if (isNaN(this.state.specificIndexPositionPM25.length)) {
            // console.log(this.state.specificIndexPositionPM25)
            if (maxSpecificIndex < this.state.specificIndexPositionPM25) {
                maxSpecificIndex = this.state.specificIndexPositionPM25
                lungsColor = PM25SpecificIndex[this.state.specificIndexPositionPM25].color;
            }
        }
        else
            if (isNaN(this.state.specificIndexPositionPM10.length)) {
                if (maxSpecificIndex < this.state.specificIndexPositionPM10) {
                    maxSpecificIndex = this.state.specificIndexPositionPM10
                    lungsColor = PM10SpecificIndex[this.state.specificIndexPositionPM10].color;
                }
            }
            else
                lungsColor = "black";

        return lungsColor;
    }

    heartEffect() {
        var heartColor;
        var maxSpecificIndex = -1;
        if (isNaN(this.state.specificIndexPositionPM25.length)) {
            // console.log(this.state.specificIndexPositionPM25)
            if (maxSpecificIndex < this.state.specificIndexPositionPM25) {
                maxSpecificIndex = this.state.specificIndexPositionPM25
                heartColor = PM25SpecificIndex[this.state.specificIndexPositionPM25].color;
            }
        }
        else
            if (isNaN(this.state.specificIndexPositionPM10.length)) {
                if (maxSpecificIndex < this.state.specificIndexPositionPM10) {
                    maxSpecificIndex = this.state.specificIndexPositionPM10
                    heartColor = PM10SpecificIndex[this.state.specificIndexPositionPM10].color;
                }
            }
            else
                if (isNaN(this.state.specificIndexPositionSO2.length)) {
                    if (maxSpecificIndex < this.state.specificIndexPositionSO2) {
                        maxSpecificIndex = this.state.specificIndexPositionSO2
                        heartColor = SO2SpecificIndex[this.state.specificIndexPositionSO2].color;
                    }
                }
                else
                    if (isNaN(this.state.specificIndexPositionO3.length)) {
                        if (maxSpecificIndex < this.state.specificIndexPositionO3) {
                            maxSpecificIndex = this.state.specificIndexPositionO3
                            heartColor = SO2SpecificIndex[this.state.specificIndexPositionO3].color;
                        }
                    }

        if (maxSpecificIndex === -1)
            heartColor = "black";
        return heartColor;

    }

    specificIndex(value, type) {
        //console.log("value: " + value + "  =>  " + type)
        if (value >= 0) {
            if (type === "pm25") {
                for (var i = 0; i < PM25SpecificIndex.length; i++) {
                    if (PM25SpecificIndex[i].minValue <= value && value <= PM25SpecificIndex[i].maxValue) {
                        if (PM25SpecificIndex[i].specificIndex > this.state.specificIndex)
                            this.setState({ specificIndex: PM25SpecificIndex[i].specificIndex, qualifying: PM25SpecificIndex[i].qualifying, color: PM25SpecificIndex[i].color, specificIndexPositionPM25: i });
                        return <p className="airquality-status" style={{ color: PM25SpecificIndex[i].color }} >{PM25SpecificIndex[i].qualifying}</p>
                    }
                }
            } else
                if (type === "pm10") {
                    for (var i = 0; i < PM10SpecificIndex.length; i++) {
                        if (PM10SpecificIndex[i].minValue <= value && value <= PM10SpecificIndex[i].maxValue) {
                            if (PM10SpecificIndex[i].specificIndex > this.state.specificIndex)
                                this.setState({ specificIndex: PM10SpecificIndex[i].specificIndex, qualifying: PM10SpecificIndex[i].qualifying, color: PM10SpecificIndex[i].color, specificIndexPositionPM10: i });
                            return <p className="airquality-status" style={{ color: PM10SpecificIndex[i].color }} >{PM10SpecificIndex[i].qualifying}</p>
                        }
                    }
                }
                else
                    if (type === "o3") {
                        for (var i = 0; i < O3SpecificIndex.length; i++) {
                            if (O3SpecificIndex[i].minValue <= value && value <= O3SpecificIndex[i].maxValue) {
                                if (O3SpecificIndex[i].specificIndex > this.state.specificIndex)
                                    this.setState({ specificIndex: O3SpecificIndex[i].specificIndex, qualifying: O3SpecificIndex[i].qualifying, color: O3SpecificIndex[i].color, specificIndexPositionO3: i });
                                return <p className="airquality-status" style={{ color: O3SpecificIndex[i].color }} >{O3SpecificIndex[i].qualifying}</p>
                            }
                        }
                    }
                    else
                        if (type === "so2") {
                            for (var i = 0; i < SO2SpecificIndex.length; i++) {
                                if (SO2SpecificIndex[i].minValue <= value && value <= SO2SpecificIndex[i].maxValue) {
                                    if (SO2SpecificIndex[i].specificIndex > this.state.specificIndex)
                                        this.setState({ specificIndex: SO2SpecificIndex[i].specificIndex, qualifying: SO2SpecificIndex[i].qualifying, color: SO2SpecificIndex[i].color, specificIndexPositionSO2: i });
                                    return <p className="airquality-status" style={{ color: SO2SpecificIndex[i].color }} >{SO2SpecificIndex[i].qualifying}</p>
                                }
                            }
                        }
                        else
                            if (type === "no2") {
                                for (var i = 0; i < NO2SpecificIndex.length; i++) {
                                    if (NO2SpecificIndex[i].minValue <= value && value <= NO2SpecificIndex[i].maxValue) {
                                        if (NO2SpecificIndex[i].specificIndex > this.state.specificIndex)
                                            this.setState({ specificIndex: NO2SpecificIndex[i].specificIndex, qualifying: NO2SpecificIndex[i].qualifying, color: NO2SpecificIndex[i].color, specificIndexPositionNO2: i });
                                        return <p className="airquality-status" style={{ color: NO2SpecificIndex[i].color }} >{NO2SpecificIndex[i].qualifying}</p>
                                    }
                                }
                            }
        }
    }

    trendingLine(currentValues, previousValues) {
        if (currentValues > previousValues)
            return <TrendingUpOutlinedIcon className="trend-line" style={{ color: 'red' }} />
        else
            if (currentValues === previousValues)
                return <CgArrowRight className="trend-line" style={{ color: '#ffcc00' }} />
            else
                return <TrendingDownOutlinedIcon className="trend-line" style={{ color: 'Green' }} />
    }

    componentDidMount() {
    }

    async componentDidUpdate() {
        var existPM10, existPM25, existO3, existSO2, existNO2 = false;
        if (this.props.latitude !== this.state.latitude && this.props.longitude !== this.state.longitude) {
            this.setState({
                latitude: this.props.latitude,
                longitude: this.props.longitude
            })
            await AirQualityService.retrievePollutionValuesForAirqualityDashboard('2021-04-19, 18:45', this.props.latitude, this.props.longitude).then(response => {
                // console.log(response.data)
                this.processDataForAirqualityDashboard(response.data)
                for (var i = 0; i < response.data.length; i++)
                    if (response.data[i].sensor === "pm10")
                        existPM10 = true;
                    else
                        if (response.data[i].sensor === "pm25")
                            existPM25 = true;
                        else
                            if (response.data[i].sensor === "o3")
                                existO3 = true;
                            else
                                if (response.data[i].sensor === "so2")
                                    existSO2 = true;
                                else
                                    if (response.data[i].sensor === "no2")
                                        existNO2 = true;

                if (existPM10)
                    console.log("Nu Pm10");
                else
                    AirQualityService.retrieveHomePollutionValues('2021-04-19, 18:45', "pm10", this.props.latitude, this.props.longitude).then(response => {
                        console.log(response.data)
                        this.processDataForAirqualityDashboard(response.data)
                        this.healthEffect(1)
                    })
                if (existPM25)
                    console.log("Nu pm25")
                else
                    AirQualityService.retrieveHomePollutionValues('2021-04-19, 18:45', "pm25", this.props.latitude, this.props.longitude).then(response => {
                        console.log(response.data)
                        this.processDataForAirqualityDashboard(response.data)
                        this.healthEffect(1)
                    })
                if (existO3)
                    console.log("Nu o3")
                else
                    AirQualityService.retrieveHomePollutionValues('2021-04-19, 18:45', "o3", this.props.latitude, this.props.longitude).then(response => {
                        console.log(response.data)
                        this.processDataForAirqualityDashboard(response.data)
                        this.healthEffect(1)
                    })
                if (existSO2)
                    console.log("Nu so2")
                else
                    AirQualityService.retrieveHomePollutionValues('2021-04-19, 18:45', "so2", this.props.latitude, this.props.longitude).then(response => {
                        console.log(response.data)
                        this.processDataForAirqualityDashboard(response.data)
                        this.healthEffect(1)
                    })
                if (existNO2)
                    console.log("Nu no2")
                else
                    AirQualityService.retrieveHomePollutionValues('2021-04-19, 18:45', "no2", this.props.latitude, this.props.longitude).then(response => {
                        // console.log(response.data)
                        this.processDataForAirqualityDashboard(response.data)
                        this.healthEffect(1)
                    })
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
        if (this.state.currentValues)
            currentValues = this.state.currentValues;
        if (this.state.previousValues)
            previousValues = this.state.previousValues;

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

    processAddress() {
        if (this.props.address.startsWith("Strada")) {
            var address = this.props.address.slice(this.props.address.indexOf(" "), this.props.address.indexOf(','))
            // console.log(address)
            if (address.length > 0) {
                return address
            }
        }
        else {
            return this.props.address.slice(0, this.props.address.indexOf(','))
        }
    }

    render() {
        return (
            <><div className="row">
                <div className="col-sm-4">
                    <div className="airquality-dashboard">
                        <h1 className="airquality-dashboard-header"> Brasov</h1>
                        <p className="airquality-dashboard-street"><span className="text-primary">{this.props.address && this.processAddress()}</span></p>
                        <div className="airquality-separator">
                        </div>
                        <p className="airquality-dashboard-text"> Specific Index </p>
                        <p className="airquality-dashboard-value"> {this.state.specificIndex} </p>
                        <p className="airquality-status" style={{ color: this.state.color }}>{this.state.qualifying}</p>
                        <div className="airquality-separator">
                        </div>
                        <p className="airquality-dashboard-text"> Health Effect</p>
                        {this.healthEffect(this.state.currentValues.pm10, this.state.currentValues.pm25, this.state.currentValues.o3, this.state.currentValues.so2, this.state.currentValues.no2)}

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="nestead-row">
                        <div className="col-md-12"> <h1 className="airquality-dashboard-pollutants-name">PM25</h1><SecurityIcon className="settings-airquality"></SecurityIcon>
                            {this.state.currentValues.pm25 && <p className="airquality-dashboard-value"> {this.state.currentValues.pm25} <span className="measurement-unit">ug/m3</span> {this.state.currentValues.pm25 && this.trendingLine(this.state.currentValues.pm25, this.state.previousValues.pm25)}</p>}
                            {/* <p className="airquality-status"></p> */}
                            {this.state.currentValues.pm25 && this.specificIndex(this.state.currentValues.pm25, "pm25")}
                        </div>
                        <div className="col-md-12"><h1 className="airquality-dashboard-pollutants-name">PM10</h1>
                            {this.state.currentValues.pm10 && <p className="airquality-dashboard-value"> {this.state.currentValues.pm10} <span className="measurement-unit">ug/m3</span> {this.state.currentValues.pm10 && this.trendingLine(this.state.currentValues.pm10, this.state.previousValues.pm10)}</p>}
                            {this.state.currentValues.pm10 && this.specificIndex(this.state.currentValues.pm10, "pm10")}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="nestead-row">
                        <div className="col-md-12"><h1 className="airquality-dashboard-pollutants-name">O3</h1>
                            {this.state.currentValues.o3 && <p className="airquality-dashboard-value"> {this.state.currentValues.o3} <span className="measurement-unit">ug/m3</span>{this.state.currentValues.o3 && this.trendingLine(this.state.currentValues.o3, this.state.previousValues.o3)}</p>}
                            {this.state.currentValues.o3 && this.specificIndex(this.state.currentValues.o3, "o3")}
                        </div>
                        <div className="col-md-12" style={{
                            // background: red
                        }}><h1 className="airquality-dashboard-pollutants-name">SO2</h1>
                            {this.state.currentValues.so2 && <p className="airquality-dashboard-value"> {this.state.currentValues.so2} <span className="measurement-unit">ug/m3</span>{this.state.currentValues.so2 && this.trendingLine(this.state.currentValues.so2, this.state.previousValues.so2)}</p>}
                            {this.state.currentValues.so2 && this.specificIndex(this.state.currentValues.so2, "so2")}
                        </div>
                    </div>
                </div>
                {this.state.currentValues.no2 && this.specificIndex(this.state.currentValues.no2, "no2")}
            </div>
            </>
        )
    }
}
export default AirqualityComponent