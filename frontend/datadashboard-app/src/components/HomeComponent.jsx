import React, { Component } from 'react';
import AuthenticationService from '../api/AuthenticationService'
import LineChartComponent from './Charts/LineChartComponent';
import BarChartComponent from './Charts/BarChartComponent';
import UserService from '../api/UserService';
import AirQualityService from '../api/AirQualityService';
import UtilityService from '../api/UtilityService';
import TuneIcon from '@material-ui/icons/Tune';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const options = [
    { value: 'pm1', label: 'PM1' },
    { value: 'pm10', label: 'PM10' },
    { value: 'pm25', label: 'PM25' },
  ];

class DashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pm25Data: [1, 1],
            address: '',
            measurement: '',
            pollutantName: '',
            pollutantSelectorWindowOn: false,
            date: ''
        }
        this.onChange = this.onChange.bind(this)
        this.retrieveHomePollutionData = this.retrieveHomePollutionData.bind(this);
        this.tooglePollutantSelectorWindow = this.tooglePollutantSelectorWindow.bind(this);
    }

    onChange(date) {
        //console.log(date)
        this.setState({ date: date })
    }

    async componentDidMount() {
        await UserService.retrieveUserGeneralInfo().then(response => {
            //console.log(response.data)
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
        AirQualityService.retrieveHomePollutionValues(date, sensor, latitude, longitude).then(response => {
            console.log(response)
            console.log(response.data.length)
            if (response.data.length) {
                var data = []
                this.setState({ measurement: response.data[0].measurement })
                this.setState({ pollutantName: response.data[0].sensor })

                for (var i = 0; i < response.data.length; i++) {
                    data.push([Date.parse(response.data[i].timestamp) + 10800000, response.data[i].value])
                }
                this.setState({ pm25Data: data })
            }
        })
    }

    tooglePollutantSelectorWindow() {
        this.setState({ pollutantSelectorWindowOn: !this.state.pollutantSelectorWindowOn })
    }

    render() {
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <div className="home">
                <TuneIcon className="pollutantSelector" onClick={this.tooglePollutantSelectorWindow}></TuneIcon>
                {isLoggedIn && <h1>Pollution Data for <span className="text-primary">{this.state.address}</span></h1>}
                {!this.state.pollutantSelectorWindowOn && <div className="pollutantSelectorWindow">
                    <h1>Control Panel</h1>
                    <p>Time Interval</p>
                    <DatePicker popperClassName="datepicker-userslocations"
                        className="datepicker-userslocations"
                        selected={this.state.date}
                        onChange={this.onChange}
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
                        value={options[1]}
                        onChange={this.handleChange}
                        options={options}
                    />
                </div>}
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