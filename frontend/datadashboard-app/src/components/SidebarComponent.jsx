import React, { useState, useEffect } from 'react';
import SidebarRowComponent from './SidebarRowComponent';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink, useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthenticationService from '../api/AuthenticationService';
import SecurityIcon from '@mui/icons-material/Security';
import { FaInfoCircle } from 'react-icons/fa';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GENERAL_INFO_LINK_URL, CHANGE_PASSWORD_LINK_URL } from '../Constants';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const SidebarComponent = () => {
  const location = useLocation();
  const [settingsMenu, setSettingsMenu] = useState(false);

  useEffect(() => {
    updateStateOfSidebar();
  }, [location.pathname]);

  const updateStateOfSidebar = () => {
    if (
      location.pathname !== GENERAL_INFO_LINK_URL &&
      location.pathname !== CHANGE_PASSWORD_LINK_URL &&
      settingsMenu
    ) {
      setSettingsMenu(false);
    } else if (
      (location.pathname === GENERAL_INFO_LINK_URL && !settingsMenu) ||
      (location.pathname === CHANGE_PASSWORD_LINK_URL && !settingsMenu)
    ) {
      setSettingsMenu(true);
    }
  };

  const onClick = () => {
    setSettingsMenu(true);
  };

  const isLoggedIn = AuthenticationService.isUserLoggedIn();

  return (
    <div className="sidebar">
      {!settingsMenu && (
        <NavLink to="/" exact activeClassName="active">
          <SidebarRowComponent icon={BarChartIcon} title="Dashboard" />
        </NavLink>
      )}
      {isLoggedIn && !settingsMenu && (
        <NavLink to="/home" activeClassName="active" onClick={onClick}>
          <SidebarRowComponent icon={HomeWorkOutlinedIcon} title="Home Data" />
        </NavLink>
      )}
      {isLoggedIn && !settingsMenu && (
        <NavLink to="/location" activeClassName="active" onClick={onClick}>
          <SidebarRowComponent icon={DirectionsWalkIcon} title="Walks Data" />
        </NavLink>
      )}
      {!settingsMenu && (
        <NavLink to="/city" exact activeClassName="active">
          <SidebarRowComponent icon={LocationCityIcon} title="City Data" />
        </NavLink>
      )}
      {isLoggedIn && !settingsMenu && (
        <NavLink to={GENERAL_INFO_LINK_URL} activeClassName="active" onClick={onClick}>
          <SidebarRowComponent icon={SettingsIcon} title="Settings" />
        </NavLink>
      )}
      {!settingsMenu && (
        <NavLink to="/info" exact activeClassName="active">
          <SidebarRowComponent icon={FaInfoCircle} title="Info" />
        </NavLink>
      )}
      {!settingsMenu && (
        <NavLink to="/contact" activeClassName="active" onClick={onClick}>
          <SidebarRowComponent icon={ContactMailIcon} title="Contact" />
        </NavLink>
      )}

      {settingsMenu && (
        <NavLink to={GENERAL_INFO_LINK_URL} activeClassName="active" onClick={onClick}>
          <SidebarRowComponent icon={AccountCircleIcon} title="General" />
        </NavLink>
      )}
      {settingsMenu && (
        <NavLink to={CHANGE_PASSWORD_LINK_URL} activeClassName="active" onClick={onClick}>
          <SidebarRowComponent icon={SecurityIcon} title="Security" />
        </NavLink>
      )}
      {settingsMenu && (
        <NavLink to="/" exact activeClassName="active" onClick={onClick}>
          <SidebarRowComponent icon={ArrowBackIcon} title="Back" />
        </NavLink>
      )}
    </div>
  );
};

export default SidebarComponent;
