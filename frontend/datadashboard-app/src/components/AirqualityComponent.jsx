import React, { Component } from 'react'
import { GiBrain } from "react-icons/gi";
import { RiLungsLine } from "react-icons/ri";
import { GiLiver } from "react-icons/gi";
import AirQualityService from '../api/AirQualityService';

class AirqualityComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValues:{
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
            longitude: ''
        }

        this.processDataForAirqualityDashboard = this.processDataForAirqualityDashboard.bind(this);
    }


    componentDidMount() {
    }

    componentDidUpdate(){
        if(this.props.latitude !== this.state.latitude && this.props.longitude !== this.state.longitude){
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
        for (var i = 0; i < data.length; i++) {
            console.log(previousValues.pm25)
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
        
        this.setState({currentValues: currentValues, previousValues: previousValues })
    }

    render() {
        const red = '#553300'
        return (
            <>
                <div className="airquality-dashboard">
                    <h1 className="airquality-dashboard-header"> Brasov</h1>
                    <p className="airquality-dashboard-street"><span className="text-primary">{this.props.address.slice(this.props.address.indexOf(" "), this.props.address.indexOf(','))}</span></p>
                    <div className="airquality-separator">
                    </div>
                    <p className="airquality-dashboard-text"> Air Quality Index </p>
                    <p className="airquality-dashboard-value"> 50 </p>
                    <p className="airquality-status">GOOD</p>
                    <div className="airquality-separator">
                    </div>
                    <p className="airquality-dashboard-text"> Health Effect</p>
                    <div className="health-effect">
                        <GiBrain className="health-effect-images" />
                        <RiLungsLine className="health-effect-images" />
                        <GiLiver className="health-effect-images" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="nestead-row">
                            <div className="col-md-12"> <h1 className="airquality-dashboard-pollutants-name">PM25</h1>
                                <p className="airquality-dashboard-value"> {this.state.currentValues.pm25} <span className="measurement-unit">ug/m3</span></p>
                                <p className="airquality-status">GOOD</p>
                            </div>
                            <div className="col-md-12"><h1 className="airquality-dashboard-pollutants-name">PM10</h1>
                                <p className="airquality-dashboard-value"> {this.state.currentValues.pm10} <span className="measurement-unit">ug/m3</span></p>
                                <p className="airquality-status">GOOD</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="nestead-row">
                            <div className="col-md-12"><h1 className="airquality-dashboard-pollutants-name">O3</h1>
                                <p className="airquality-dashboard-value"> {this.state.currentValues.o3} <span className="measurement-unit">ug/m3</span></p>
                                <p className="airquality-status">GOOD</p>
                            </div>
                            <div className="col-md-12" style={{
                                // background: red
                            }}><h1 className="airquality-dashboard-pollutants-name">SO2</h1>
                                <p className="airquality-dashboard-value"> {this.state.currentValues.so2} <span className="measurement-unit">ug/m3</span></p>
                                <p className="airquality-status">GOOD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default AirqualityComponent