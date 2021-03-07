import { Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import AuthenticationService from "../../api/AuthenticationService"
import { BrowserRouter } from 'react-router-dom'
class HeaderComponent extends Component {


    render() {
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <div className="header">
                <div className="header-left">
                    <Link to="./">
                        <img alt="" src={logo} className="header-logo" />
                    </Link>
                </div>

                <div className="header-right">
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isLoggedIn && <li><BrowserRouter forceRefresh={true}><Link className="nav-link" to="/login">Login</Link></BrowserRouter></li>}
                        {isLoggedIn && <li><BrowserRouter forceRefresh={true}><Link className="nav-link" to="/login" onClick={AuthenticationService.logout}>Logout</Link></BrowserRouter></li>}
                    </ul>
                </div>
            </div>
        )
    }
}
export default HeaderComponent