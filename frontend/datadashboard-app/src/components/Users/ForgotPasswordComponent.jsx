import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css'
import AuthenticationService from '../../api/AuthenticationService';
import { toast } from 'react-toastify';

class ForgotPasswordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values, { resetForm }) {
        console.log("I am on reset password component and i want to send a reset email");
        AuthenticationService.forgotPassword(values.email).then(response => {
            console.log(response)
            if (response.data === "OK") {
                toast.success('An email with account recovery instructions has been sent to your email address', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                })
                resetForm();
            }
            else
                toast.error('An error occured. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                }
                )
        })
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
                    >
                        {(props) => (
                            <Form>
                                <ErrorMessage name="email" component="div"
                                    className="alert alert-warning" />
                                <fieldset className="form-group-login">
                                    <Field className="input" type="text" name="email" placeholder="Email Address" onKeyUp={this.handleChange} />
                                </fieldset>
                                <div className="btn-center">
                                    <button className="btn-reset-password" type="submit">Request Password Reset</button>
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