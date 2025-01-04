import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import '../../assets/css/studentDetails/StudentNavbar.css';
import DrawerBasic from '../commonCustomComponents/DrawerBasic.jsx';
import DrawerFilters from './DrawerFilters.jsx';
import { Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CircularProgress } from '@mui/material';
import * as XLSX from 'xlsx'; // Import XLSX library

function StudentNavbar({
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
  searchQuery,
  setSearchQuery,
  isLoading,
  selectedUniversity,
  setSelectedUniversity,
  selectedBranch,
  setSelectedBranch,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [pinNumber, setPinNumber] = useState('');
  const [reportLoading, setReportLoading] = useState(false);

  const options = ['All', 'Wing3', 'Dome', 'Vishvambharam'];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchQuery('');
    setShowMenu(false);
    filterStudents(option);
  };

  const handlePinInput = (e) => {
    setPinNumber(e.target.value);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterStudents = async (option, university, branch) => {
    isLoading(true);
    try {
      setCurrentPage(1);

      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/student/getStudentDetails`,
        {
          params: {
            page: 1,
            limit: 10,
            category: option === 'All' ? null : option,
            name_of_university: university === 'All' ? null : university,
            branch: branch === 'All' ? null : branch,
          },
        },
      );
      const results = data.data;
      // setStudentData(results);
      // setNoOfStudent(results.length);
      setStudents(results);

      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/pagination/getStudentPagination`,
        {
          params: {
            limit: 10,
            category: option === 'All' ? null : option,
            name_of_university: university === 'All' ? null : university,
            branch: branch === 'All' ? null : branch,
          },
        },
      );
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);
    } catch (error) {
      console.log('Error fetching student data', error);
    } finally {
      isLoading(false);
    }
  };

  const searchStudents = async (searchQuery) => {
    isLoading(true);
    try {
      setCurrentPage(1);
      const query = searchQuery.trim();
      if (!query) {
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/student/getStudentDetails?page=1&limit=10`,
        );

        setStudents(data.data);

        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/pagination/getStudentPagination`,
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
              `${VITE_BACKEND_BASE_API}/student/getStudentDetails`,
              {
                params: {
                  pin_number: query,
                },
              },
            );

            setStudents(data.data);

            const response = await axios.get(
              `${VITE_BACKEND_BASE_API}/pagination/getStudentPagination`,
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
              `${VITE_BACKEND_BASE_API}/student/getStudentDetails`,
              {
                params: {
                  student_full_name: query,
                },
              },
            );

            setStudents(data.data);

            const response = await axios.get(
              `${VITE_BACKEND_BASE_API}/pagination/getStudentPagination`,
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
          console.log('Error fetching student data');
        }
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
    } finally {
      isLoading(false);
    }
  };

  const generateStudentDataReport = async () => {
    setReportLoading(true);
    try {
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/student/getStudentReportDetails`,
        {
          params: {
            category: selectedOption === 'All' ? null : selectedOption,
            name_of_university:
              selectedUniversity === 'All' ? null : selectedUniversity,
            branch: selectedBranch === 'All' ? null : selectedBranch,
          },
        },
      );

      if (response.status === 200) {
        // Convert the data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(response.data.data);
        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          'Student Data Report',
        );
        // Generate a binary string
        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        // Create a Blob from the buffer
        const blob = new Blob([excelBuffer], {
          type: 'application/octet-stream',
        });
        // Create a link to download the Blob
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `student_data_report.xlsx`;
        link.click();
      } else {
        console.error('Error fetching student report data');
      }
    } catch (err) {
      console.error('Error fetching student report data:', err);
    } finally {
      setReportLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      isLoading(true);
      try {
        setCurrentPage(1);
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/student/getStudentDetails`,
        );
        // // setStudentData(data.data);
        // setNoOfStudent(data.data.length);
        setStudents(data.data);

        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/pagination/getStudentPagination`,
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
      } finally {
        isLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="w-full colour-white p-[15px]">
      <div className="h-16 bg-[#ffffff] flex items-center px-4 rounded-md justify-between ">
        <div className="flex-shrink-0">
          <DrawerBasic />
        </div>

        <div className="flex-grow flex justify-center items-center space-x-3">
          <span className="text-[25px] font-bold">Student</span>
          <span className="text-[18px]">{`  (${totalItems})`}</span>
        </div>

        <div className="flex-shrink-0">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              generateStudentDataReport();
            }}
            sx={{
              marginRight: 1,
              display: 'flex',
              alignItems: 'center',
              textTransform: 'none',
              fontWeight: 'bold',
              borderColor: 'primary.main',
              color: 'primary.main',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                borderColor: 'primary.main',
              },
            }}
          >
            <FileCopyIcon className="mr-2" />
            {reportLoading ? (
              <CircularProgress size={24} sx={{ color: 'blue' }} />
            ) : (
              'Generate Report'
            )}
          </Button>
        </div>

        <div className="flex-shrink-0">
          <DrawerFilters
            students={students}
            setStudents={setStudents}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            totalItems={totalItems}
            setTotalItems={setTotalItems}
            // currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            // totalPages={totalPages}
            setTotalPages={setTotalPages}
            // pageNumberList={pageNumberList}
            // setPageNumberList={setPageNumberList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStudents={filterStudents}
            searchStudents={searchStudents}
            selectedUniversity={selectedUniversity}
            setSelectedUniversity={setSelectedUniversity}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
        </div>

        {/* <div className="flex flex-row mr-3">
          <div className="relative inline-block text-left pr-10">
            <div className="flex flex-row">
              <div className="mt-[4px] flex flex-row mr-2">Category:-</div>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
              >
                {selectedOption}
                {showMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
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
                      className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${
                        selectedOption === option
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
          <div className="flex justify-center">
            <div className="search-container">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search something..."
                className="search-input"
                value={searchQuery}
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
                    searchStudents(searchQuery);
                  }
                }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default StudentNavbar;
