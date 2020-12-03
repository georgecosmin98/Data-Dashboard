import React, { Component } from 'react'
import '../App.css'

class ErrorComponent extends Component {

    render() {
        return (
            <div className="ErrorComponent">
                <div className="NotFound">
                    <h2>Page not found</h2>
                    <h1>404</h1>
                    <h3>Sorry, we couldn't find the page you were looking for</h3>
                </div>
            </div>
        )
    }
}
export default ErrorComponent