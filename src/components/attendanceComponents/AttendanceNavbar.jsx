import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/AttendanceNavbar.css';
import DrawerBasic from '../commonCustomComponents/DrawerBasic.jsx';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import DrawerFilters from './DrawerFilters.jsx';

function AttendanceNavbar({
  selectedCategoryOption,
  setSelectedCategoryOption,
  selectedStatusOption,
  setSelectedStatusOption,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchQuery,
  setSearchQuery,
}) {
  // const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  // const [showStatusMenu, setShowStatusMenu] = useState(false);

  // const categoryOptions = ['All', 'Wing3', 'Dome', 'Vishvambharam'];
  // const statusOptions = ['Present', 'Absent', 'Leave', 'Sick', 'Exam', 'College', 'Job'];

  // const handleCategorySelect = (option) => {
  //   setSelectedCategoryOption(option);
  //   setSearchQuery('');
  //   setShowCategoryMenu(false);
  //   // filterStudents(option);
  // };

  // const handleStatusSelect = (option) => {
  //   setSelectedStatusOption(option);
  //   setSearchQuery('');
  //   setShowStatusMenu(false);
  //   // filterStudents(option);
  // };

  return (
    <div className="w-full colour-white p-[15px]">
      <div className="h-16 bg-[#ffffff] flex items-center px-4 rounded-md">
        {/* Drawer Button */}
        <div className="flex-shrink-0">
          <DrawerBasic />
        </div>

        {/* Title + Logo Centered */}
        <div className="flex-grow flex justify-center items-center space-x-3">
          <span className="text-[25px] font-bold">Attendance</span>
          <img src="../images/logo.jpg" alt="Profile" className="w-10 h-10" />
        </div>

        <div className="flex-shrink-0">
          <DrawerFilters
            selectedCategoryOption={selectedCategoryOption}
            setSelectedCategoryOption={setSelectedCategoryOption}
            selectedStatusOption={selectedStatusOption}
            setSelectedStatusOption={setSelectedStatusOption}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Start Date Picker */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => (
              <input {...params.inputProps} className="datepicker-input" />
            )}
          />
        </LocalizationProvider> */}

        {/* End Date Picker */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(params) => (
              <input {...params.inputProps} className="datepicker-input" />
            )}
          />
        </LocalizationProvider> */}

        {/* <div className="relative inline-block text-left pr-10">
          <div className="flex flex-row">
            <div className="mt-[4px] flex flex-row mr-2">Category:-</div>
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
            >
              {selectedCategoryOption}
              {showCategoryMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>
          </div>
          {showCategoryMenu && (
            <div
              className={`absolute right-0 z-10 mt-1  pl-2 pr-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {categoryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleCategorySelect(option)}
                    className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${selectedCategoryOption === option
                      ? 'bg-[#37AFE1] text-white'
                      : ''
                      } `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div> */}

        {/* <div className="relative inline-block text-left pr-10">
          <div className="flex flex-row">
            <div className="mt-[4px] flex flex-row mr-2">Status:-</div>
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
            >
              {selectedStatusOption}
              {showStatusMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>
          </div>
          {showStatusMenu && (
            <div
              className={`absolute right-0 z-10 mt-1  pl-2 pr-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleStatusSelect(option)}
                    className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${selectedStatusOption === option
                      ? 'bg-[#37AFE1] text-white'
                      : ''
                      } `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div> */}

        {/* Search Input */}
        {/* <div className="flex justify-center ml-3">
          <div className="search-container">
            <span className="search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search something..."
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => {
                e.target.placeholder = 'Search Pin / Name / GID';
                e.target.classList.add('focused');
              }}
              onBlur={(e) => {
                e.target.placeholder = 'Search something...';
                e.target.classList.remove('focused');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  filterGatepasses();
                }
              }}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AttendanceNavbar;
