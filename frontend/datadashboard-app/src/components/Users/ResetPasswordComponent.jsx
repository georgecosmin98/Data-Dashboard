import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';
import AuthenticationService from '../../api/AuthenticationService';
import { toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordComponent = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
    isEnable: true,
  });

  useEffect(() => {
    AuthenticationService.isTokenExpired(token).then((response) => {
      if (response.data === 'BAD_REQUEST') {
        toast.error('Your reset attempt expired! Please try again!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/forgotpassword');
      }
    });
  }, [token, navigate]);

  const onSubmit = (values, { resetForm }) => {
    setState((prevState) => ({ ...prevState, isEnable: false }));
    if (values.password === values.confirmPassword) {
      AuthenticationService.resetPassword(token, values.password).then((response) => {
        if (response.data === 'OK') {
          toast.success('Your password has been reset successfully!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          setState((prevState) => ({ ...prevState, isEnable: true }));
          navigate('/login');
          resetForm();
        } else {
          toast.error('An error occurred. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          setState((prevState) => ({ ...prevState, isEnable: true }));
        }
      });
    } else {
      toast.error('Password and Confirm Password do not match', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setState((prevState) => ({ ...prevState, isEnable: true }));
      resetForm();
    }
  };

  const validate = (values) => {
    let errors = {};

    if (values.password.length < 5) {
      errors.password = 'Use 5 or more characters for password!';
    }
    if (!values.password) {
      errors.password = 'Enter a password!';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Enter confirmation password';
    }
    return errors;
  };

  const { password, confirmPassword } = state;

  return (
    <div className="forgot-password">
      <div className="forgot-password-content">
        <h1 className="login-title">
          <span className="text-primary">Reset</span> Password
        </h1>
        <p>Enter your new account password twice below to recover your account!.</p>
        <Formik
          initialValues={{ password, confirmPassword }}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validate={validate}
        >
          {(props) => (
            <Form>
              <ErrorMessage name="password" component="div" className="alert alert-warning" />
              <ErrorMessage name="confirmPassword" component="div" className="alert alert-warning" />
              <fieldset className="form-group-login">
                <Field className="input" type="password" name="password" placeholder="New Password" />
              </fieldset>
              <fieldset className="form-group-login">
                <Field className="input" type="password" name="confirmPassword" placeholder="Confirm Password" />
              </fieldset>
              <div className="btn-center">
                {state.isEnable && <button className="btn-reset-password" type="submit">Reset Password</button>}
                {!state.isEnable && (
                  <Puff color="#00BFFF" height={50} width={50} />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
