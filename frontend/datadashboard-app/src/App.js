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

class App extends Component {

  componentWillMount() {
    document.title = 'Harta Poluare Brasov'
  }

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
                <Route path="/login" exact component={LoginComponent}/>
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
export default App;
