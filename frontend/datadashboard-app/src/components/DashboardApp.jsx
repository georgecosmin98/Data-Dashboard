import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DashboardComponent from './DashboardComponent'
import ErrorComponent from './ErrorComponent'
import HeaderComponent from './HeaderComponent'


class DashboardApp extends Component {

    render() {
        return (
            <div className="DashboardApp">
                <Router>
                    <>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={DashboardComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                </>
                </Router>
            </div>
        )
    }
}
export default DashboardApp