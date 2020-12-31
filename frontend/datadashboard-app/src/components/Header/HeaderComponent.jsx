import { Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
class HeaderComponent extends Component {


    render() {
        return (
            <div className="header">
                <div className="header-left">
                    <Link to="./">
                        <img alt="" src={logo} className="header-logo" />
                    </Link>
                </div>

                <div className="header-right">
                    <Avatar
                        alt="Ilinca George-Cosmin"
                        src="https://avatars2.githubusercontent.com/u/37107231?s=400&u=58e114524f52c7e73ce81e850339664101e7384a&v=4"
                    />
                </div>
            </div>
        )
    }
}
export default HeaderComponent