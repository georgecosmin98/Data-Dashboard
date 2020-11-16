import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DashboardComponent from './DashboardComponent'

class DashboardApp extends Component {

    render() {
        return (
            <div className="DashboardApp">
                <Router>
                    <Switch>
                        <Route path="/" exact component={DashboardComponent}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}
export default DashboardApp