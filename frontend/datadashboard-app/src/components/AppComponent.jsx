import React, { Component } from 'react'
import DashboardComponent from './DashboardComponent'
import ErrorComponent from './ErrorComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './Header/HeaderComponent'
import SidebarComponent from './SidebarComponent'
import ContactComponent from './ContactComponent'
import LoginComponent from './Users/LoginComponent'
import SignupComponent from './Users/SignupComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class AppComponent extends Component {

    render() {
        return (
            <div className="DashboardApp">
                <Router>
                    <>
                        <HeaderComponent />
                        <div className="app-page">
                            <SidebarComponent />
                            <Switch>
                                <Route path="/" exact component={DashboardComponent} />
                                <Route path="/contact" exact component={ContactComponent} />
                                <Route path="/login" exact component={LoginComponent} />
                                <Route path="/signup" exact component={SignupComponent} />
                                <Route component={ErrorComponent} />
                            </Switch>
                        </div>
                        <FooterComponent />
                    </>
                </Router>
            </div>
        );
    }
}
export default AppComponent