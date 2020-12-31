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
        this.onSubmit= this.onSubmit.bind(this)
    }
    
    onSubmit(props){
        ContactService.sendMail(props.email,props.subject,props.message)
        .then(()=> this.props.history.push('/contact'))
    }

    render() {
        let {subject, email, message } = this.state
        return (
            // <div className="contact">
            //     <div className="form">
            //         <h1 class="l-heading"><span class="text-primary">Contact </span>US</h1>
            //         <p>Your questions, comments and feedbacks are important for us!</p>
            //         <form action="process.php">
            //             <div class="form-group">
            //                 <label for="name">Name</label>
            //                 <input type="text" name="name" id="name" />
            //             </div>
            //             <div class="form-group">
            //                 <label for="email">Email</label>
            //                 <input type="text" name="email" id="email" />
            //             </div>
            //             <div class="form-group">
            //                 <label for="Message">Message</label>
            //                 <textarea name="message" id="Message"></textarea>
            //             </div>
            //             <div className="btn-center">
            //                 <button type="submit" className="btn " onSubmit={this.onSubmit}>Submit</button>
            //             </div>
            //         </form>
            //     </div>
            // </div>
                <div className="contact">
                    <div className="form">
                        <h1 class="l-heading"><span class="text-primary">Contact </span>US</h1>
                        <p>Your questions, comments and feedbacks are important for us!</p>
                        <Formik
                            initialValues={{ subject, email,message }}
                            onSubmit={this.onSubmit}
                            enableReinitialize={true}
                        >
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component="div"
                                            className="alert alert-warning" />
                                        <ErrorMessage name="targetDate" component="div"
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
                                            <Field className="textarea" type="text" name="message" />
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