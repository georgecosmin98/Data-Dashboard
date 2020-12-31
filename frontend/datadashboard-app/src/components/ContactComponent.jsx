import React, { Component } from 'react';
import ContactService from './api/contact/ContactService'
import { Formik, Form, Field, ErrorMessage } from 'formik';

class ContactComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            subject: '',
            email: '',
            message: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        ContactService.sendMail(values.email, values.subject, values.message)
            .then(() => this.props.history.push('/contact'))
    }

    validate(values) {
        let errors = {}

        if (!values.email) {
            errors.email = "Enter a Email address!"
        }
        if (!values.subject) {
            errors.subject = "Enter a subject"
        }
        if(!values.message){
            errors.message = "Enter a message"
        }
        return errors
    }

    render() {
        let { subject, email, message } = this.state
        return (
            <div className="contact">
                <div className="form">
                    <h1 class="l-heading"><span class="text-primary">Contact </span>US</h1>
                    <p>Your questions, comments and feedbacks are important for us!</p>
                    <Formik
                        initialValues={{ subject, email, message }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
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
                                    <fieldset className="form-group">
                                        <label>Subject</label>
                                        <Field className="input" type="text" name="subject" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="input" type="text" name="email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Message</label>
                                        <Field className="textarea" component="textarea" type="text" name="message" />
                                    </fieldset>
                                    <div className="btn-center">
                                        <button className="btn" type="submit">Submit</button>
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