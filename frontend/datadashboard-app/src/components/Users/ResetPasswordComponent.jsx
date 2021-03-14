import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css'
import AuthenticationService from '../../api/AuthenticationService';
import { toast } from 'react-toastify';

class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirmPassword: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values, { resetForm }) {
       console.log(values)
    }

    validate(values) {
        let errors = {}

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
                        initialValues={{ password,confirmPassword }}
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
                                    <Field className="input" type="text" name="password" placeholder="New Password" onKeyUp={this.handleChange} />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <Field className="input" type="text" name="confirmPassword" placeholder="Confirm Password" onKeyUp={this.handleChange} />
                                </fieldset>
                                <div className="btn-center">
                                    <button className="btn-reset-password" type="submit">Reset Password</button>
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