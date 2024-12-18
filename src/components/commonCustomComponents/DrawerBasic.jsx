import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import BedIcon from '@mui/icons-material/Bed';
import { Tooltip, IconButton } from '@mui/material';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import toast from 'react-hot-toast';
// import "./css/DrawerBasic.css";
import { useCookies } from 'react-cookie';

export default function DrawerBasic() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(inOpen);
  };

  // Map routes to sidebar item labels
  const routeToItemMap = {
    '/dashboard': 'Dashboard',
    '/studentDetails': 'Student',
    '/tempStudentDetails': 'Admission Request',
    '/attendence': 'Attendence',
    '/gatepass': 'Gatepass',
    '/archivedGatepass': 'Archived Gatepass',
    '/roomAllotment': 'Room Allotment',
    '/alumni': 'Alumni',
  };

  // Sync active item with the current route on mount and location change
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedItem = routeToItemMap[currentPath] || ''; // Default to Dashboard if no match
    setActiveItem(matchedItem);
  }, [location.pathname]);

  // // Retrieve sidebar state from local storage on mount
  // useEffect(() => {
  //     const savedSidebarState = localStorage.getItem('sidebarState');
  //     if (savedSidebarState !== null) {
  //         setIsOpen(JSON.parse(savedSidebarState)); // Parse and set the saved state
  //     }
  // }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarState', JSON.stringify(newState)); // Save state to local storage
  };

  const handleItemClick = (item, route) => {
    if (item !== activeItem) {
      setActiveItem(item); // Set the active item
      navigate(route); // Navigate to the respective route
    }
  };

  const handleLoginNavigation = () => {
    removeCookie('token');
    toast.success('Logout Successful');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} size="sm">
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem
              key="Dashboard"
              className={`active:bg-blue-300 ${activeItem === 'Dashboard' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              onClick={() => handleItemClick('Dashboard', '/dashboard')}
            >
              <DashboardIcon
                className={`${activeItem === 'Dashboard' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Dashboard' ? 'text-white' : ''}`}
              >
                Dashboard
              </span>
            </ListItem>

            <ListItem
              key="Student"
              className={`active:bg-blue-300 ${activeItem === 'Student' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              // className={activeItem === 'Student' ? 'active' : ''}
              onClick={() => handleItemClick('Student', '/studentDetails')}
            >
              <PersonIcon
                className={`${activeItem === 'Student' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Student' ? 'text-white' : ''}`}
              >
                Student
              </span>
            </ListItem>

            <ListItem
              key="Admission Request"
              className={`active:bg-blue-300 ${activeItem === 'Admission Request' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              // className={activeItem === 'Admission Request' ? 'active' : ''}
              onClick={() =>
                handleItemClick('Admission Request', '/tempStudentDetails')
              }
            >
              <PersonIcon
                className={`${activeItem === 'Admission Request' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Admission Request' ? 'text-white' : ''}`}
              >
                Admission Request
              </span>
            </ListItem>

            <ListItem
              key="Attendence"
              className={`active:bg-blue-300 ${activeItem === 'Attendence' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              // className={activeItem === 'Attendence' ? 'active' : ''}
              onClick={() => handleItemClick('Attendence', '/attendence')}
            >
              <CalendarMonthIcon
                className={`${activeItem === 'Attendence' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Attendence' ? 'text-white' : ''}`}
              >
                Attendence
              </span>
            </ListItem>

            <ListItem
              key="Gatepass"
              className={`active:bg-blue-300 ${activeItem === 'Gatepass' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              // className={activeItem === 'Gatepass' ? 'active' : ''}
              onClick={() => handleItemClick('Gatepass', '/gatepass')}
            >
              <ConfirmationNumberIcon
                className={`${activeItem === 'Gatepass' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Gatepass' ? 'text-white' : ''}`}
              >
                Gatepass
              </span>
            </ListItem>

            <ListItem
              key="Archived Gatepass"
              className={`active:bg-blue-300 ${activeItem === 'Archived Gatepass' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              // className={activeItem === 'Archived Gatepass' ? 'active' : ''}
              onClick={() =>
                handleItemClick('Archived Gatepass', '/archivedGatepass')
              }
            >
              <ConfirmationNumberIcon
                className={`${activeItem === 'Archived Gatepass' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Archived Gatepass' ? 'text-white' : ''}`}
              >
                Archived Gatepass
              </span>
            </ListItem>

            <ListItem
              key="Room Allotment"
              className={`active:bg-blue-300 ${activeItem === 'Room Allotment' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              // className={activeItem === 'Room Allotment' ? 'active' : ''}
              onClick={() =>
                handleItemClick('Room Allotment', '/roomAllotment')
              }
            >
              <BedIcon
                className={`${activeItem === 'Room Allotment' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Room Allotment' ? 'text-white' : ''}`}
              >
                Room Allotment
              </span>
            </ListItem>

            <ListItem
              key="Alumni"
              className={`active:bg-blue-300 ${activeItem === 'Alumni' ? 'bg-[#37afe1]' : 'hover:bg-blue-200'} cursor-pointer`}
              // className={activeItem === 'Alumni' ? 'active' : ''}
              onClick={() => handleItemClick('Alumni', '/alumni')}
            >
              <PersonIcon
                className={`${activeItem === 'Alumni' ? 'text-white' : ''}`}
              />
              <span
                className={`${activeItem === 'Alumni' ? 'text-white' : ''}`}
              >
                Alumni
              </span>
            </ListItem>
          </List>
          <Divider />

          {/* <List>
                        <ListItem>
                            <ListItemButton>
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
                            </ListItemButton>
                        </ListItem>
                    </List> */}

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              p: 1.5,
              pb: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <div className="imgg flex justify-start">
              <img
                src="..//images/logo.jpg"
                alt="Profile"
                className="mr-3 w-10"
              ></img>
              <p>SGVP ADMIN</p>
              <div className={`ml-2`}>
                <Tooltip title="Logout">
                  <IconButton onClick={handleLoginNavigation}>
                    <LogoutIcon sx={{ color: 'black' }} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
