import React, { Component } from 'react';
import AuthenticationService from '../api/AuthenticationService'
import GoogleHeatMapComponent from './GoogleHeatMapComponent';
import AirqualityComponent from './AirqualityComponent'
import TuneIcon from '@material-ui/icons/Tune';
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import Loader from "react-loader-spinner";

const options = [
    { value: 'pm1', label: 'PM1' },
    { value: 'pm10', label: 'PM10' },
    { value: 'pm25', label: 'PM25' },
    { value: 'no2', label: 'NO2' },
    { value: 'o3', label: 'O3' },
    { value: 'cho2', label: 'CHO2' },
    { value: 'co2', label: 'CO2' },
    { value: 'so2', label: 'SO2' },
];

class LocationDataComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pm25Data: [],
            address: '',
            measurement: '',
            pollutant: {
                value: 'pm25',
                label: 'PM25'
            }
            ,
            pollutantSelectorWindowOn: false,
            date: '',
            currentPollutantName: 'PM25',
            isEnable: true,
            latitude: '',
            longitude: ''
        }
    }


    render() {
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <div className="home">
                <TuneIcon className="pollutantSelector" onClick={this.tooglePollutantSelectorWindow}></TuneIcon>
                {isLoggedIn && <h1>Air Quality around your home</h1>}
                {this.state.pollutantSelectorWindowOn && <div className="pollutantSelectorWindow">
                    <h1>Control Panel</h1>
                    <p>Time Interval</p>
                    <DatePicker popperClassName="datepicker-userslocations"
                        className="datepicker-userslocations"
                        selected={this.state.date}
                        onChange={this.onChangeData}
                        on
                        placeholderText="Start Date"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="yyyy MM dd h:mm aa"
                    />

                    <p>Pollutant</p>
                    <Select
                        value={this.state.pollutant}
                        onChange={this.onChangePollutant}
                        options={options}
                    />
                    <div className="btn-center">
                        {this.state.isEnable && <button className="btn-controlPanel" onClick={this.applyChanges}>Apply</button>}
                        {!this.state.isEnable && <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />}
                    </div>
                </div>}
                <AirqualityComponent address={this.state.address} latitude={this.state.latitude} longitude={this.state.longitude}></AirqualityComponent>
                {isLoggedIn && <GoogleHeatMapComponent></GoogleHeatMapComponent>}
            </div>
        )
    }
}
export default LocationDataComponent;