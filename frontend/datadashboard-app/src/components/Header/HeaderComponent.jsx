import React, { Component } from 'react';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import AuthenticationService from "../../api/AuthenticationService"
import { toast } from 'react-toastify';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(){
        AuthenticationService.logout();
        toast.success('You have been logged out!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
      
        })
    }

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
                    {!isLoggedIn && <Link className="nav-link" to="/login">Login</Link>}
                    {isLoggedIn && <Link className="nav-link" to="/settings">Settings</Link>}
                    {isLoggedIn && <Link className="nav-link" to="/login" onClick={this.onSubmit}>Logout</Link>}
                    {/* <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isLoggedIn && <li><Link className="nav-link" to="/login" onClick={this.onSubmit}>Logout</Link></li>}
                    </ul> */}
                </div>
            </div>
        )
    }
}
export default HeaderComponent