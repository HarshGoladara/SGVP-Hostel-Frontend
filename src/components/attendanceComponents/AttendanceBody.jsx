import React, { act, useEffect, useState } from 'react';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import { Grid2, Card, CardContent, Typography, Button } from '@mui/material';
import { Divider } from '@mui/material';
import { Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WeekendIcon from '@mui/icons-material/Weekend';
import * as XLSX from 'xlsx'; // Import XLSX library
import { TempleHindu } from '@mui/icons-material';
import dayjs from 'dayjs';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const AttendanceBody = ({
  selectedCategoryOption,
  selectedStatusOption,
  startDate,
  // setStartDate,
  endDate,
  // setEndDate,
  searchQuery,
  setSearchQuery,
}) => {
  const [noOfStudents, setNoOfStudents] = useState(null);
  const [morningAttendance, setMorningAttendance] = useState(null);
  const [morningAttendanceTable, setMorningAttendanceTable] = useState(null);
  const [eveningAttendance, setEveningAttendance] = useState(null);
  const [eveningAttendanceTable, setEveningAttendanceTable] = useState(null);
  const [nightAttendance, setNightAttendance] = useState(null);
  const [nightAttendanceTable, setNightAttendanceTable] = useState(null);
  const [sundayAttendance, setSundayAttendance] = useState(null);
  const [sundayAttendanceTable, setSundayAttendanceTable] = useState(null);

  const loadTotalStudents = async () => {
    setNoOfStudents(null);
    try {
      let loadParams = {};
      if (selectedCategoryOption !== 'All') {
        loadParams.category = selectedCategoryOption;
      }
      const query = searchQuery.trim();
      if (query) {
        const isPin = /^\d+$/.test(query);
        if (isPin) {
          loadParams.pin_number = query;
        } else {
          loadParams.student_full_name = query;
        }
      }
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getTotalStudents`,
        {
          params: loadParams,
        },
      );
      // console.log(response);
      if (response.status === 200) {
        setNoOfStudents(response.data.totalStudents);
      } else {
        toast.error('Error counting total students.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error: counting total students.');
    }
  };

  const loadMorningAttendance = async () => {
    setMorningAttendance(null);
    try {
      // console.log(new Date().toLocaleDateString().split('/').reverse().join('-'));
      let loadParams = {
        // date: new Date().toLocaleDateString().split('/').reverse().join('-'),
        status: selectedStatusOption.toLowerCase(),
      };
      if (selectedCategoryOption !== 'All') {
        loadParams.category = selectedCategoryOption;
      }
      const query = searchQuery.trim();
      if (query) {
        const isPin = /^\d+$/.test(query);
        if (isPin) {
          loadParams.pin_number = query;
        } else {
          loadParams.student_full_name = query;
        }
      }
      if (startDate) {
        loadParams.startDate = dayjs(startDate).format('YYYY-MM-DD');
      }
      if (endDate) {
        loadParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
      }
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getMorningAttendance`,
        {
          params: loadParams,
        },
      );
      // console.log(response);
      if (response.status === 200) {
        setMorningAttendance(response.data.data);
      } else {
        toast.error('Error Loading Morning Attendance.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Loading Morning Attendance.');
    }
  };
  const loadMorningAttendanceTable = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getMorningAttendanceTable`,
      );
      // console.log(response.data.data);
      if (response.status === 200) {
        setMorningAttendanceTable(response.data.data);
      } else {
        toast.error('Error Loading Morning Attendance Table.');
      }
    } catch (err) {
      console.log('Error Loading Morning Attendance Table.', err);
      toast.error('Error Loading Morning Attendance Table.');
    } finally {
    }
  };
  const loadEveningAttendance = async () => {
    setEveningAttendance(null);
    try {
      let loadParams = {
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
        status: selectedStatusOption.toLowerCase(),
      };
      if (selectedCategoryOption !== 'All') {
        loadParams.category = selectedCategoryOption;
      }
      const query = searchQuery.trim();
      if (query) {
        const isPin = /^\d+$/.test(query);
        if (isPin) {
          loadParams.pin_number = query;
        } else {
          loadParams.student_full_name = query;
        }
      }
      if (startDate) {
        loadParams.startDate = dayjs(startDate).format('YYYY-MM-DD');
      }
      if (endDate) {
        loadParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
      }
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getEveningAttendance`,
        {
          params: loadParams,
        },
      );
      // console.log(response);
      if (response.status === 200) {
        setEveningAttendance(response.data.data);
      } else {
        toast.error('Error Loading Evening Attendance.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Loading Evening Attendance.');
    }
  };
  const loadEveningAttendanceTable = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getEveningAttendanceTable`,
      );
      // console.log(response);
      if (response.status === 200) {
        setEveningAttendanceTable(response.data.data);
      } else {
        toast.error('Error Loading Evening Attendance Table.');
      }
    } catch (err) {
      console.log('Error Loading Evening Attendance Table.', err);
      toast.error('Error Loading Evening Attendance Table.');
    } finally {
    }
  };
  const loadNightAttendance = async () => {
    setNightAttendance(null);
    try {
      let loadParams = {
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
        status: selectedStatusOption.toLowerCase(),
      };
      if (selectedCategoryOption !== 'All') {
        loadParams.category = selectedCategoryOption;
      }
      const query = searchQuery.trim();
      if (query) {
        const isPin = /^\d+$/.test(query);
        if (isPin) {
          loadParams.pin_number = query;
        } else {
          loadParams.student_full_name = query;
        }
      }
      if (startDate) {
        loadParams.startDate = dayjs(startDate).format('YYYY-MM-DD');
      }
      if (endDate) {
        loadParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
      }
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getNightAttendance`,
        {
          params: loadParams,
        },
      );
      // console.log(response);
      if (response.status === 200) {
        setNightAttendance(response.data.data);
      } else {
        toast.error('Error Loading Night Attendance.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Loading Night Attendance.');
    }
  };
  const loadNightAttendanceTable = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getNightAttendanceTable`,
      );
      // console.log(response);
      if (response.status === 200) {
        setNightAttendanceTable(response.data.data);
      } else {
        toast.error('Error Loading Night Attendance Table.');
      }
    } catch (err) {
      console.log('Error Loading Night Attendance Table.', err);
      toast.error('Error Loading Night Attendance Table.');
    } finally {
    }
  };
  const loadSundayAttendance = async () => {
    setSundayAttendance(null);
    try {
      let loadParams = {
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
        status: selectedStatusOption.toLowerCase(),
      };
      if (selectedCategoryOption !== 'All') {
        loadParams.category = selectedCategoryOption;
      }
      const query = searchQuery.trim();
      if (query) {
        const isPin = /^\d+$/.test(query);
        if (isPin) {
          loadParams.pin_number = query;
        } else {
          loadParams.student_full_name = query;
        }
      }
      if (startDate) {
        loadParams.startDate = dayjs(startDate).format('YYYY-MM-DD');
      }
      if (endDate) {
        loadParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
      }
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getSundayAttendance`,
        {
          params: loadParams,
        },
      );
      // console.log(response);
      if (response.status === 200) {
        setSundayAttendance(response.data.data);
      } else {
        toast.error('Error Loading Sunday Attendance.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Loading Sunday Attendance.');
    }
  };
  const loadSundayAttendanceTable = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/attendance/getSundayAttendanceTable`,
      );
      // console.log(response);
      if (response.status === 200) {
        setSundayAttendanceTable(response.data.data);
      } else {
        toast.error('Error Loading Sunday Attendance Table.');
      }
    } catch (err) {
      console.log('Error Loading Sunday Attendance Table.', err);
      toast.error('Error Loading Sunday Attendance Table.');
    } finally {
    }
  };

  useEffect(() => {
    loadTotalStudents(selectedCategoryOption);
  }, [selectedCategoryOption, searchQuery]);

  useEffect(() => {
    // console.log(new Date());
    loadMorningAttendance();
    loadEveningAttendance();
    loadNightAttendance();
    loadSundayAttendance();
  }, [
    selectedCategoryOption,
    selectedStatusOption,
    startDate,
    endDate,
    searchQuery,
  ]);

  useEffect(() => {
    loadMorningAttendanceTable();
    loadEveningAttendanceTable();
    loadNightAttendanceTable();
    loadSundayAttendanceTable();
  }, []);

  // Function to generate and download the Excel file
  const generateReport = (attendanceType, attendance) => {
    // const data = attendance;
    let data = [];
    if (searchQuery.trim()) {
      // data.push({});
      attendance.map((row) => {
        data.push({
          Date: new Date(row.date).toLocaleDateString(),
          Attendance: selectedStatusOption,
        });
      });
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');
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
      link.download = `${searchQuery.trim().split(' ').join('_')}_${attendanceType}_${selectedStatusOption}_Attendance_Report_${dayjs(startDate).format('YYYY-MM-DD')}_${dayjs(endDate).format('YYYY-MM-DD')}.xlsx`;
      link.click();
    } else {
      attendance.map((row) => {
        data.push({
          'Student Name': row.student_full_name,
          'Student Contact No': row.student_contact_number,
          'Student Email': row.student_email,
          University: row.name_of_university,
          'Current Year': row.current_year,
          'Current Sem': row.current_sem,
          'Father Name': row.father_name,
          'Father Contact No': row.father_contact_number,
          'Room No': row.room_number,
          'Bed No': row.bed_number,
        });
      });
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');
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
      link.download = `${selectedCategoryOption}_${attendanceType}_${selectedStatusOption}_Attendance_Report_${new Date().toLocaleDateString()}.xlsx`;
      link.click();
    }
  };

  return (
    <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
      <div className="my-2 mx-5 grid grid-flow-col justify-around">
        <div className="flex flex-col">
          <Card
            sx={{
              width: 250,
              height: 200,
              background:
                'linear-gradient(90deg, #EFCC25,white, white, #EFCC25)',
            }}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <WbSunnyIcon fontSize="large" />
              <Typography variant="h6">Morning Attendance</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${morningAttendance !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {morningAttendance !== null && noOfStudents !== null ? (
                    `${searchQuery.trim() ? `${morningAttendance.length}` : `${morningAttendance.length}/${noOfStudents}`}`
                  ) : (
                    // `${morningAttendance.length}/${noOfStudents}`
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
              {/* Generate Report Button */}
              {morningAttendance !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => generateReport('Morning', morningAttendance)}
                  sx={{
                    marginTop: 2,
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
                  Generate Report
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card
            sx={{
              width: 250,
              height: 200,
              background:
                'linear-gradient(90deg, #4895ef,white, white, #4895ef)',
            }}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <NightsStayIcon fontSize="large" />
              <Typography variant="h6">Evening Attendance</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${eveningAttendance !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {eveningAttendance !== null ? (
                    `${searchQuery.trim() ? `${eveningAttendance.length}` : `${eveningAttendance.length}/${noOfStudents}`}`
                  ) : (
                    // `${eveningAttendance.length}/${noOfStudents}`
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
              {/* Generate Report Button */}
              {eveningAttendance !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => generateReport('Evening', eveningAttendance)}
                  sx={{
                    marginTop: 2,
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
                  Generate Report
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card
            sx={{
              width: 250,
              height: 200,
              background:
                'linear-gradient(90deg, #4361ee,white, white, #4361ee)',
            }}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <BedtimeIcon fontSize="large" />
              <Typography variant="h6">Night Attendance</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${nightAttendance !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {nightAttendance !== null ? (
                    `${searchQuery.trim() ? `${nightAttendance.length}` : `${nightAttendance.length}/${noOfStudents}`}`
                  ) : (
                    // `${nightAttendance.length}/${noOfStudents}`
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
              {/* Generate Report Button */}
              {nightAttendance !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => generateReport('Night', nightAttendance)}
                  sx={{
                    marginTop: 2,
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
                  Generate Report
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        {new Date().getDay() === 0 && ( //condition to check whether today is sunday or not
          <div className="flex flex-col">
            <Card
              sx={{
                width: 250,
                height: 200,
                background:
                  'linear-gradient(90deg, #d66853,white, white, #d66853)',
              }}
            >
              <CardContent
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <TempleHindu fontSize="large" />
                <Typography variant="h6">Sunday Attendance</Typography>
                <Typography variant="h4" sx={{ marginTop: 1 }}>
                  <Box
                    sx={{
                      marginTop: 1,
                      paddingX: 4,
                      paddingY: 1,
                      borderRadius: '25px',
                      backgroundColor: `${sundayAttendance !== null ? '#2196f3' : ''}`, // Blue background
                      color: '#fff', // White text
                      display: 'inline-block',
                      textAlign: 'center',
                      fontSize: '1.5rem', // Adjust font size
                      minWidth: '50px', // Ensure oval shape
                    }}
                  >
                    {sundayAttendance !== null ? (
                      `${searchQuery.trim() ? `${sundayAttendance.length}` : `${sundayAttendance.length}/${noOfStudents}`}`
                    ) : (
                      // `${sundayAttendance.length}/${noOfStudents}`
                      <CustomCircularLoader
                        size={50}
                        logoSrc="/images/logo.jpg"
                      />
                    )}
                  </Box>
                </Typography>
                {/* Generate Report Button */}
                {sundayAttendance !== null && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => generateReport('Sunday', sundayAttendance)}
                    sx={{
                      marginTop: 2,
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
                    Generate Report
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Divider />

      <div className="attendance-table">
        <h2 className="inline-block ml-5 mb-2 mt-2 px-4 py-2 bg-blue-200 text-black rounded-lg shadow-md">
          Today's Morning Attendance
        </h2>
        <table className="min-w-full border-collapse text-s">
          <thead>
            <tr className="bg-gray-400 rounded-2xl">
              <th className="py-2 px-4 text-left font-bold">Category</th>
              <th className="py-2 px-4 text-left font-bold">Total Students</th>
              <th className="py-2 px-4 text-left font-bold">Present</th>
              <th className="py-2 px-4 text-left font-bold">Absent</th>
              <th className="py-2 px-4 text-left font-bold">Leave</th>
              <th className="py-2 px-4 text-left font-bold">Sick</th>
              <th className="py-2 px-4 text-left font-bold">Exam</th>
              <th className="py-2 px-4 text-left font-bold">College</th>
              <th className="py-2 px-4 text-left font-bold">Job</th>
            </tr>
          </thead>
          <tbody>
            {morningAttendanceTable?.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{row.category}</td>
                <td className="py-2 px-4">{row.total}</td>
                <td className="py-2 px-4">{row.present}</td>
                <td className="py-2 px-4">{row.absent}</td>
                <td className="py-2 px-4">{row.leave}</td>
                <td className="py-2 px-4">{row.sick}</td>
                <td className="py-2 px-4">{row.exam}</td>
                <td className="py-2 px-4">{row.college}</td>
                <td className="py-2 px-4">{row.job}</td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4">Total</td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.total),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.present),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.absent),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.leave),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.sick),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.exam),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.college),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {morningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.job),
                  0,
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider />

      <div className="attendance-table">
        <h2 className="inline-block ml-5 mb-2 mt-2 px-4 py-2 bg-blue-200 text-black rounded-lg shadow-md">
          Today's Evening Attendance
        </h2>
        <table className="min-w-full border-collapse text-s">
          <thead>
            <tr className="bg-gray-400 rounded-2xl">
              <th className="py-2 px-4 text-left font-bold">Category</th>
              <th className="py-2 px-4 text-left font-bold">Total Students</th>
              <th className="py-2 px-4 text-left font-bold">Present</th>
              <th className="py-2 px-4 text-left font-bold">Absent</th>
              <th className="py-2 px-4 text-left font-bold">Leave</th>
              <th className="py-2 px-4 text-left font-bold">Sick</th>
              <th className="py-2 px-4 text-left font-bold">Exam</th>
              <th className="py-2 px-4 text-left font-bold">College</th>
              <th className="py-2 px-4 text-left font-bold">Job</th>
            </tr>
          </thead>
          <tbody>
            {eveningAttendanceTable?.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{row.category}</td>
                <td className="py-2 px-4">{row.total}</td>
                <td className="py-2 px-4">{row.present}</td>
                <td className="py-2 px-4">{row.absent}</td>
                <td className="py-2 px-4">{row.leave}</td>
                <td className="py-2 px-4">{row.sick}</td>
                <td className="py-2 px-4">{row.exam}</td>
                <td className="py-2 px-4">{row.college}</td>
                <td className="py-2 px-4">{row.job}</td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4">Total</td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.total),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.present),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.absent),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.leave),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.sick),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.exam),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.college),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {eveningAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.job),
                  0,
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider />

      <div className="attendance-table">
        <h2 className="inline-block ml-5 mb-2 mt-2 px-4 py-2 bg-blue-200 text-black rounded-lg shadow-md">
          Today's Night Attendance
        </h2>
        <table className="min-w-full border-collapse text-s">
          <thead>
            <tr className="bg-gray-400 rounded-2xl">
              <th className="py-2 px-4 text-left font-bold">Category</th>
              <th className="py-2 px-4 text-left font-bold">Total Students</th>
              <th className="py-2 px-4 text-left font-bold">Present</th>
              <th className="py-2 px-4 text-left font-bold">Absent</th>
              <th className="py-2 px-4 text-left font-bold">Leave</th>
              <th className="py-2 px-4 text-left font-bold">Sick</th>
              <th className="py-2 px-4 text-left font-bold">Exam</th>
              <th className="py-2 px-4 text-left font-bold">College</th>
              <th className="py-2 px-4 text-left font-bold">Job</th>
            </tr>
          </thead>
          <tbody>
            {nightAttendanceTable?.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{row.category}</td>
                <td className="py-2 px-4">{row.total}</td>
                <td className="py-2 px-4">{row.present}</td>
                <td className="py-2 px-4">{row.absent}</td>
                <td className="py-2 px-4">{row.leave}</td>
                <td className="py-2 px-4">{row.sick}</td>
                <td className="py-2 px-4">{row.exam}</td>
                <td className="py-2 px-4">{row.college}</td>
                <td className="py-2 px-4">{row.job}</td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4">Total</td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.total),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.present),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.absent),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.leave),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.sick),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.exam),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.college),
                  0,
                )}
              </td>
              <td className="py-2 px-4">
                {nightAttendanceTable?.reduce(
                  (acc, row) => acc + Number(row.job),
                  0,
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider />

      {new Date().getDay() === 0 && (
        <div className="attendance-table">
          <h2 className="inline-block ml-5 mb-2 mt-2 px-4 py-2 bg-blue-200 text-black rounded-lg shadow-md">
            Today's Sadhu Ashram Sunday Attendance
          </h2>
          <table className="min-w-full border-collapse text-s">
            <thead>
              <tr className="bg-gray-400 rounded-2xl">
                <th className="py-2 px-4 text-left font-bold">Category</th>
                <th className="py-2 px-4 text-left font-bold">
                  Total Students
                </th>
                <th className="py-2 px-4 text-left font-bold">Present</th>
                <th className="py-2 px-4 text-left font-bold">Absent</th>
                <th className="py-2 px-4 text-left font-bold">Leave</th>
                <th className="py-2 px-4 text-left font-bold">Sick</th>
                <th className="py-2 px-4 text-left font-bold">Exam</th>
                <th className="py-2 px-4 text-left font-bold">College</th>
                <th className="py-2 px-4 text-left font-bold">Job</th>
              </tr>
            </thead>
            <tbody>
              {sundayAttendanceTable?.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{row.category}</td>
                  <td className="py-2 px-4">{row.total}</td>
                  <td className="py-2 px-4">{row.present}</td>
                  <td className="py-2 px-4">{row.absent}</td>
                  <td className="py-2 px-4">{row.leave}</td>
                  <td className="py-2 px-4">{row.sick}</td>
                  <td className="py-2 px-4">{row.exam}</td>
                  <td className="py-2 px-4">{row.college}</td>
                  <td className="py-2 px-4">{row.job}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 px-4">Total</td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.total),
                    0,
                  )}
                </td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.present),
                    0,
                  )}
                </td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.absent),
                    0,
                  )}
                </td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.leave),
                    0,
                  )}
                </td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.sick),
                    0,
                  )}
                </td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.exam),
                    0,
                  )}
                </td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.college),
                    0,
                  )}
                </td>
                <td className="py-2 px-4">
                  {sundayAttendanceTable?.reduce(
                    (acc, row) => acc + Number(row.job),
                    0,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div>{/*  */}</div>
    </div>
  );
};

export default AttendanceBody;
