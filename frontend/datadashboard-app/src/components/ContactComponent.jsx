import React, { Component } from 'react';
import ContactService from '../api/contact/ContactService'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UtilityService from '../api/UtilityService';
import { toast } from 'react-toastify';
import Loader from "react-loader-spinner";

class ContactComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            subject: '',
            email: '',
            message: '',
            isEnable: true
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values, { resetForm }) {
        this.setState({ isEnable: false })
        UtilityService.verifyEmail(values.email)
            .then(response => {
                if (response.data === "OK") {
                    ContactService.sendMail(values.email, values.subject, values.message)
                    toast.success('We received your message!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    })
                    resetForm();
                    this.setState({ isEnable: true })
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

        if (values.showFailedMessage) {
            errors.message = "Mail send failed"
        }
        if (!values.email) {
            errors.email = "Enter a Email address!"
        }
        if (!values.subject) {
            errors.subject = "Enter a subject"
        }
        if (!values.message) {
            errors.message = "Enter a message"
        }

        return errors
    }

    render() {
        let { subject, email, message, showFailedMessage } = this.state
        return (
            <div className="contact">
                <div className="form">
                    <h1 className="l-heading"><span className="text-primary">Contact </span>US</h1>
                    <p>Your questions, comments and feedbacks are important for us!</p>
                    <Formik
                        initialValues={{ subject, email, message, showFailedMessage }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="subject" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="email" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="message" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="showFailedMessage" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Subject</label>
                                        <Field className="input" type="text" name="subject" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="input" type="email" name="email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Message</label>
                                        <Field className="textarea" component="textarea" type="text" name="message" />
                                    </fieldset>
                                    <div className="btn-center">
                                        {this.state.isEnable && <button className="btn" type="submit">Submit</button>}
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

export default ContactComponent;