import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css'
import AuthenticationService from '../../api/AuthenticationService';
import { toast } from 'react-toastify';
import Loader from "react-loader-spinner";

class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirmPassword: '',
            isEnable: true
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        AuthenticationService.isTokenExpired(this.props.match.params.token).then(
            response => {
                if (response.data === "BAD_REQUEST") {
                    toast.error('Your reset attempt expired! Please try again!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    }
                    )
                    this.props.history.push('/forgotpassword');
                }
            }
        )
    }

    onSubmit(values, { resetForm }) {
        this.setState({ isEnable: false })
        if (values.password === values.confirmPassword) {
            AuthenticationService.resetPassword(this.props.match.params.token, values.password).then(response => {
                if (response.data === "OK") {
                    toast.success('Your password has been reset successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    })
                    this.setState({ isEnable: true })
                    this.props.history.push('/login');
                    resetForm();
                }
                else {
                    toast.error('An error occured. Please try again.', {
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
        else {
            toast.error('Password and Confirm Password do not match', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            })
            this.setState({ isEnable: true })
            resetForm();
        }
    }

    validate(values) {
        let errors = {}

        if (values.password.length < 5) {
            errors.password = "Use 5 or more characters for password!"
        }
        if (!values.password) {
            errors.password = "Enter a password!"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Enter confirmation password"
        }
        return errors
    }

    render() {
        let { password, confirmPassword } = this.state;
        return (
            <div className="forgot-password">
                <div className="forgot-password-content">
                    <h1 className="login-title"><span className="text-primary">Reset</span> Password</h1>
                    <p> Enter your new account password twice below to recover your account!.
                    </p>
                    <Formik
                        initialValues={{ password, confirmPassword }}
                        onSubmit={this.onSubmit}
                        validateOnChange={this.handleChange}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {(props) => (
                            <Form>
                                <ErrorMessage name="password" component="div"
                                    className="alert alert-warning" />
                                <ErrorMessage name="confirmPassword" component="div"
                                    className="alert alert-warning" />
                                <fieldset className="form-group-login">
                                    <Field className="input" type="password" name="password" placeholder="New Password" onKeyUp={this.handleChange} />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="password" name="confirmPassword" placeholder="Confirm Password" onKeyUp={this.handleChange} />
                                </fieldset>
                                <div className="btn-center">
                                    {this.state.isEnable && <button className="btn-reset-password" type="submit">Reset Password</button>}
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
export default ResetPasswordComponent