import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/GatepassNavbar.css';
import DrawerBasic from '../commonCustomComponents/DrawerBasic.jsx';

function GatepassNavbar({
  selectedParentOption,
  setSelectedParentOption,
  selectedAdminOption,
  setSelectedAdminOption,
  gatepasses,
  setGatepasses,
  totalItems,
  setTotalItems,
  // currentPage,
  setCurrentPage,
  // totalPages,
  setTotalPages,
  // pageNumberList,
  // setPageNumberList,
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
      setCurrentPage(1);
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

      let filterPaginationParams = {
        limit: 10,
        parent_approval_status: parentOption.toLowerCase(),
        admin_approval_status: adminOption.toLowerCase(),
      };
      if (query) {
        filterPaginationParams = {
          ...filterPaginationParams,
          query_number: query,
        };
      }

      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/pagination/getGatepassPagination`,
        {
          params: filterPaginationParams,
        },
      );
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);
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
        setCurrentPage(1);
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/gatepass/getGatepassForAdminApproval?parent_approval_status=${selectedParentOption.toLowerCase()}&admin_approval_status=${selectedAdminOption.toLowerCase()}`,
        );
        // // setGatepassData(data.data);
        // setNoOfGatepass(data.data.length);
        setGatepasses(data.data);

        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/pagination/getGatepassPagination`,
          {
            params: {
              limit: 10,
              parent_approval_status: selectedParentOption.toLowerCase(),
              admin_approval_status: selectedAdminOption.toLowerCase(),
            },
          },
        );
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
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
      <div className="h-16 bg-[#ffffff] flex items-center px-4 rounded-md justify-between ">
        <div>
          <DrawerBasic />
        </div>
        <div>
          <span className="text-[25px] font-bold">Gatepass</span>
          <span className="text-[18px]">{`  (${totalItems})`}</span>
        </div>
        <div className="flex flex-row mr-3">
          {/* -------------Parent Status Filter start------------- */}
          <div className="relative inline-block text-left pr-10">
            <div className="flex flex-row">
              <div className="mt-[4px] flex flex-row mr-2">Parent:-</div>
              <button
                onClick={() => setShowParentMenu(!showParentMenu)}
                className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              >
                {selectedParentOption}
                {showParentMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </button>
            </div>
            {showParentMenu && (
              <div
                className={`absolute right-0 z-10 mt-1  pl-2 pr-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {ParentOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleParentSelect(option)}
                      className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${
                        selectedParentOption === option
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
          </div>
          {/* -------------Parent Status Filter end------------- */}
          {/* -------------Admin Status Filter start------------- */}
          <div className="relative inline-block text-left pr-10">
            <div className="flex flex-row">
              <div className="mt-[4px] flex flex-row mr-2">Admin:-</div>
              <button
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              >
                {selectedAdminOption}
                {showAdminMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </button>
            </div>
            {showAdminMenu && (
              <div
                className={`absolute right-0 z-10 mt-1  pl-2 pr-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {AdminOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAdminSelect(option)}
                      className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${
                        selectedAdminOption === option
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
          </div>
          {/* -------------Admin Status Filter end------------- */}

          <div className="flex justify-center">
            <div className="search-container">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search something..."
                className="search-input"
                onChange={handleSearchInput}
                onFocus={(e) => {
                  e.target.placeholder = 'Search Pin / Gatepass Number';
                  e.target.classList.add('focused');
                }}
                onBlur={(e) => {
                  e.target.placeholder = 'Search something...';
                  e.target.classList.remove('focused');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // searchGatepasses();
                    filterGatepasses(selectedParentOption, selectedAdminOption);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GatepassNavbar;
