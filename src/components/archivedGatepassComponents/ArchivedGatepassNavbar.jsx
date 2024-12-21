import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/ArchivedGatepassNavbar.css';
import DrawerBasic from '../commonCustomComponents/DrawerBasic.jsx';

function ArchivedGatepassNavbar({
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
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isLoading,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filterGatepasses = async () => {
    // console.log(new Date(startDate).toLocaleString(),new Date(endDate).toLocaleString());
    isLoading(true);
    try {
      setCurrentPage(1);
      let filterParams = {
        page: 1,
        limit: 10,
      };

      const query = searchQuery.trim();

      if (query) {
        if (/^\d+$/.test(query)) {
          filterParams.query_number = query;
        } else {
          filterParams.student_full_name = query;
        }
      }

      if (startDate) {
        filterParams.startDate = dayjs(startDate).format('YYYY-MM-DD');
      }

      if (endDate) {
        filterParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
      }

      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/gatepass/getGatepassFromArchived`,
        { params: filterParams },
      );
      const results = data.data;
      setGatepasses(results);

      let filterPaginationParams = {
        limit: 10,
      };

      if (query) {
        if (/^\d+$/.test(query)) {
          filterPaginationParams.query_number = query;
        } else {
          filterPaginationParams.student_full_name = query;
        }
      }

      if (startDate) {
        filterPaginationParams.startDate =
          dayjs(startDate).format('YYYY-MM-DD');
      }

      if (endDate) {
        filterPaginationParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
      }

      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/pagination/getArchivedGatepassPagination`,
        { params: filterPaginationParams },
      );
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);
    } catch (error) {
      console.error('Error fetching gatepass data', error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      isLoading(true);
      try {
        setCurrentPage(1);
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/gatepass/getGatepassFromArchived`,
        );
        setGatepasses(data.data);

        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/pagination/getArchivedGatepassPagination`,
          {
            params: {
              limit: 10,
            },
          },
        );
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="w-full colour-white p-[15px]">
      <div className="h-16 bg-[#ffffff] flex items-center px-4 rounded-md justify-between">
        <div>
          <DrawerBasic />
        </div>
        <div>
          <span className="text-[25px] font-bold">Gatepass</span>
          <span className="text-[18px]">{`  (${totalItems})`}</span>
        </div>
        <div className="flex flex-row mr-3 items-center">
          {/* Start Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => (
                <input {...params.inputProps} className="datepicker-input" />
              )}
            />
          </LocalizationProvider>

          {/* End Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => (
                <input {...params.inputProps} className="datepicker-input" />
              )}
            />
          </LocalizationProvider>

          {/* Search Input */}
          <div className="flex justify-center ml-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchivedGatepassNavbar;
