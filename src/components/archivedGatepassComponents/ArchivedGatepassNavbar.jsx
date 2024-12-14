import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/ArchivedGatepassNavbar.css';

function ArchivedGatepassNavbar({ onSearch }) {
  const [gatepassData, setGatepassData] = useState([]);
  const [noOfGatepass, setNoOfGatepass] = useState(0);

  const [pinNumber, setPinNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filterGatepasses = async () => {
    try {
      let filterParams = {
        page: 1,
        limit: 10,
      };
      const query = searchQuery.trim();
      if (query) {
        filterParams = {
          ...filterParams,
          query_number: query,
        };
      }

      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/gatepass/getGatepassFromArchived`,
        {
          params: filterParams,
        },
      );
      const results = data.data;
      setGatepassData(results);
      onSearch(results); // Update the parent state
    } catch (error) {
      console.error('Error fetching gatepass data', error);
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
      try {
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/gatepass/getGatepassFromArchived`,
        );
        // setGatepassData(data.data);
        setNoOfGatepass(data.data.length);
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
          <span className="text-[25px] font-bold">Gatepass</span>
          <span className="text-[18px]">{`  (${noOfGatepass})`}</span>
        </div>
        <div className="flex flex-row mr-3">
          {/* put start date picker */}
          {/* put end date picker */}

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
                    filterGatepasses();
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

export default ArchivedGatepassNavbar;
