import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import './css/StudentNavbar.css';
import DrawerBasic from '../commonCustomComponents/DrawerBasic.jsx';

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
  isLoading,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [pinNumber, setPinNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filterStudents = async (option) => {
    isLoading(true);
    try {
      setCurrentPage(1);
      if (option === 'All') {
        const { data } = await axios.get(
          `${VITE_BACKEND_BASE_API}/student/getStudentDetails`,
          {
            params: {
              page: 1,
              limit: 10,
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
              page: 1,
              limit: 10,
              category: option,
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
              category: option,
            },
          },
        );
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      }
    } catch (error) {
      console.log('Error fetching student data', error);
    } finally {
      isLoading(false);
    }
  };

  const searchStudents = async () => {
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
        <div>
          <DrawerBasic />
        </div>
        <div>
          <span className="text-[25px] font-bold">Student</span>
          <span className="text-[18px]">{`  (${totalItems})`}</span>
        </div>
        <div className="flex flex-row mr-3">
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

export default StudentNavbar;

// import React, { useEffect, useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import axios from 'axios';
// import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
// import './css/StudentNavbar.css';

// function StudentNavbar() {
//   const [studentData, setStudentData] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('All');
//   const [showMenu, setShowMenu] = useState(false);
//   const [pinNumber, setPinNumber] = useState(''); // State for pin input

//   const options = ['All', 'Wing3', 'Dome', 'Vishvambharam'];

//   const handleSelect = (option) => {
//     setSelectedOption(option);
//     setShowMenu(false); // Close dropdown after selection
//   };

//   const handlePinInput = (e) => {
//     setPinNumber(e.target.value);
//   };

//   const searchByPinNumber = async () => {
//     if (!pinNumber) {
//       // setError('Please enter a pin number');
//       try {
//         const { data } = await axios.get(
//           `${VITE_BACKEND_BASE_API}/student/studentDetails`,
//         );
//         setStudentData(data.data);
//         // console.log("+++++student navbar student data:",data);
//       } catch (error) {
//         console.log(error);
//       }
//       return;
//     }

//     try {
//       const response = await axios.get(
//         'http://localhost:8000/api/student/studentDetailsByPinNumber',
//         {
//           params: {
//             pin_number: pinNumber,
//           },
//         },
//       );
//       setStudentData(response.data.rows);
//       // console.log("Search by pin:", response.data.rows);
//       // setError('');
//     } catch (err) {
//       // setError('Error fetching student data by pin');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const { data } = await axios.get(
//           `${VITE_BACKEND_BASE_API}/student/studentDetails`,
//         );
//         setStudentData(data.data);
//         // console.log("+++++student navbar student data:",data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <div className="w-full colour-white p-[15px]">
//       <div className="h-16 bg-[#ffffff] flex items-center px-4 rounded-md justify-between ">
//         <div>
//           <span className="text-[25px] font-bold">Student</span>
//           <span className="text-[18px]">{`  (${studentData?.length})`}</span>
//         </div>
//         <div className="flex flex-row mr-3">
//           <div className="relative inline-block text-left pr-10">
//             <div className="flex flex-row">
//               <div className="mt-[4px] flex flex-row mr-2">Filter</div>
//               <button
//                 onClick={() => setShowMenu(!showMenu)} // Toggle dropdown menu
//                 className="flex items-center border-[1.5px] border-black focus:border-[#37AFE1] rounded-md px-2 py-1 text-gray-700 focus:outline-none"
//               >
//                 {selectedOption}
//                 <ArrowDropDownIcon />
//               </button>
//             </div>
//             {showMenu && ( // Conditional render for dropdown
//               <div
//                 className={`absolute right-0 z-10 mt-1  pl-2 pr-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
//               >
//                 <div className="py-1" role="menu" aria-orientation="vertical">
//                   {options.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => handleSelect(option)}
//                       className={`block px-2 py-1 w-full text-left text-sm text-gray-700 rounded-md  ${selectedOption === option ? 'bg-[#37AFE1] text-white' : ''} `}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="flex justify-center">
//             <div className="search-container">
//               <span className="search-icon">
//                 <SearchIcon />
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search something..."
//                 className="search-input"
//                 onChange={handlePinInput}
//                 onFocus={(e) => {
//                   e.target.placeholder = 'Search Pin Number / Name';
//                   e.target.classList.add('focused');
//                 }}
//                 onBlur={(e) => {
//                   e.target.placeholder = 'Search something...';
//                   e.target.classList.remove('focused');
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     searchByPinNumber(); // Call the fetchGatepasses function when Enter is pressed
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentNavbar;
