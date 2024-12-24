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
  const [MorningAttendance, setMorningAttendance] = useState(null);
  const [EveningAttendance, setEveningAttendance] = useState(null);
  const [NightAttendance, setNightAttendance] = useState(null);
  const [SundayAttendance, setSundayAttendance] = useState(null);

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
        toast.error('Error Loading morning attendance.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Loading morning attendance.');
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
          <Card sx={{ width: 250, height: 200 }}>
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
                    backgroundColor: `${MorningAttendance !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {MorningAttendance !== null ? (
                    `${searchQuery.trim() ? `${MorningAttendance.length}` : `${MorningAttendance.length}/${noOfStudents}`}`
                  ) : (
                    // `${MorningAttendance.length}/${noOfStudents}`
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
              {/* Generate Report Button */}
              {MorningAttendance !== null && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => generateReport('Morning', MorningAttendance)}
                  sx={{ marginTop: 2 }}
                >
                  Generate Report
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
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
                    backgroundColor: `${EveningAttendance !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {EveningAttendance !== null ? (
                    `${searchQuery.trim() ? `${EveningAttendance.length}` : `${EveningAttendance.length}/${noOfStudents}`}`
                  ) : (
                    // `${EveningAttendance.length}/${noOfStudents}`
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
              {/* Generate Report Button */}
              {EveningAttendance !== null && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => generateReport('Evening', EveningAttendance)}
                  sx={{ marginTop: 2 }}
                >
                  Generate Report
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
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
                    backgroundColor: `${NightAttendance !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {NightAttendance !== null ? (
                    `${searchQuery.trim() ? `${NightAttendance.length}` : `${NightAttendance.length}/${noOfStudents}`}`
                  ) : (
                    // `${NightAttendance.length}/${noOfStudents}`
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
              {/* Generate Report Button */}
              {NightAttendance !== null && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => generateReport('Night', NightAttendance)}
                  sx={{ marginTop: 2 }}
                >
                  Generate Report
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        {new Date().getDay() === 0 && ( //condition to check whether today is sunday or not
          <div className="flex flex-col">
            <Card sx={{ width: 250, height: 200 }}>
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
                      backgroundColor: `${SundayAttendance !== null ? '#2196f3' : ''}`, // Blue background
                      color: '#fff', // White text
                      display: 'inline-block',
                      textAlign: 'center',
                      fontSize: '1.5rem', // Adjust font size
                      minWidth: '50px', // Ensure oval shape
                    }}
                  >
                    {SundayAttendance !== null ? (
                      `${searchQuery.trim() ? `${SundayAttendance.length}` : `${SundayAttendance.length}/${noOfStudents}`}`
                    ) : (
                      // `${SundayAttendance.length}/${noOfStudents}`
                      <CustomCircularLoader
                        size={50}
                        logoSrc="/images/logo.jpg"
                      />
                    )}
                  </Box>
                </Typography>
                {/* Generate Report Button */}
                {SundayAttendance !== null && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => generateReport('Sunday', SundayAttendance)}
                    sx={{ marginTop: 2 }}
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

      <div>{/*  */}</div>
    </div>
  );
};

export default AttendanceBody;
