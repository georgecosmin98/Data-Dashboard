import { Avatar } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import AuthenticationService from "../../api/AuthenticationService"
import {useAuth} from "../../api/AuthenticationService"
export default function HeaderComponen(props) {

    const isLoggedIn = useAuth();
    return (
        <div className="header" >
            <div className="header-left">
                <Link to="./">
                    <img alt="" src={logo} className="header-logo" />
                </Link>
            </div>

            <div className="header-right">
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {isLoggedIn && <li><Link className="nav-link" to="/login" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>
            </div>
        </div>
    )
}