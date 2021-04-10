import React, { Component } from 'react';
import AuthenticationService from '../api/AuthenticationService'
import LineChartComponent from './Charts/LineChartComponent';
import BarChartComponent from './Charts/BarChartComponent';
import UserService from '../api/UserService';
import AirQualityService from '../api/AirQualityService';
import UtilityService from '../api/UtilityService';

class DashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pm25Data: [1, 1],
            address: '',
            measurement: '',
            pollutantName: ''
        }
        this.retrieveHomePollutionData = this.retrieveHomePollutionData.bind(this);
    }

    async componentDidMount() {
        await UserService.retrieveUserGeneralInfo().then(response => {
            console.log(response.data)
            this.setState({ address: response.data.address })
        })
        this.retrieveHomePollutionData(0, 0, this.state.address);
    }

    async retrieveHomePollutionData(date, sensor, address) {
        var latitude, longitude;

        await UtilityService.addressToCoordinates(address).then(response => {
            console.log(response.data.features[0].place_name)
            latitude = response.data.features[0].center[1];
            longitude = response.data.features[0].center[0];
        })
        console.log(latitude)
        console.log(longitude)
        AirQualityService.retrieveHomePollutionValues(date, sensor, latitude, longitude).then(response => {
            console.log(response)
            var data = []
            this.setState({ measurement: response.data[0].measurement })
            this.setState({ pollutantName: response.data[0].sensor })

            for (var i = 0; i < response.data.length; i++) {
                data.push([Date.parse(response.data[i].timestamp), response.data[i].value])
            }
            this.setState({ pm25Data: data })

        })
    }

    render() {
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <div className="home">
                {isLoggedIn && <h1>Pollution Data for <span className="text-primary">{this.state.address}</span></h1>}
                <div className="flex-break"></div>
                {isLoggedIn && <>
                    {/* <div className="pollutantSelector">
                        <button className="pollutantSelectorButton">PM1</button>
                        <button className="pollutantSelectorButton">PM10</button>
                        <button className="pollutantSelectorButton">PM25</button>
                        <button className="pollutantSelectorButton">O3</button>
                        <button className="pollutantSelectorButton">CHO2</button>
                        <button className="pollutantSelectorButton">CO2</button>
                        <button className="pollutantSelectorButton">NO2</button>
                        <button className="pollutantSelectorButton">SO2</button>
                    </div> */}
                    <LineChartComponent data={this.state.pm25Data}>
                    </LineChartComponent></>}
                <div className="flex-break"></div>
                {isLoggedIn && <BarChartComponent data={this.state.pm25Data} measurement={this.state.measurement} pollutantName={this.state.pollutantName}></BarChartComponent>}
            </div>
        )
    }
}
export default DashboardComponent;