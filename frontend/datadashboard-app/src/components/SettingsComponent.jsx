import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Puff } from "react-loader-spinner";
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from '../Constants';
import AuthenticationService from '../api/AuthenticationService';
import { toast } from 'react-toastify';
import UserService from '../api/UserService';
import UtilityService from '../api/UtilityService';

const SettingsComponent = () => {
    const { category } = useParams();
    const [state, setState] = useState({
        name: '',
        address: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        isEnable: true,
        generalInformation: true,
    });

    useEffect(() => {
        if (category === 'generalInfo') {
            setState((prevState) => ({ ...prevState, generalInformation: true }));
            retrieveUserGeneralInfo();
        } else {
            setState((prevState) => ({ ...prevState, generalInformation: false }));
        }
    }, [category]);



    const retrieveUserGeneralInfo = () => {
        UserService.retrieveUserGeneralInfo().then((response) => {
            if (response.data.address !== null)
                setState((prevState) => ({
                    ...prevState,
                    name: response.data.name,
                    address: response.data.address,
                }));
            else setState((prevState) => ({ ...prevState, name: response.data.name }));
        });
    };

    const changeGeneralInformations = (values) => {
        setState((prevState) => ({ ...prevState, isEnable: false }));
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
                setState((prevState) => ({ ...prevState, isEnable: true }));
            }
            else {
                setState((prevState) => ({ ...prevState,address: response.data.features[0].place_name }));
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
                        setState((prevState) => ({ ...prevState, isEnable: true }));
                    } else {
                        toast.error('An error occured. Please try again.', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                        })
                        setState((prevState) => ({ ...prevState, isEnable: true }));
                    }
                })
            }
        })
    }

    const changePassword = (values, { resetForm }) => {
        setState((prevState) => ({ ...prevState, isEnable: false }));
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
                        setState((prevState) => ({ ...prevState, isEnable: true }));
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
                        setState((prevState) => ({ ...prevState, isEnable: true }));
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
                setState((prevState) => ({ ...prevState, isEnable: true }));
            }
        })
    }

    const validate = (values) => {
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


    const handleChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const { name, address, oldPassword, newPassword, confirmPassword } = state;

    return (
        <div className="settings">
            <div className="settings-content">
                <h1 className="l-heading"><span className="text-primary">Your </span>Account</h1>
                {state.generalInformation && <Formik
                    initialValues={{ name, address }}
                    enableReinitialize={true}
                    onSubmit={changeGeneralInformations}
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

                                {state.isEnable && <div className="general-info"><button className="btn" type="submit">Save changes</button></div>}
                                {!state.isEnable && <Puff
                                    color="#00BFFF"
                                    height={50}
                                    width={50}
                                />}
                            </Form>
                        )
                    }
                </Formik>}
                {!state.generalInformation && <Formik
                    initialValues={{ oldPassword, newPassword, confirmPassword }}
                    onSubmit={changePassword}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validate}
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
                                    {state.isEnable && <div className="change-password"><button className="btn" type="submit">Change password</button></div>}
                                    {!state.isEnable && <Puff
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

export default SettingsComponent