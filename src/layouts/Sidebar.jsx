import React, { useState } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import BedIcon from '@mui/icons-material/Bed';
import { Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../css/Sidebar.css';
import toast from 'react-hot-toast';
// import logo from ''

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item, route) => {
    if (item != activeItem) {
      setActiveItem(item); // Set the active item
      navigate(route); // Navigate to the respective route
    }
  };

  const handleLoginNavigation = () => {
    toast.success('Logout Successful');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className={`sidebar-container ${isOpen ? '' : 'collapsed'} shadow-md`}>
      <div className="sidebar">
        <div className="flex flex-col">
          <div
            className={`toggle-header ${isOpen ? 'justify-between' : 'justify-center'}`}
            onClick={toggleSidebar}
          >
            <span className={`sidebar-title ${isOpen ? '' : 'hidden'}`}>
              SGVP Collage
            </span>
            <MenuIcon />
          </div>

          {/* <Divider/> */}
          <Divider
            style={{
              backgroundColor: 'white',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          />

          <ul>
            <li
              className={activeItem === 'Dashboard' ? 'active' : ''}
              onClick={() => handleItemClick('Dashboard', '/dashboard')}
            >
              <DashboardIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Dashboard
              </span>
            </li>

            <li
              className={activeItem === 'Student' ? 'active' : ''}
              onClick={() => handleItemClick('Student', '/studentDetails')}
            >
              <PersonIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Student
              </span>
            </li>

            <li
              className={activeItem === 'Admission Request' ? 'active' : ''}
              onClick={() =>
                handleItemClick('Admission Request', '/tempStudentDetails')
              }
            >
              <PersonIcon />
              <span className={`menu-text ${isOpen ? 'wrap-text' : 'hidden'}`}>
                Admission Request
              </span>
            </li>

            <li
              className={activeItem === 'Attendence' ? 'active' : ''}
              onClick={() => handleItemClick('Attendence', '/attendence')}
            >
              <CalendarMonthIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Attendence
              </span>
            </li>

            <li
              className={activeItem === 'Gatepass' ? 'active' : ''}
              onClick={() => handleItemClick('Gatepass', '/gatepass')}
            >
              <ConfirmationNumberIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Gatepass
              </span>
            </li>

            <li
              className={activeItem === 'Room Allotment' ? 'active' : ''}
              onClick={() =>
                handleItemClick('Room Allotment', '/roomAllotment')
              }
            >
              <BedIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Room Allotment
              </span>
            </li>

            <li
              className={activeItem === 'Alumni' ? 'active' : ''}
              onClick={() => handleItemClick('Alumni', '/alumni')}
            >
              <PersonIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Alumni
              </span>
            </li>
          </ul>
        </div>
        <div className="imgg flex justify-start">
          <img
            src="..//images/logo.jpg"
            alt="Profile"
            className="mr-3 w-10"
          ></img>
          <p className={`${isOpen ? '' : 'hidden'}`}>SGVP ADMIN</p>
          <div className={`${isOpen ? '' : 'hidden'} ml-2`}>
            <Tooltip title="Logout">
              <IconButton onClick={handleLoginNavigation}>
                <LogoutIcon sx={{ color: 'black' }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
