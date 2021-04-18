import React, { Component } from 'react'
import { GiBrain } from "react-icons/gi";
import { RiLungsLine } from "react-icons/ri";
import { GiLiver } from "react-icons/gi";

class AirqualityComponent extends Component {

    render() {
        return (
            <div className="airquality-dashboard">
                <h1 className="airquality-dashboard-header"> <span className="text-primary"> Brasov </span></h1>
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
        )
    }
}
export default AirqualityComponent