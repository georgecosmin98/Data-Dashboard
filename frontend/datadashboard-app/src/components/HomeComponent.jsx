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
import Loader from "react-loader-spinner";
import AirqualityComponent from './AirqualityComponent';
import { options, aggregationType } from "../Constants"
import { toast } from 'react-toastify';

class DashboardComponent extends Component {
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
        this.onChangePollutant = this.onChangePollutant.bind(this)
        this.onChangeAggregationType = this.onChangeAggregationType.bind(this)
        this.onChangeData = this.onChangeData.bind(this)
        this.applyChanges = this.applyChanges.bind(this)
        this.retrieveHomePollutionData = this.retrieveHomePollutionData.bind(this);
        this.tooglePollutantSelectorWindow = this.tooglePollutantSelectorWindow.bind(this);
    }

    onChangeData(date) {
        this.setState({ date: date })
    }

    onChangePollutant(values) {
        this.setState({ pollutant: { value: values.value, label: values.label } })
    }

    onChangeAggregationType(values) {
        this.setState({ aggregationType: { value: values.value, label: values.label } })
    }

    applyChanges() {
        this.setState({ isEnable: false })
        this.retrieveHomePollutionData(this.state.date, this.state.pollutant.value, this.state.address);
    }

    async componentDidMount() {
        await UserService.retrieveUserGeneralInfo().then(response => {
            this.setState({ address: response.data.address })
        })
        await UtilityService.addressToCoordinates(this.state.address).then(response => {
            if (response.data.features.length !== 0) {
                this.setState({ latitude: response.data.features[0].center[1] })
                this.setState({ longitude: response.data.features[0].center[0] })
            }
        })
        await this.retrieveHomePollutionData(new Date((new Date().getTime() - 604800000)).toString(), this.state.pollutant.value, this.state.address);
    }

    async retrieveHomePollutionData(date, sensor, address) {
        var latitude, longitude;

        await UtilityService.addressToCoordinates(address).then(response => {
            if (response.data.features.length !== 0) {
                latitude = response.data.features[0].center[1];
                longitude = response.data.features[0].center[0];
            }
        })
        if (this.state.aggregationType.value === "live")
            AirQualityService.retrieveHomePollutionValues(date, sensor, latitude, longitude).then(response => {
                if (response.data.length) {
                    var data = []
                    this.setState({ measurement: response.data[0].measurement })
                    this.setState({ currentPollutantName: response.data[0].sensor })
                    for (var i = 0; i < response.data.length; i++) {
                        data.push([response.data[i].timestamp + 10800000, response.data[i].value])
                    }
                    this.setState({ data: data })
                } else {
                    this.setState({ data: [] })
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
        else
            if (this.state.aggregationType.value === "max")
                AirQualityService.retrieveHomePollutionMaxDailyValues(date, sensor, latitude, longitude).then(response => {
                    if (response.data.length) {
                        var data = []
                        this.setState({ measurement: response.data[0].measurement })
                        this.setState({ currentPollutantName: response.data[0].sensor })
                        for (var i = 0; i < response.data.length; i++) {
                            data.push([response.data[i].timestamp, response.data[i].value])
                        }
                        this.setState({ data: data })
                    } else {
                        this.setState({ data: [] })
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
            else
                if (this.state.aggregationType.value === "avg")
                    AirQualityService.retrieveHomePollutionAvgDailyValues(date, sensor, latitude, longitude).then(response => {
                        if (response.data.length) {
                            var data = []
                            this.setState({ measurement: response.data[0].measurement })
                            this.setState({ currentPollutantName: response.data[0].sensor })
                            for (var i = 0; i < response.data.length; i++) {
                                data.push([response.data[i].timestamp, response.data[i].value])
                            }
                            this.setState({ data: data })
                        } else {
                            this.setState({ data: [] })
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
                else
                    if (this.state.aggregationType.value === "min")
                        AirQualityService.retrieveHomePollutionMinDailyValues(date, sensor, latitude, longitude).then(response => {
                            if (response.data.length) {
                                var data = []
                                this.setState({ measurement: response.data[0].measurement })
                                this.setState({ currentPollutantName: response.data[0].sensor })
                                for (var i = 0; i < response.data.length; i++) {
                                    data.push([response.data[i].timestamp, response.data[i].value])
                                }
                                this.setState({ data: data })
                            } else {
                                this.setState({ data: [] })
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
        // this.setState({ isEnable: true })
    }

    tooglePollutantSelectorWindow() {
        this.setState({ pollutantSelectorWindowOn: !this.state.pollutantSelectorWindowOn })
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
                    {/* <div className = "datepicker-location">
                    <DatePicker popperClassName="datepicker-homelocations"
                        className="datepicker-homelocations"
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
                    </div> */}
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
                    <p>Aggregation Type</p>
                    <Select
                        value={this.state.aggregationType}
                        onChange={this.onChangeAggregationType}
                        options={aggregationType}
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
                <h1>Istoric</h1>
                {isLoggedIn && <>
                    <LineChartComponent data={this.state.data} pollutantName={this.state.currentPollutantName}>
                    </LineChartComponent></>}
                <div className="flex-break"></div>
                {isLoggedIn && <BarChartComponent data={this.state.data} measurement={this.state.measurement} pollutantName={this.state.currentPollutantName}></BarChartComponent>}
            </div>
        )
    }
}
export default DashboardComponent;