import React, { Component } from 'react'
import AuthenticationService from '../api/AuthenticationService'
import HeatmapChartComponent from './Charts/HeatmapChartComponent'
class CityComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            address: '',
            measurement: '',
            pollutant: {
                value: 'pm25',
                label: 'PM25'
            },
            aggregationType: {
                value: 'live',
                label: 'LIVE'
            },
            pollutantSelectorWindowOn: false,
            date: new Date().getTime() - ((new Date().getTime() / 1000) % 3600) * 1000 - 604800000,
            currentPollutantName: 'PM25',
            isEnable: true,
            latitude: '',
            longitude: '',
            retrievingData: false
        }
    }

    render() {
        // const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <div className="home">
                {/* <h1>Control Panel</h1>
                <p>Time Interval</p> */}
                <HeatmapChartComponent></HeatmapChartComponent>
            </div>
        )
    }
}

export default CityComponent;