import React, { Component } from 'react';
import fbLogo from '../../img/fb-logo.png';
import githubLogo from '../../img/github-logo.png';
import googleLogo from '../../img/google-logo.png';
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from "../../api/AuthenticationService"
import UtilityService from "../../api/UtilityService"
class SignupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            name: '',
            password: '',
            showFailedMessage: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                  :event.target.value
            }
        )
    }

    onSubmit(values, { resetForm }) {
        UtilityService.verifyEmail(values.email)
            .then(response => {
                console.log(response)
                if (response.data === "OK") {
                    AuthenticationService.signUpWithLocalAccount(values.email, values.name, values.password)
                        .then(response => {
                            if (response.data === "OK") {
                                this.props.history.push('/login')
                                this.setState({ showFailedMessage: false })
                                resetForm()
                            }
                            else {
                                this.setState({ showFailedMessage: true })
                            }
                        }
                        )
                }
                else {
                    this.setState({ showFailedMessage: true })
                }
            })
            .catch(() => {
                this.setState({ showFailedMessage: true })
            })
    }

    validate(values) {
        let errors = {}

        if (values.password.length < 5) {
            errors.password = "Use 5 or more characters for password!"
        }

        if (!values.email) {
            errors.email = "Enter a Email address!"
        }
        if (!values.name) {
            errors.name = "Enter a name"
        }
        if (!values.password) {
            errors.password = "Enter a password"
        }
        return errors
    }

    render() {
        let { email, name, password } = this.state
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
                        initialValues={{ email, name, password }}
                        onSubmit={this.onSubmit}
                        validateOnChange={this.handleChange}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {(props) => (
                            <Form>
                                <ErrorMessage name="email" component="div"
                                    className="alert alert-warning" />
                                <ErrorMessage name="name" component="div"
                                    className="alert alert-warning" />
                                <ErrorMessage name="password" component="div"
                                    className="alert alert-warning" />
                                {this.state.showFailedMessage && <div className="errorSendAuthentication"> Please enter a valid email address!</div>}
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