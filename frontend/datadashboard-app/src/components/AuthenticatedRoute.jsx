import React from 'react';
import { Route, Navigate } from 'react-router-dom'
import AuthenticationService from '../api/AuthenticationService'



const AuthenticatedRoute = ({ children }) => {
    if (!AuthenticationService.isUserLoggedIn()) {
      return <Navigate to="/home" />;
    }

    return children
  }


export default AuthenticatedRoute