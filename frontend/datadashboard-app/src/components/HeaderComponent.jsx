import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class HeaderComponent extends Component {

    render() {
        return (
            <div className="HeaderComponent">
                <nav className="navbar navbar-expand-md">
                    <div><a href="http://www.google.ro" className="navbar-brand">DataDashboard</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/">Home</Link></li>
                        <li><Link className="nav-link" to="/error">ErrorPage</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default HeaderComponent