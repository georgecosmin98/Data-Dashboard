import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Component } from 'react';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import './Login.css'
import { Link } from 'react-router-dom'
import AuthenticationService from '../../api/AuthenticationService';
import { toast } from 'react-toastify';
import SocialButton from './SocialButton'
import Loader from "react-loader-spinner";

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
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
        AuthenticationService.logInWithLocalAccount(values.email, values.password).then(response => {
            console.log(response)
            if (response.status === 200) {
                AuthenticationService.registerSuccesfulLoginWithJwt(values.email, response.data.token)
                toast.success('You have successfully logged in!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                })
                this.setState({ isEnable: true })
                this.props.history.push('/');
            }
            else {
                toast.error('Wrong email or password', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                }
                )
                this.setState({ isEnable: true })
            }
        }).catch(response => {
            toast.error('An error occured. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            }
            )
            this.setState({ isEnable: true })
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
        if (!values.password) {
            errors.password = "Enter a password"
        }
        return errors
    }

    handleSocialLoginSuccess = (user) => {
        AuthenticationService.authenticateWithSocialAccount(user._profile.email, user._profile.name).then(response => {
            if (response.status === 200) {
                console.log(response)
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
        let { email, password } = this.state
        return (
            <div className="login">
                <div className="login-content">
                    <h1 className="login-title">Login to <span className="text-primary">Harta Poluare Brasov</span></h1>
                    <div className="social-login">
                        <SocialButton
                            className="btn-block social-btn google"
                            provider='google'
                            appId={process.env.REACT_APP_GOOGLE_CLIENTID}
                            onLoginSuccess={this.handleSocialLoginSuccess}
                            onLoginFailure={this.handleSocialLoginFailure}
                        >
                            <img src={googleLogo} alt="Google" /> Login with Google
                            </SocialButton>

                        <SocialButton
                            className="btn-block social-btn facebook"
                            provider='facebook'
                            appId={process.env.REACT_APP_FACEBOOK_CLIENTID}
                            onLoginSuccess={this.handleSocialLoginSuccess}
                            onLoginFailure={this.handleSocialLoginFailure}
                        >
                            <img src={fbLogo} alt="Facebook" /> Login with Facebook
                            </SocialButton>
                    </div>
                    <div className="login-separator">
                        <span className="login-separator-text">OR</span>
                    </div>
                    <Formik
                        initialValues={{ email, password }}
                        onSubmit={this.onSubmit}
                        validateOnChange={this.handleChange}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {(props) => (
                            <Form>
                                <ErrorMessage name="email" component="div"
                                    className="alert alert-warning" />
                                <ErrorMessage name="password" component="div"
                                    className="alert alert-warning" />
                                <fieldset className="form-group-login">
                                    <Field className="input" type="text" name="email" placeholder="Email Address" onKeyUp={this.handleChange} />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="password" name="password" placeholder="Password" />
                                </fieldset>
                                <div className="btn-center">
                                    {this.state.isEnable && <button className="btn-login" type="submit">Login</button>}
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
                    <p className="signup-link">New user? <Link to="/signup">Sign up!</Link></p>
                    <p className="forgot-link"><Link to="/forgotpassword">Forgot password?</Link></p>
                </div>
            </div>
        )
    }
}
export default LoginComponent