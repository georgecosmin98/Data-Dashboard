import React, { useEffect, useState, Component } from 'react'
import './Dashboard.css'
import BarChart from './charts/BarChart';
import * as d3 from "d3";
import BarChartComponent from './BarChartComponent';


class DashboardComponent extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <BarChartComponent className="Chart" />
                <BarChartComponent className="Chart" />
                <BarChartComponent className="Chart" />
                <BarChartComponent className="Chart" />
            </div>
        )
    }
}
export default DashboardComponent;