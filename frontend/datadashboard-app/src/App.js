import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import './bootstrap.css'
import DashboardComponent from './components/DashboardComponent'
import ErrorComponent from './components/ErrorComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/Header/HeaderComponent'
import SidebarComponent from './components/SidebarComponent'
class App extends Component {

  componentWillMount(){
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
                <Route component={ErrorComponent} />
              </Switch>
            </div>
            <FooterComponent/>
          </>
        </Router>
      </div>
    );
  }
}
export default App;
