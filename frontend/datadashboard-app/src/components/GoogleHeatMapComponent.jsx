import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import UserLocationService from '../api/UserLocationService'
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class GoogleHeatMapComponent extends Component {

    static defaultProps = {
        center: {
            lat: 45.65,
            lng: 25.6
        },
        zoom: 13
    }

    constructor(props) {
        super(props)
        this.state = {
            showHeatMap: true,
            heatmapPoints: [
                { lat: '', lng: '' }
            ],
            userLocations:[
                {lat: '', lng: '', timestamp: ''}
            ],
            value: ''
        }
        this.onChange = this.onChange.bind(this)
        this.updateUserLocationsHeatmapValues = this.updateUserLocationsHeatmapValues.bind(this)
    }

    onChange(date) {
        this.setState({ value: date })
        this.updateUserLocationsHeatmapValues(Moment(date).format('YYYY-MM-DD, HH:mm'))
    }

    componentDidMount() {
        this.updateUserLocationsHeatmapValues("2021-01-01, 00:00")
    }

    componentDidUpdate(){
        if(this.state.heatmapPoints !== this.props.heatmapPoints)
            this.setState({heatmapPoints: this.props.heatmapPoints})
        
    }

    updateUserLocationsHeatmapValues(afterDate) {
        UserLocationService.retriveUserLocationAfter(afterDate)
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

    toggleHeatMap() {
        console.log("Toogle heatmap")
        console.log(this._googleMap.map_.zoom)
        this.setState({
            heatmapVisible: !this.state.heatmapVisible
        }, () => {
            if (this._googleMap !== undefined) {
                if (this.state.heatmapVisible)
                    this._googleMap.heatmap.setMap(this._googleMap.map_)
                else
                    this._googleMap.heatmap.setMap(null)
            }
        })
    }

    adaptPointRadius() {
        // console.log("Zoom")
        // console.log(this._googleMap.map_.zoom)
        // console.log(this._googleMap.heatmap)
        // // if (this._googleMap.map_.zoom <= 13)
        // //     this._googleMap.heatmap.radius = ((2 / 3) * (this._googleMap.map_.zoom)) / 2
        // // else
        // //     this._googleMap.heatmap.radius = ((4 / 3) * (this._googleMap.map_.zoom))/ 2
        // console.log(this._googleMap.heatmap)
    }
    render() {

        const apiKey = { key: 'AIzaSyBYFUuJFiyJr4jNuxdPNo1Su4Qp_UL19KI' }
        const userLocationsData = {
            positions: this.state.heatmapPoints,
            options: {
                radius: 10,
                opacity: 0.7
            }
        }


        return (
            <div className="heatMap">
                <GoogleMapReact
                    ref={(el) => this._googleMap = el}
                    bootstrapURLKeys={apiKey}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    heatmapLibrary={true}
                    heatmap={userLocationsData}
                    onZoomAnimationStart={this.adaptPointRadius.bind(this)}
                >
                </GoogleMapReact>
                {/* <button className="toggleButton" onClick={this.toggleHeatMap.bind(this)}>Toggle heatmap</button> */}
            </div>
        )
    }
}
export default GoogleHeatMapComponent;