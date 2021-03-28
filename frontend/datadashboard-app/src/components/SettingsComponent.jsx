import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from "react-loader-spinner";
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../Constants';

class SettingsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            isEnable: true
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        console.log(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME).toString())
        this.setState({ name: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) })
    }

    render() {
        let { name, oldPassword, newPassword, confirmPassword } = this.state
        return (
            <div className="settings">
                <div className="settings-content">
                    <h1 className="l-heading"><span className="text-primary">Your </span>Account</h1>
                    <h2 className="settings-header">General Informations</h2>
                    <Formik
                        initialValues={{ name, oldPassword, newPassword, confirmPassword }}
                        //  onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                    //  validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="name" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="oldPassword" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="newPassword" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="confirmPassword" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group-settings">
                                        <label>Your Name</label>
                                        <Field className="input" type="text" name="name" value={this.state.name} />
                                    </fieldset>
                                    <fieldset className="form-group-settings">
                                        <label>Old password</label>
                                        <Field className="input" type="password" name="oldPassword" placeholder="Old password" />
                                    </fieldset>
                                    <fieldset className="form-group-settings">
                                        <label>New password</label>
                                        <Field className="input" type="password" name="newPassword" placeholder="New password" />
                                    </fieldset>
                                    <fieldset className="form-group-settings">
                                        <label>Confirm password</label>
                                        <Field className="input" type="password" name="confirmPassword" placeholder="Confirm password" />
                                    </fieldset>
                                    <div className="btn-center">
                                        {this.state.isEnable && <button className="btn" type="submit">Save changes</button>}
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
export default SettingsComponent