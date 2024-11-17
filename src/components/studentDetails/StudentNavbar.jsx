import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/StudentNavbar.css';

function StudentNavbar() {
  const [studentData, setStudentData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All');
  const [showMenu, setShowMenu] = useState(false);

  const options = ['All', 'Wing3', 'Dome', 'Vishvambharam'];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowMenu(false); // Close dropdown after selection
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/student/studentDetails`,
        );
        setStudentData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="w-full colour-white p-[15px]">
      <div className="h-16 bg-[#ffffff] flex items-center px-4 rounded-md justify-between ">
        <div>
          <span className="text-[25px] font-bold">Student</span>
          <span className="text-[18px]">{`  (${studentData.length})`}</span>
        </div>
        <div className="flex flex-row mr-3">
          <div className="relative inline-block text-left pr-10">
            <div className="flex flex-row">
              <div className="mt-[4px] flex flex-row mr-2">Filter</div>
              <button
                onClick={() => setShowMenu(!showMenu)} // Toggle dropdown menu
                className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              >
                {selectedOption}
                <ArrowDropDownIcon />
              </button>
            </div>
            {showMenu && ( // Conditional render for dropdown
              <div
                className={`absolute right-0 z-10 mt-1  pl-2 pr-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${selectedOption === option ? 'bg-[#37AFE1] text-white' : ''} `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <div className="search-container">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search something..."
                className="search-input"
                onFocus={(e) => {
                  e.target.placeholder = 'Search Pin Number / Name';
                  e.target.classList.add('focused');
                }}
                onBlur={(e) => {
                  e.target.placeholder = 'Search something...';
                  e.target.classList.remove('focused');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentNavbar;
