import React, { Component } from 'react'
import SidebarRowComponent from './SidebarRowComponent'
import HomeIcon from '@material-ui/icons/Home';
import ErrorIcon from '@material-ui/icons/Error';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import {NavLink} from 'react-router-dom'
class SidebarComponent extends Component {
    render() {
        return (
            <div className="sidebar">
                <NavLink to="/" exact activeClassName="active"><SidebarRowComponent icon={HomeIcon} title="Home"></SidebarRowComponent> </NavLink>
                <NavLink to="/error" activeClassName="active"><SidebarRowComponent icon={ErrorIcon} title="ErrorPage"></SidebarRowComponent></NavLink>
                <NavLink to="/login" activeClassName="active"><SidebarRowComponent icon={ErrorIcon} title="LogIn"></SidebarRowComponent></NavLink>
                <NavLink to="/contact" activeClassName="active"><SidebarRowComponent icon={ContactMailIcon} title="Contact" /></NavLink>
            </div>
        )
    }
}
export default SidebarComponent;