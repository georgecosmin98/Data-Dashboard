import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { Avatar } from '@material-ui/core';

class HeaderComponent extends Component {

    render() {
        return (
            <div className="header">
                <div className="header-left">
                    <MenuIcon />
                    <img
                        className="header-logo"
                        src="http://seekvectorlogo.com/wp-content/uploads/2019/03/pollution-probe-vector-logo.png"
                        alt="" />
                </div>

                <div className="header-right">
                    <FeedbackIcon className="header-icon" />
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