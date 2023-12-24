import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css'
import AuthenticationService from '../../api/AuthenticationService';
import { toast } from 'react-toastify';
import { Puff } from "react-loader-spinner";

class ForgotPasswordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            isEnable: true
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values, { resetForm }) {
        this.setState({ isEnable: false })
        AuthenticationService.forgotPassword(values.email).then(response => {
            if (response.data === "OK") {
                toast.success('An email with account recovery instructions has been sent to your email address', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                })
                this.setState({ isEnable: true })
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
                }
                )
                this.setState({ isEnable: true })
            }
        }).catch(
            (error) => {
                toast.error('An error occured. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                })
                this.setState({ isEnable: true })
            })

    }

    validate(values) {
        let errors = {}

        if (!values.email) {
            errors.email = "Enter a Email address!"
        }
        return errors
    }

    render() {
        let { email } = this.state;
        return (
            <div className="forgot-password">
                <div className="forgot-password-content">
                    <h1 className="login-title"><span className="text-primary">Forgot</span> Password</h1>
                    <p> Submit your Harta Poluare Brasov account email address
                        below to change your password.
                    </p>
                    <Formik
                        initialValues={{ email }}
                        onSubmit={this.onSubmit}
                        validateOnChange={this.handleChange}
                        validateOnBlur={false}
                        validate={this.validate}
                        setSubmitting={false}
                    >
                        {(props) => (
                            <Form>
                                <ErrorMessage name="email" component="div"
                                    className="alert alert-warning" />
                                <fieldset className="form-group-login">
                                    <Field className="input" type="email" name="email" placeholder="Email Address" />
                                </fieldset>
                                <div className="btn-center">
                                    {this.state.isEnable && <button className="btn-reset-password" type="submit">Request Password Reset</button>}
                                    {!this.state.isEnable && <Puff
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
export default ForgotPasswordComponent