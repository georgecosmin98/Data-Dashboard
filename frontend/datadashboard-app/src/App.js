import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
          <>
            <Router>
              <HeaderComponent />
              <div className="app-page">
                <SidebarComponent />
                <Routes>
                  <Route path="/" element={<DashboardComponent />} />
                  <Route path="/contact" element={<ContactComponent />} />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/forgotpassword" element={<ForgotPasswordComponent />} />
                  <Route path="/resetpassword/:token" element={<ResetPasswordComponent />} />
                  <Route path="/signup" element={<SignupComponent />} />
                  <Route path="/city" element={<CityComponent />} />
                  <Route path="/info" element={<InfoComponent />} />
                  <Route path="/settings/:category" element={<AuthenticatedRoute><SettingsComponent /></AuthenticatedRoute>} />
                  <Route path="/home" element={<HomeComponent />} />
                  <Route path="/location" element={<LocationDataComponent />} />
                  <Route path="*" element={<ErrorComponent />} />
                </Routes>
              </div>
              <FooterComponent />
            </Router>
          </>
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
