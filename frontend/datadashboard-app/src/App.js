import logo from './logo.svg';
import React, { Component } from 'react'
import DashboardApp from './components/DashboardApp';
import './App.css';
import './bootstrap.css'
class App extends Component {
  render() {
    return (
      <div className="App" >
        <DashboardApp />
      </div>
    );
  }
}
export default App;
