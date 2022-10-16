import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from "react-loader-spinner";
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../Constants';
import AuthenticationService from '../api/AuthenticationService'
import { toast } from 'react-toastify';
import UserService from '../api/UserService';
import UtilityService from '../api/UtilityService';

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

        this.retrieveUserGeneralInfo();
    }

    componentDidUpdate() {
        if (this.props.match.params.category === "generalInfo" && !this.state.generalInformation) {
            this.setState({ generalInformation: true })
        }
        else if (this.props.match.params.category !== "generalInfo" && this.state.generalInformation) {
            this.retrieveUserGeneralInfo();
            this.setState({ generalInformation: false })
        }
    }

    retrieveUserGeneralInfo() {
        UserService.retrieveUserGeneralInfo().then(response => {
            if (response.data.address !== null)
                this.setState({ name: response.data.name, address: response.data.address })
            else
                this.setState({ name: response.data.name })
        })
    }

    changeGeneralInformations(values) {
        this.setState({ isEnable: false })
        UtilityService.addressToCoordinates(values.address).then(response => {
            if (response.data.features.length === 0) {
                toast.error('Invalid address', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                })
                this.setState({ isEnable: true })
            }
            else {
                this.setState({ address: response.data.features[0].place_name })
                UserService.changeUserGeneralInfo(values.name, response.data.features[0].place_name).then(response => {
                    if (response.status === 200) {
                        toast.success('Your general information have been update!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                        })
                        this.setState({ isEnable: true })
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
        })
    }

    changePassword(values, { resetForm }) {
        this.setState({ isEnable: false })
        var username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        AuthenticationService.logInWithLocalAccount(username, values.oldPassword).then(response => {
            if (response.status === 200) {
                AuthenticationService.changePassword(values.newPassword).then(response => {
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


    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    render() {
        let { name, address, oldPassword, newPassword, confirmPassword } = this.state
        return (
            <div className="settings">
                <div className="settings-content">
                    <h1 className="l-heading"><span className="text-primary">Your </span>Account</h1>
                    {this.state.generalInformation && <Formik
                        initialValues={{ name, address }}
                        enableReinitialize={true}
                        onSubmit={this.changeGeneralInformations.bind(this)}
                        // validateOnChange={this.handleChange.bind(this)}
                        validateOnBlur={false}
                    //  validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <h2 className="settings-header">General Informations</h2>
                                    <fieldset className="form-group-settings">
                                        <label>Your Name</label>
                                        <Field className="input" type="text" name="name" placeholder="Enter your name" />
                                    </fieldset>
                                    <fieldset className="form-group-settings">
                                        <label>Address</label>
                                        <Field className="input" type="text" name="address" placeholder="Enter your address" />
                                    </fieldset>

                                    {this.state.isEnable && <div className="general-info"><button className="btn" type="submit">Save changes</button></div>}
                                    {!this.state.isEnable && <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}
                                    />}
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
                                        {this.state.isEnable && <div className="change-password"><button className="btn" type="submit">Change password</button></div>}
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
                </div>
            </div>
        )
    }
}
export default SettingsComponent