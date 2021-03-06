import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './bootstrap.css'
import './App.css'
import DashboardComponent from './components/DashboardComponent'
import ErrorComponent from './components/ErrorComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/Header/HeaderComponent'
import SidebarComponent from './components/SidebarComponent'
import ContactComponent from './components/ContactComponent'
import LoginComponent from './components/Users/LoginComponent'
import SignupComponent from './components/Users/SignupComponent'
import ResetPasswordComponent from './components/Users/ResetPasswordComponent'
import AuthenticationService from './api/AuthenticationService'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswordComponent from './components/Users/ForgotPasswordComponent'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import SettingsComponent from './components/SettingsComponent'
import HomeComponent from './components/HomeComponent'
import LocationDataComponent from './components/LocationDataComponent'
import InfoComponent from './components/InfoComponent'
import CityComponent from './components/CityComponent'
class App extends Component {

  componentWillMount() {
    document.title = 'Harta Poluare Brasov'
    AuthenticationService.axiosInterceptors();
  }
  render() {
    return (
      <>
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
                  <Route path="/forgotpassword" exact component={ForgotPasswordComponent} />
                  <Route path="/resetpassword/:token" exact component={ResetPasswordComponent} />
                  <Route path="/signup" exact component={SignupComponent} />
                  <Route path="/city" exact component={CityComponent}/>
                  <Route path="/info" exact component={InfoComponent} />
                  <AuthenticatedRoute path="/settings/:category" component={SettingsComponent}></AuthenticatedRoute>
                  <AuthenticatedRoute path="/home" component={HomeComponent}></AuthenticatedRoute>
                  <AuthenticatedRoute path="/location" component={LocationDataComponent}></AuthenticatedRoute>
                  <Route component={ErrorComponent} />
                </Switch>
              </div>
              <FooterComponent />
            </>
          </Router>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}
export default App;
