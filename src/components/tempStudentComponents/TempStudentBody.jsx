import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import TempStudentModal from './TempStudentModal.jsx';
import {
  VITE_BACKEND_BASE_API,
  VITE_BACKEND_BASE,
} from '../../helper/envConfig/envConfig.js';
import ActionDropdown from './ActionDropdown.jsx';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import HairballSpinner from '../commonCustomComponents/HairballSpinner.jsx';
import toast from 'react-hot-toast';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TextField } from '@mui/material';

const TempStudentTable = ({
  students,
  setStudents,
  selectedOption,
  currentPage,
  setCurrentPage,
  totalPages,
  // setTotalPages,
  pageNumberList,
  setPageNumberList,
  loading,
  isLoading,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState(''); // 'confirm' or 'cancel'
  const [pinNumber, setPinNumber] = useState(''); // New state for pin number

  const statusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'orange';
    }
  };

  const fetchStudentData = async (page) => {
    try {
      isLoading(true);
      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/admission/getTempStudentDetails?page=${page}&limit=10`,
      );
      setStudents(data.data);
    } catch (error) {
      console.error('Error fetching student data', error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    // console.log("searchResults in body:", searchResults);
    if (students) {
      setStudents(students);
    } else {
      fetchStudentData(currentPage);
    }
  }, [students]);

  useEffect(() => {
    fetchStudentData(currentPage);
  }, [currentPage]);

  const handleConfirmAction = async (student) => {
    try {
      const confirmationBody = {
        entry_number: student.entry_number,
        pin_number: student.pin_number ? student.pin_number : pinNumber,
      };
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/confirmAdmission`,
        confirmationBody,
      );
      if (response.status === 200) {
        console.log(response);
        if (selectedOption === 'Cancelled') {
          setStudents((prevStudents) =>
            prevStudents.filter((s) => s.entry_number !== student.entry_number),
          );
        } else {
          const filteredStudents = [];
          const confirmedStudentBody = {
            ...student,
            admission_status: 'confirmed',
            pin_number: response.data.pin_number,
          };
          students.map((s) => {
            if (s.entry_number === student.entry_number) {
              filteredStudents.push(confirmedStudentBody);
            } else {
              filteredStudents.push(s);
            }
          });
          setStudents(filteredStudents);
        }
        toast.success('Student Admission Confirmed by Admin.');
      } else {
        toast.error('Admission Confirmation Error');
      }
    } catch (error) {
      console.log('error while confirming the admission', error);
      toast.error('Admission Confirmation Error');
    } finally {
      setPinNumber('');
    }
  };

  const handleCancelAction = async (student) => {
    try {
      const concellationBody = {
        entry_number: student.entry_number,
        pin_number: student.pin_number ? student.pin_number : -1,
      };
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/cancelAdmission`,
        concellationBody,
      );
      if (response.status === 200) {
        if (selectedOption === 'Confirmed') {
          setStudents((prevStudents) =>
            prevStudents.filter((s) => s.entry_number !== student.entry_number),
          );
        } else {
          const filteredStudents = [];
          const cancelledStudentBody = {
            ...student,
            admission_status: 'cancelled',
          };
          students.map((s) => {
            if (s.entry_number === student.entry_number) {
              filteredStudents.push(cancelledStudentBody);
            } else {
              filteredStudents.push(s);
            }
          });
          setStudents(filteredStudents);
        }
        toast.success('Student Admission Cancelled by Admin.');
      } else {
        toast.error('Admission Cancellation Error');
      }
    } catch (error) {
      console.log('error while cancelling the admission', error);
      toast.error('Admission Cancellation Error');
    } finally {
      //
    }
  };

  const handleShowDetails = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const openConfirmDialog = (type, student) => {
    setSelectedStudent(student);
    setConfirmDialogType(type);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleConfirmDialogAction = () => {
    if (confirmDialogType === 'confirm') {
      handleConfirmAction(selectedStudent);
    } else if (confirmDialogType === 'cancel') {
      handleCancelAction(selectedStudent);
    }
    handleConfirmDialogClose();
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      // Show all pages if total pages are 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Handle more than 5 pages
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pageNumbers.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }
    return pageNumbers;
  };

  useEffect(() => {
    setPageNumberList(getPageNumbers());
  }, [totalPages]);

  // return (
  //   <div className="mx-4 mb-4 bg-white shadow-md rounded-lg">
  //   </div>
  // );

  return (
    <div className=" mx-4 mb-4 bg-white shadow-md rounded-lg">
      <div className="mt-4 mx-2">
        {/* Added horizontal margin with mx-2 */}
        <table className="min-w-full border-collapse text-s">
          <thead className="">
            <tr className="bg-gray-400 rounded-2xl">
              {/* Apply rounded corners to the entire row */}
              <th className="py-2 px-4 text-left font-bold rounded-tl-2xl rounded-bl-2xl">
                Photo
              </th>
              {/* Rounded left side */}
              <th className="py-2 px-4 text-left font-bold">Form No.</th>
              <th className="py-2 px-4 text-left font-bold">Name</th>
              <th className="py-2 px-4 text-left font-bold">Mobile Number</th>
              <th className="py-2 px-4 text-left font-bold">
                Admission Status
              </th>
              <th className="py-2 px-4 text-left font-bold rounded-tr-2xl rounded-br-2xl">
                Actions
              </th>
              {/* Rounded right side */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">
                  <div className="relative py-8">
                    <div className="absolute inset-0 flex justify-center items-center h-auto">
                      <CustomCircularLoader
                        size={50}
                        logoSrc="/images/logo.jpg"
                      />
                      {/* <HairballSpinner
                        colors={{
                          fillColor1: '#c0392b',
                          fillColor2: '#d35400',
                          fillColor3: '#f39c12',
                          fillColor4: '#16a085',
                        }}
                        backgroundColor="#fff"
                        speed={1.5}
                        width={90}
                        height={90}
                        logoSrc="/images/logo.jpg"
                        logoSize={45}
                      /> */}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.entry_number}
                  className="border-b hover:bg-gradient-to-r from-blue-200 to-blue-400 odd:bg-gray-200 even:bg-gray-300"
                >
                  <td className="py-2 px-4">
                    {student.student_photo_url ? (
                      <img
                        src={`${VITE_BACKEND_BASE}${student.student_photo_url}`}
                        // src={student.student_photo_url}
                        alt={student.student_full_name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white text-lg font-bold rounded-full">
                        {student.student_full_name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4">{student.entry_number}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {student.student_full_name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {student.pin_number}
                      </span>
                      {/* Pin number in light font */}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    {student.student_contact_number}
                  </td>
                  {/* <td className="py-2 px-4">
                    {student.admission_status}
                  </td> */}
                  <td className="py-2 px-4 flex items-center space-x-2 pt-5">
                    {student.admission_status === 'confirmed' && (
                      <CheckCircleOutlineIcon
                        style={{ color: statusColor('confirmed') }}
                      />
                    )}
                    {student.admission_status === 'cancelled' && (
                      <HighlightOffIcon
                        style={{ color: statusColor('cancelled') }}
                      />
                    )}
                    {student.admission_status === 'pending' && (
                      <PendingIcon style={{ color: statusColor('pending') }} />
                    )}
                    <span
                      style={{ color: statusColor(student.admission_status) }}
                      className="capitalize font-bold"
                    >
                      {student.admission_status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    Action
                    <ActionDropdown
                      onActionSelect={(action) => {
                        if (action === 'Show') {
                          handleShowDetails(student);
                        } else if (action === 'Confirm') {
                          // handleConfirmAction(student);
                          openConfirmDialog('confirm', student);
                        } else if (action === 'Cancel') {
                          // handleCancelAction(student);
                          openConfirmDialog('cancel', student);
                        }
                      }}
                      student={student}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <TempStudentModal
          student={selectedStudent}
          open={modalOpen}
          onClose={handleCloseModal}
        />

        {/* <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to{' '}
              {confirmDialogType === 'confirm' ? 'confirm' : 'cancel'} admission
              for <strong>{selectedStudent?.student_full_name}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConfirmDialogClose}
              variant="outlined"
              color="primary"
              sx={{
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
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDialogAction}
              color={confirmDialogType === 'confirm' ? 'success' : 'error'}
              variant="outlined"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: `${confirmDialogType === 'confirm' ? 'success.main' : 'error.main'}`,
                color: `${confirmDialogType === 'confirm' ? 'success.main' : 'error.main'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: `${confirmDialogType === 'confirm' ? 'success.main' : 'error.main'}`,
                  color: 'white',
                  borderColor: `${confirmDialogType === 'confirm' ? 'success.main' : 'error.main'}`,
                },
              }}
            >
              {confirmDialogType === 'confirm'
                ? 'Confirm Admission'
                : 'Cancel Admission'}
            </Button>
          </DialogActions>
        </Dialog> */}

        <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to{' '}
              {confirmDialogType === 'confirm' ? 'confirm' : 'cancel'} admission
              for <strong>{selectedStudent?.student_full_name}</strong>?
            </DialogContentText>
            {confirmDialogType === 'confirm' &&
              selectedStudent?.pin_number === null && (
                <TextField
                  label="Pin Number"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={pinNumber}
                  onChange={(e) => setPinNumber(e.target.value)}
                />
              )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConfirmDialogClose}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDialogAction}
              color={confirmDialogType === 'confirm' ? 'success' : 'error'}
              variant="outlined"
              disabled={
                confirmDialogType === 'confirm' &&
                !pinNumber &&
                selectedStudent?.pin_number === null
              } // Disable if pin number is empty
            >
              {confirmDialogType === 'confirm'
                ? 'Confirm Admission'
                : 'Cancel Admission'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="flex justify-between items-center py-4 mx-5">
        <span className="text-gray-700 whitespace-nowrap">
          {currentPage} of {totalPages}
        </span>
        <div className="flex items-center justify-center w-full">
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`hover:bg-gray-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ArrowBack />
          </IconButton>
          <div className="flex items-center mx-2">
            {/* Center the page numbers */}
            {pageNumberList.map((number, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof number === 'number' && handlePageClick(number)
                }
                className={`mx-1 w-8 h-8 rounded-full flex items-center justify-center ${currentPage === number ? 'bg-[#37AFE1] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            ))}
          </div>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`hover:bg-gray-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TempStudentTable;
