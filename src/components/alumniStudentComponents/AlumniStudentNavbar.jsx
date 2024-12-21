import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/AlumniStudentNavbar.css';
import DrawerBasic from '../commonCustomComponents/DrawerBasic.jsx';
import toast from 'react-hot-toast';

function AlumniStudentNavbar({
  students,
  setStudents,
  selectedOption,
  setSelectedOption,
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
  const [showMenu, setShowMenu] = useState(false);
  const [pinNumber, setPinNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const options = ['All', 'Pending', 'Confirmed', 'Cancelled'];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowMenu(false);
  };

  const handlePinInput = (e) => {
    setPinNumber(e.target.value);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchStudents = async () => {
    isLoading(true);
    try {
      setCurrentPage(1);
      const query = searchQuery.trim();
      if (!query) {
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/student/getAlumni?page=1&limit=10`,
        );
        setStudents(data.data);

        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/pagination/getAlumniPagination`,
          {
            params: {
              limit: 10,
            },
          },
        );
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      } else {
        try {
          const isPin = /^\d+$/.test(query);
          if (isPin) {
            const { data } = await axios.get(
              `${VITE_BACKEND_BASE_API}/student/getAlumni`,
              {
                params: {
                  pin_number: query,
                },
              },
            );
            setStudents(data.data);

            const response = await axios.get(
              `${VITE_BACKEND_BASE_API}/pagination/getAlumniPagination`,
              {
                params: {
                  limit: 10,
                  pin_number: query,
                },
              },
            );
            setTotalPages(response.data.pagination.totalPages);
            setTotalItems(response.data.pagination.totalItems);
          } else {
            const { data } = await axios.get(
              `${VITE_BACKEND_BASE_API}/student/getAlumni`,
              {
                params: {
                  student_full_name: query,
                },
              },
            );
            setStudents(data.data);

            const response = await axios.get(
              `${VITE_BACKEND_BASE_API}/pagination/getAlumniPagination`,
              {
                params: {
                  limit: 10,
                  student_full_name: query,
                },
              },
            );
            setTotalPages(response.data.pagination.totalPages);
            setTotalItems(response.data.pagination.totalItems);
          }
        } catch (error) {
          console.error('Error fetching student data');
        }
      }
      // setStudentData(results);
      // setNoOfStudent(results.length);
    } catch (err) {
      console.error('Error fetching student data:', err);
      toast.error('Error Try Again');
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
          `${VITE_BACKEND_BASE_API}/student/getAlumni`,
        );
        // // setStudentData(data.data);
        // setNoOfStudent(data.data.length);
        setStudents(data.data);

        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/pagination/getAlumniPagination`,
          {
            params: {
              limit: 10,
            },
          },
        );
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      } catch (error) {
        console.log(error);
        toast.error('Error Try Again');
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
          <span className="text-[25px] font-bold">Student</span>
          <span className="text-[18px]">{`  (${students.length})`}</span>
        </div>
        <div className="flex flex-row mr-3">
          {/* filtering options start------- */}
          {/* <div className="relative inline-block text-left pr-10">
            <div className="flex flex-row">
              <div className="mt-[4px] flex flex-row mr-2">Filter</div>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              >
                {selectedOption}
                <ArrowDropDownIcon />
              </button>
            </div>
            {showMenu && (
              <div
                className={`absolute right-0 z-10 mt-1  pl-2 pr-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${selectedOption === option
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
          {/* filtering options end------- */}
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
                  e.target.placeholder = 'Search Pin Number / Name';
                  e.target.classList.add('focused');
                }}
                onBlur={(e) => {
                  e.target.placeholder = 'Search something...';
                  e.target.classList.remove('focused');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchStudents();
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

export default AlumniStudentNavbar;
