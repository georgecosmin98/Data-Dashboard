import React, { Component } from 'react'
import SidebarRowComponent from './SidebarRowComponent'
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import BarChartIcon from '@material-ui/icons/BarChart';
import { NavLink } from 'react-router-dom'
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AuthenticationService from "../api/AuthenticationService"
import SecurityIcon from '@material-ui/icons/Security';
import {FaInfoCircle} from 'react-icons/fa'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { GENERAL_INFO_LINK_URL, CHANGE_PASSWORD_LINK_URL } from '../Constants'

class SidebarComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            settingsMenu: false
        }
    }

    componentDidMount() {
        this.updateStateOfSidebar();
    }

    componentDidUpdate() {
        this.updateStateOfSidebar();
    }

    updateStateOfSidebar() {
        if (window.location.pathname !== GENERAL_INFO_LINK_URL && window.location.pathname !== CHANGE_PASSWORD_LINK_URL
            && this.state.settingsMenu) {
            this.setState({ settingsMenu: false })
        }
        else if ((window.location.pathname === GENERAL_INFO_LINK_URL && !this.state.settingsMenu)
            || (window.location.pathname === CHANGE_PASSWORD_LINK_URL && !this.state.settingsMenu)) {
            this.setState({ settingsMenu: true });
        }
    }

    onClick() {
        this.setState({ settingsMenu: true });
    }

    render() {
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <div className="sidebar">
                {!this.state.settingsMenu && <NavLink to="/" exact activeClassName="active"><SidebarRowComponent icon={BarChartIcon} title="Dashboard"></SidebarRowComponent> </NavLink>}
                {isLoggedIn && !this.state.settingsMenu && <NavLink to="/home" activeClassName="active" onClick={this.onClick.bind(this)}><SidebarRowComponent icon={HomeWorkOutlinedIcon} title="Home Data" /></NavLink>}
                {isLoggedIn && !this.state.settingsMenu && <NavLink to="/location" activeClassName="active" onClick={this.onClick.bind(this)}><SidebarRowComponent icon={DirectionsWalkIcon} title="Walks Data" /></NavLink>}
                {isLoggedIn && !this.state.settingsMenu && <NavLink to={GENERAL_INFO_LINK_URL} activeClassName="active" onClick={this.onClick.bind(this)}><SidebarRowComponent icon={SettingsIcon} title="Settings" /></NavLink>}
                {!this.state.settingsMenu && <NavLink to="/info" exact activeClassName="active"><SidebarRowComponent icon={FaInfoCircle} title="Info"></SidebarRowComponent> </NavLink>}
                {!this.state.settingsMenu && <NavLink to="/contact" activeClassName="active" onClick={this.onClick.bind(this)}><SidebarRowComponent icon={ContactMailIcon} title="Contact" /></NavLink>}
                
                {this.state.settingsMenu && <NavLink to={GENERAL_INFO_LINK_URL} activeClassName="active" onClick={this.onClick.bind(this)}><SidebarRowComponent icon={AccountCircleIcon} title="General" /></NavLink>}
                {this.state.settingsMenu && <NavLink to={CHANGE_PASSWORD_LINK_URL} activeClassName="active" onClick={this.onClick.bind(this)}><SidebarRowComponent icon={SecurityIcon} title="Security" /></NavLink>}
                {this.state.settingsMenu && <NavLink to="/" exact activeClassName="active" onClick={this.onClick.bind(this)}><SidebarRowComponent icon={ArrowBackIcon} title="Back" /></NavLink>}
            </div>
        )
    }
}
export default SidebarComponent;