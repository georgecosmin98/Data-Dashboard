import React from 'react';
import logo from '../../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from '../../api/AuthenticationService';
import { toast } from 'react-toastify';

const HeaderComponent = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    AuthenticationService.logout();
    toast.success('You have been logged out!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

    navigate('/');
  };

  const isLoggedIn = AuthenticationService.isUserLoggedIn();

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <img alt="" src={logo} className="header-logo" />
        </Link>
      </div>

      <div className="header-right">
        {!isLoggedIn && <Link className="nav-link" to="/login">Login</Link>}
        {isLoggedIn && <Link className="nav-link" to="/login" onClick={onSubmit}>Logout</Link>}
      </div>
    </div>
  );
};

export default HeaderComponent;
