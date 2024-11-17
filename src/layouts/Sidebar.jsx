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

import '../css/Sidebar.css';
// import logo from ''

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (item != activeItem) {
      setActiveItem(item); // Set the active item
    }
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
              onClick={() => handleItemClick('Dashboard')}
            >
              <DashboardIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Dashboard
              </span>
            </li>

            <li
              className={activeItem === 'Student' ? 'active' : ''}
              onClick={() => handleItemClick('Student')}
            >
              <PersonIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Student
              </span>
            </li>

            <li
              className={activeItem === 'Attendence' ? 'active' : ''}
              onClick={() => handleItemClick('Attendence')}
            >
              <CalendarMonthIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Attendence
              </span>
            </li>

            <li
              className={activeItem === 'Gatepass' ? 'active' : ''}
              onClick={() => handleItemClick('Gatepass')}
            >
              <ConfirmationNumberIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Gatepass
              </span>
            </li>

            <li
              className={activeItem === 'Gatepass' ? 'active' : ''}
              onClick={() => handleItemClick('Gatepass')}
            >
              <BedIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Room Allotment
              </span>
            </li>

            <li
              className={activeItem === 'Alumini' ? 'active' : ''}
              onClick={() => handleItemClick('Alumini')}
            >
              <PersonIcon />
              <span className={`menu-text ${isOpen ? '' : 'hidden'}`}>
                Alumini
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
              <IconButton>
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
