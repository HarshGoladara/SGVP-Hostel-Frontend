import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/DashboardNavbar.css';
import DrawerBasic from '../commonCustomComponents/DrawerBasic.jsx';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function DashboardNavbar({
  selectedParentOption,
  setSelectedParentOption,
  selectedAdminOption,
  setSelectedAdminOption,
  gatepasses,
  setGatepasses,
  isLoading,
}) {
  // const [selectedParentOption, setSelectedParentOption] = useState('Approved');
  // const [selectedAdminOption, setSelectedAdminOption] = useState('Pending');
  const [showParentMenu, setShowParentMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [pinNumber, setPinNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const ParentOptions = ['Pending', 'Approved', 'Disapproved'];
  const AdminOptions = ['Pending', 'Approved', 'Disapproved'];

  const handleParentSelect = (option) => {
    setSelectedParentOption(option);
    setShowParentMenu(false);
    filterGatepasses(option, selectedAdminOption);
  };
  const handleAdminSelect = (option) => {
    setSelectedAdminOption(option);
    setShowAdminMenu(false);
    filterGatepasses(selectedParentOption, option);
  };

  const filterGatepasses = async (parentOption, adminOption) => {
    isLoading(true);
    try {
      let filterParams = {
        page: 1,
        limit: 10,
        parent_approval_status: parentOption.toLowerCase(),
        admin_approval_status: adminOption.toLowerCase(),
      };
      const query = searchQuery.trim();
      if (query) {
        filterParams = {
          ...filterParams,
          query_number: query,
        };
      }

      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/gatepass/getGatepassForAdminApproval`,
        {
          params: filterParams,
        },
      );
      const results = data.data;
      // setGatepassData(results);
      // setNoOfGatepass(results.length);
      setGatepasses(results);
    } catch (error) {
      console.error('Error fetching gatepass data', error);
    } finally {
      isLoading(false);
    }
  };

  const handlePinInput = (e) => {
    setPinNumber(e.target.value);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      isLoading(true);
      try {
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/gatepass/getGatepassForAdminApproval?parent_approval_status=${selectedParentOption.toLowerCase()}&admin_approval_status=${selectedAdminOption.toLowerCase()}`,
        );
        // // setGatepassData(data.data);
        // setNoOfGatepass(data.data.length);
        setGatepasses(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        isLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="w-full colour-white p-[15px]">
      <div className="h-16 bg-[#ffffff] flex items-center px-4 rounded-md">
        {/* Drawer Button */}
        <div className="flex-shrink-0">
          <DrawerBasic />
        </div>

        {/* Title + Logo Centered */}
        <div className="flex-grow flex justify-center items-center space-x-3">
          <span className="text-[25px] font-bold">
            SGVP Collage Students ERP
          </span>
          <img src="../images/logo.jpg" alt="Profile" className="w-10 h-10" />
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-2">
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );

  // return (
  //   <AppBar position="static" sx={{ backgroundColor: "#0078d7" }}>
  //     <Toolbar>
  //       <Typography variant="h6" sx={{ flexGrow: 1 }}>
  //         Welcome, [User Name]
  //       </Typography>
  //       <IconButton color="inherit">
  //         <NotificationsIcon />
  //       </IconButton>
  //       <IconButton color="inherit">
  //         <SettingsIcon />
  //       </IconButton>
  //       <IconButton color="inherit">
  //         <AccountCircleIcon />
  //       </IconButton>
  //     </Toolbar>
  //   </AppBar>
  // );
}

export default DashboardNavbar;
