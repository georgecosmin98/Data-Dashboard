import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from "react-loader-spinner";
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../Constants';
import AuthenticationService from '../api/AuthenticationService'
import { toast } from 'react-toastify';

class SettingsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            address: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            isEnable: true,
            generalInformation: true
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params.category === "generalInfo")
            this.setState({ generalInformation: true })
        else
            this.setState({ generalInformation: false })

        this.setState({ name: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) })
    }

    componentDidUpdate() {
        if (this.props.match.params.category === "generalInfo" && !this.state.generalInformation)
            this.setState({ generalInformation: true })
        else if (this.props.match.params.category !== "generalInfo" && this.state.generalInformation){
            this.setState({ generalInformation: false })}
    }

    changeGeneralInformations(values) {
        console.log(values)
        console.log(values.address)
    }

    changePassword(values, { resetForm }) {
        this.setState({ isEnable: false })
        var username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        AuthenticationService.logInWithLocalAccount(username, values.oldPassword).then(response => {
            console.log(response)
            if (response.status === 200) {
                AuthenticationService.changePassword(values.newPassword).then(response => {
                    console.log(response)
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
                        resetForm();
                    } else {
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
                toast.error('Old password is invalid!', {
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
        console.log(values)
    }

    validate(values) {
        let errors = {}

        if (values.newPassword.length < 5) {
            errors.newPassword = "Use 5 or more characters for password!"
        }

        if (!values.newPassword) {
            errors.newPassword = "Enter a password!"
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Enter confirm password!"
        }

        if (values.confirmPassword !== values.newPassword) {
            errors.newPassword = "Password and confirm password not match!"
        }
        return errors
    }

    changeContext() {
        console.log(this.state.generalInformation)
        this.setState({ generalInformation: !this.state.generalInformation })
        this.props.history.push('/settings');
    }

    render() {
        let { name, address, oldPassword, newPassword, confirmPassword } = this.state
        return (
            <div className="settings">
                <div className="settings-content">
                    <h1 className="l-heading"><span className="text-primary">Your </span>Account</h1>
                    {this.state.generalInformation && <Formik
                        initialValues={{ name, address }}
                        onSubmit={this.changeGeneralInformations.bind(this)}
                        validateOnChange={false}
                        validateOnBlur={false}
                    //  validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <h2 className="settings-header">General Informations</h2>
                                    <fieldset className="form-group-settings">
                                        <label>Your Name</label>
                                        <Field className="input" type="text" name="name" value={this.state.name} />
                                    </fieldset>
                                    <fieldset className="form-group-settings">
                                        <label>Address</label>
                                        <Field className="input" type="text" name="address" placeholder="Address" />
                                    </fieldset>

                                    {this.state.isEnable && <button className="btn" type="submit">Save changes</button>}
                                </Form>
                            )
                        }
                    </Formik>}
                    {!this.state.generalInformation && <Formik
                        initialValues={{ oldPassword, newPassword, confirmPassword }}
                        onSubmit={this.changePassword.bind(this)}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <h2 className="settings-header">Change password</h2>
                                    <ErrorMessage name="newPassword" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="confirmPassword" component="div"
                                        className="alert alert-warning" />
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
                                        {this.state.isEnable && <button className="btn" type="submit">Change password</button>}
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
                    </Formik>}
                    {/* <div className="btn-center">
                        <button className="btn" type="submit" onClick={this.changeContext.bind(this)}>Change context</button>
                    </div> */}
                </div>
            </div>
        )
    }
}
export default SettingsComponent