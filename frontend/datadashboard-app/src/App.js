import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DashboardComponent from './components/DashboardComponent'
import ErrorComponent from './components/ErrorComponent'
import HeaderComponent from './components/Header/HeaderComponent'
import SidebarComponent from './components/SidebarComponent'
import './App.css'
import './bootstrap.css'
class App extends Component {
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
                <Route component={ErrorComponent} />
              </Switch>
            </div>
          </>
        </Router>
      </div>
    );
  }
}
export default App;
