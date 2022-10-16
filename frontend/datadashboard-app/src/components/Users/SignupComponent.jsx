import React, { Component } from 'react';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from "../../api/AuthenticationService"
import UtilityService from "../../api/UtilityService"
import { toast } from 'react-toastify';
import SocialButton from './SocialButton'
import Loader from "react-loader-spinner";

class SignupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            name: '',
            password: '',
            isEnable: true
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    onSubmit(values) {
        this.setState({ isEnable: false })
        UtilityService.verifyEmail(values.email)
            .then(response => {
                if (response.data === "OK") {
                    AuthenticationService.signUpWithLocalAccount(values.email, values.name, values.password)
                        .then(response => {
                            if (response.data === "OK") {
                                this.props.history.push('/login')
                                this.setState({ showFailedMessage: false })
                                toast.success('You have signed up successfully!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    draggable: true,
                                    progress: undefined,
                                })
                                this.setState({ isEnable: true })
                            }
                            else {
                                toast.error('Email already in use. Reset your password or login!', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    draggable: true,
                                    progress: undefined,
                                })
                                this.setState({ isEnable: true })
                                this.props.history.push('/login')
                            }
                        }
                        )
                }
                else {
                    toast.error('Please enter a valid email address!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    })
                    this.setState({ isEnable: true })
                }
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
            errors.name = "Enter your name"
        }
        if (!values.password) {
            errors.password = "Enter a password"
        }
        return errors
    }

    handleSocialLoginSuccess = (user) => {
        AuthenticationService.authenticateWithSocialAccount(user._profile.id,user._provider, user._token.accessToken).then(response => {
            if (response.status === 200) {
                AuthenticationService.registerSuccesfulLoginWithJwt(user._profile.email, response.data.token);
                toast.success('You have signed up successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                })
                this.props.history.push('/');
            }
            else {
                toast.error('An error occured. Please try again!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        })
    }


    handleSocialLoginFailure = (user) => {
        toast.error('An error occured. Please try again!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        })
    }

    render() {
        let { email, name, password } = this.state
        return (
            <div className="login">
                <div className="login-content">
                    <h1 className="login-title">Sign up to <span className="text-primary">Harta Poluare Brasov</span></h1>
                    <div className="social-login">
                        <SocialButton
                            className="btn-block social-btn google"
                            provider='google'
                            appId={process.env.REACT_APP_GOOGLE_CLIENTID}
                            onLoginSuccess={this.handleSocialLoginSuccess}
                            onLoginFailure={this.handleSocialLoginFailure}
                        >
                            <img src={googleLogo} alt="Google" /> Sign up with Google
                            </SocialButton>

                        <SocialButton
                            className="btn-block social-btn facebook"
                            provider='facebook'
                            appId={process.env.REACT_APP_FACEBOOK_CLIENTID}
                            onLoginSuccess={this.handleSocialLoginSuccess}
                            onLoginFailure={this.handleSocialLoginFailure}
                        >
                            <img src={fbLogo} alt="Facebook" /> Sign up with Facebook
                            </SocialButton>
                    </div>
                    <div className="login-separator">
                        <span className="login-separator-text">OR</span>
                    </div>
                    <Formik
                        initialValues={{ email, name, password }}
                        onSubmit={this.onSubmit}
                        validateOnChange={this.handleChange}
                        validateOnBlur={this.validate}
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
                                <fieldset className="form-group-login">
                                    <Field className="input" type="email" name="email" placeholder="Email Address" />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="text" name="name" placeholder="Name" />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="password" name="password" placeholder="Password" />
                                </fieldset>
                                <div className="btn-center">
                                    {this.state.isEnable && <button className="btn-login" type="submit">Sign Up</button>}
                                    {!this.state.isEnable && <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}
                                    />}
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