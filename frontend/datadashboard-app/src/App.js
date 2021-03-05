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
import AppComponent from './components/AppComponent'

class App extends Component {

  componentWillMount() {
    document.title = 'Harta Poluare Brasov'
  }

  render() {
    return (
      <AppComponent></AppComponent>
    )}
}
export default App;
