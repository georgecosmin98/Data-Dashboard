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
        this.processSpecificIndex = this.processSpecificIndex.bind(this);
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
        console.log(this.state)
        if (isNaN(this.state.specificIndexPositionPM25.length)) {
            // console.log(this.state.specificIndexPositionPM25)
            if (maxSpecificIndex < this.state.specificIndexPositionPM25) {
                maxSpecificIndex = this.state.specificIndexPositionPM25
                brainColor = PM25SpecificIndex[this.state.specificIndexPositionPM25].color;
            }
        }
        if (isNaN(this.state.specificIndexPositionPM10.length)) {
            if (maxSpecificIndex < this.state.specificIndexPositionPM10) {
                maxSpecificIndex = this.state.specificIndexPositionPM10
                brainColor = PM10SpecificIndex[this.state.specificIndexPositionPM10].color;
            }
        }
        if (isNaN(this.state.specificIndexPositionSO2.length)) {
            if (maxSpecificIndex < this.state.specificIndexPositionSO2) {
                maxSpecificIndex = this.state.specificIndexPositionSO2
                brainColor = SO2SpecificIndex[this.state.specificIndexPositionSO2].color;
            }
        }

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
        if (isNaN(this.state.specificIndexPositionPM10.length)) {
            if (maxSpecificIndex < this.state.specificIndexPositionPM10) {
                maxSpecificIndex = this.state.specificIndexPositionPM10
                lungsColor = PM10SpecificIndex[this.state.specificIndexPositionPM10].color;
            }
        }
        if (maxSpecificIndex === -1)
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
        if (isNaN(this.state.specificIndexPositionPM10.length)) {
            if (maxSpecificIndex < this.state.specificIndexPositionPM10) {
                maxSpecificIndex = this.state.specificIndexPositionPM10
                heartColor = PM10SpecificIndex[this.state.specificIndexPositionPM10].color;
            }
        }
        if (isNaN(this.state.specificIndexPositionSO2.length)) {
            if (maxSpecificIndex < this.state.specificIndexPositionSO2) {
                maxSpecificIndex = this.state.specificIndexPositionSO2
                heartColor = SO2SpecificIndex[this.state.specificIndexPositionSO2].color;
            }
        }
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
        if (value >= 0) {
            if (type === "pm25") {
                return this.processSpecificIndex(PM25SpecificIndex, value, "specificIndexPositionPM25")
            } else
                if (type === "pm10") {
                    return this.processSpecificIndex(PM10SpecificIndex, value, "specificIndexPositionPM10")
                }
                else
                    if (type === "o3") {
                        return this.processSpecificIndex(O3SpecificIndex, value, "specificIndexPositionO3")
                    }
                    else
                        if (type === "so2") {
                            return this.processSpecificIndex(SO2SpecificIndex, value, "specificIndexPositionSO2")
                        }
                        else
                            if (type === "no2") {
                                return this.processSpecificIndex(NO2SpecificIndex, value, "specificIndexPositionNO2")
                            }
        }
    }

    processSpecificIndex(pollutants, value, pollutantName) {
        for (var i = 0; i < pollutants.length; i++) {
            if (pollutants[i].minValue <= value && value <= pollutants[i].maxValue) {
                if (pollutants[i].specificIndex > this.state.specificIndex) {

                    this.setState({ specificIndex: pollutants[i].specificIndex, qualifying: pollutants[i].qualifying, color: pollutants[i].color, [pollutantName]: i });
                } else if (this.state.[pollutantName] < i || this.state.[pollutantName] === "") {
                    this.setState({ [pollutantName]: i });
                }
                return <p className="airquality-status" style={{ color: pollutants[i].color }} >{pollutants[i].qualifying}</p>
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
        if (this.props.latitude !== this.state.latitude && this.props.longitude !== this.state.longitude) {
            this.setState({
                latitude: this.props.latitude,
                longitude: this.props.longitude
            })
            await AirQualityService.retrievePollutionValuesForAirqualityDashboard('2021-04-19, 18:45', this.props.latitude, this.props.longitude).then(response => {
                console.log(response.data)
                this.processDataForAirqualityDashboard(response.data)
            })
        }

    }

    processDataForAirqualityDashboard(data) {
        
       console.log(data)
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
            if (data[i].sensor === "pm25") {
                previousValues.pm25 = currentValues.pm25;
                currentValues.pm25 = data[i].value;
            }
            if (data[i].sensor === "pm10") {
                previousValues.pm10 = currentValues.pm10;
                currentValues.pm10 = data[i].value;
            }
            if (data[i].sensor === "o3") {
                previousValues.o3 = currentValues.o3;
                currentValues.o3 = data[i].value;
            }
            if (data[i].sensor === "so2") {
                previousValues.so2 = currentValues.so2;
                currentValues.so2 = data[i].value;
            }
        }
        console.log(currentValues)
        console.log(previousValues)
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