import React, { Component } from 'react'
import SidebarRowComponent from './SidebarRowComponent'
import HomeIcon from '@material-ui/icons/Home';
import ErrorIcon from '@material-ui/icons/Error';
import ContactMailIcon from '@material-ui/icons/ContactMail';

class SidebarComponent extends Component {
    render() {
        return (
            <div className="sidebar">
                <a href="/"><SidebarRowComponent selected icon={HomeIcon} title="Home"></SidebarRowComponent> </a>
                <a href="/error"> <SidebarRowComponent icon={ErrorIcon} title="ErrorPage"></SidebarRowComponent></a>
                <a href="/error"><SidebarRowComponent icon={ContactMailIcon} title="Contact" /></a>
            </div>
        )
    }
}
export default SidebarComponent;