import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Component } from 'react';
import fbLogo from '../../img/fb-logo.png';
import githubLogo from '../../img/github-logo.png';
import googleLogo from '../../img/google-logo.png';
import './Login.css' 
class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }


    render() {
        let { email, password } = this.state
        return (
            <div className="login">
                <div className="login-content">
                    <h1 className="login-title">Login to <span className="text-primary">Harta Poluare Brasov</span></h1>
                    <div className="social-login">
                        <a className="btn-block social-btn google">
                            <img src={googleLogo} alt="Google" /> Log in with Google</a>
                        <a className="btn-block social-btn facebook">
                            <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
                        <a className="btn-block social-btn github">
                            <img src={githubLogo} alt="Github" /> Log in with Github</a>
                    </div>
                    <div className="login-separator">
                        <span className="login-separator-text">OR</span>
                    </div>
                    <Formik
                        initialValues={{ email, password }}
                        // onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                    // validate={this.validate}
                    >
                        {(props) => (
                            <Form>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="text" name="email" placeholder="Email Address" />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="password" name="password" placeholder="Password" />
                                </fieldset>
                                <div className="btn-center">
                                    <button className="btn-login" type="submit">Login</button>
                                </div>
                            </Form>
                        )
                        }
                    </Formik>
                    <span className="signup-link">New user? Sign up!</span>
                </div>
            </div>
        )
    }
}
export default LoginComponent