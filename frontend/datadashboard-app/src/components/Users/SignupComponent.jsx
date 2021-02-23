import React, { Component } from 'react';
import fbLogo from '../../img/fb-logo.png';
import githubLogo from '../../img/github-logo.png';
import googleLogo from '../../img/google-logo.png';
import './Login.css' 
import { Formik, Form, Field, ErrorMessage } from 'formik';
class SignupComponent extends Component{
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
                    <h1 className="login-title">Sign up to <span className="text-primary">Harta Poluare Brasov</span></h1>
                    <div className="social-login">
                        <a className="btn-block social-btn google">
                            <img src={googleLogo} alt="Google" /> Sign up with Google</a>
                        <a className="btn-block social-btn facebook">
                            <img src={fbLogo} alt="Facebook" /> Sign up with Facebook</a>
                        <a className="btn-block social-btn github">
                            <img src={githubLogo} alt="Github" /> Sign up with Github</a>
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
                                    <Field className="input" type="text" name="name" placeholder="Name" />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="password" name="password" placeholder="Password" />
                                </fieldset>
                                <div className="btn-center">
                                    <button className="btn-login" type="submit">Sign Up</button>
                                </div>
                            </Form>
                        )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default SignupComponent