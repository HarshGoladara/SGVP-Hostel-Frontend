import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import AlumniStudentModal from './AlumniStudentModal.jsx';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import ActionDropdown from './ActionDropdown.jsx';
// import { CircularProgress } from '@mui/material';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import HairballSpinner from '../commonCustomComponents/HairballSpinner.jsx';
import toast from 'react-hot-toast';

const AlumniStudentTable = ({
  students,
  setStudents,
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

  const fetchStudentData = async (page) => {
    isLoading(true);
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/student/getAlumni?page=${page}&limit=10`,
      );
      setStudents(data.data);
    } catch (error) {
      console.error('Error fetching student data', error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    if (students) {
      setStudents(students);
    } else {
      fetchStudentData(currentPage);
    }
  }, [students]);

  useEffect(() => {
    fetchStudentData(currentPage);
  }, [currentPage]);

  const handleMoveBackToSGVPAction = async (student) => {
    try {
      const moveFromToAlumniBody = {
        pin_number: student.pin_number,
        is_alumni: false,
      };
      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/student/moveFromToAlumni`,
        moveFromToAlumniBody,
      );
      if (response.status === 200) {
        toast.success('Data Moved Back to SGVP');
        setStudents((prevStudents) =>
          prevStudents.filter((s) => s.pin_number !== student.pin_number),
        );
      } else {
        toast.error('Error Try Again');
      }
    } catch (error) {
      console.log('Error moving data from alumni', error);
      toast.error('Error Moving Data from Alumni');
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
            <tr className="bg-gray-200 rounded-2xl">
              {/* Apply rounded corners to the entire row */}
              <th className="py-2 px-4 text-left font-bold rounded-tl-2xl rounded-bl-2xl">
                Photo
              </th>
              {/* Rounded left side */}
              <th className="py-2 px-4 text-left font-bold">Name</th>
              <th className="py-2 px-4 text-left font-bold">Mobile Number</th>
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
                  key={student.pin_number}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-2 px-4">
                    {student.student_photo_url ? (
                      <img
                        src={student.student_photo_url}
                        alt={student.student_full_name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white text-lg font-bold rounded-full">
                        {student.student_full_name.charAt(0)}
                      </div>
                    )}
                  </td>
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
                  <td className="py-2 px-4">
                    Action
                    <ActionDropdown
                      onActionSelect={(action) => {
                        if (action === 'Show') {
                          handleShowDetails(student);
                        } else if (action === 'Move Back To SGVP') {
                          handleMoveBackToSGVPAction(student);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AlumniStudentModal
          students={students}
          setStudents={setStudents}
          student={selectedStudent}
          open={modalOpen}
          onClose={handleCloseModal}
        />
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

export default AlumniStudentTable;
