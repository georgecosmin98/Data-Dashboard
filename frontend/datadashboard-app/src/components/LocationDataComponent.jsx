import React, { Component } from 'react';
import AuthenticationService from '../api/AuthenticationService'
import GoogleHeatMapComponent from './GoogleHeatMapComponent';
import AirqualityComponent from './AirqualityComponent'
import TuneIcon from '@material-ui/icons/Tune';
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import Loader from "react-loader-spinner";
import UserLocationService from '../api/UserLocationService';
import LineChartComponent from './Charts/LineChartComponent';
import BarChartComponent from './Charts/BarChartComponent';
import UtilityService from '../api/UtilityService';
import UserService from '../api/UserService';
import AirQualityService from '../api/AirQualityService';
import { toast } from 'react-toastify';

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
            pollutionData: [],
            heatmapPoints: [
                { lat: '', lng: '' }
            ],
            address: '',
            measurement: '',
            pollutant: {
                value: 'pm25',
                label: 'PM25'
            }
            ,
            pollutantSelectorWindowOn: false,
            date: new Date().getTime() - ((new Date().getTime() / 1000) % 3600) * 1000,    //7 zile in urma
            currentPollutantName: 'PM25',
            isEnable: true,
            latitude: '',
            longitude: ''
        }

        this.tooglePollutantSelectorWindow = this.tooglePollutantSelectorWindow.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.onChangePollutant = this.onChangePollutant.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
        this.retrieveUserLocationPollutionData = this.retrieveUserLocationPollutionData.bind(this);
    }

    async componentDidMount() {
        await this.retrieveUserLocationPollutionData(new Date((new Date().getTime())).toString(), this.state.pollutant.value);
        await this.retrieveLocationData();
    }

    tooglePollutantSelectorWindow() {
        this.setState({ pollutantSelectorWindowOn: !this.state.pollutantSelectorWindowOn })
    }

    onChangeData(date) {
        this.setState({ date: date })
    }

    onChangePollutant(values) {
        this.setState({ pollutant: { value: values.value, label: values.label } })
    }

    applyChanges() {
        this.retrieveLocationData();
        this.retrieveUserLocationPollutionData(this.state.date,this.state.pollutant.value,this.state.address)
    }

    retrieveLocationData() {
        UserLocationService.retriveUserLocationAfter(this.state.date)
            .then(
                response => {
                    var data = []
                    for (var i = 0; i < response.data.length; i++) {
                        data.push({ lat: response.data[i].latitude, lng: response.data[i].longitude })
                    }
                    this.setState({ heatmapPoints: data })
                }
            )
    }

    async retrieveUserLocationPollutionData(date, sensor) {
        AirQualityService.retrievePollutionForUserLocations(sensor,date).then(response => {
                if (response.data.length) {
                    var data = []
                    this.setState({ measurement: response.data[0].measurement })
                    this.setState({ currentPollutantName: response.data[0].sensor })
                    for (var i = 0; i < response.data.length; i++) {
                        data.push([response.data[i].timestamp + 10800000, response.data[i].value])
                    }
                    this.setState({ pollutionData: data })
                } else {
                    this.setState({ pollutionData: [] })
                }
                this.setState({ isEnable: true })
            }).catch(response => {
                toast.error('An error occured. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                }
                )
                this.setState({ isEnable: true })
            })
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
                    <DatePicker popperClassName="datepicker-withoutTime"
                        className="datepicker-withoutTime"
                        selected={this.state.date}
                        onChange={this.onChangeData}
                        on
                        placeholderText="Start Date"
                        dateFormat="yyyy/MM/dd"
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
                {/* <AirqualityComponent address={this.state.address} latitude={this.state.latitude} longitude={this.state.longitude}></AirqualityComponent> */}
                {isLoggedIn && <>
                    <LineChartComponent data={this.state.pollutionData} pollutantName={this.state.currentPollutantName}>
                    </LineChartComponent></>}
                <div className="flex-break"></div>
                {isLoggedIn && <BarChartComponent data={this.state.pollutionData} measurement={this.state.measurement} pollutantName={this.state.currentPollutantName}></BarChartComponent>}

                {isLoggedIn && <GoogleHeatMapComponent heatmapPoints={this.state.heatmapPoints}></GoogleHeatMapComponent>}
            </div>
        )
    }
}
export default LocationDataComponent;