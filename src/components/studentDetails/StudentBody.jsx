import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import StudentModal from './StudentModal';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchStudentData = async (page) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/student/studentDetails?page=${page}&limit=10`,
      );
      console.log(data.data[0]);
      setStudents(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching student data', error);
    }
  };

  const handleShowDetails = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchStudentData(currentPage);
  }, [currentPage]);

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

  return (
    <div className=" mx-4 mb-4 bg-white shadow-md rounded-lg">
      <div className="mt-4 mx-2">
        {' '}
        {/* Added horizontal margin with mx-2 */}
        <table className="min-w-full border-collapse text-s">
          <thead className="">
            <tr className="bg-gray-200 rounded-2xl">
              {' '}
              {/* Apply rounded corners to the entire row */}
              <th className="py-2 px-4 text-left font-bold rounded-tl-2xl rounded-bl-2xl">
                Photo
              </th>{' '}
              {/* Rounded left side */}
              <th className="py-2 px-4 text-left font-bold">Name</th>
              <th className="py-2 px-4 text-left font-bold">Room Number</th>
              <th className="py-2 px-4 text-left font-bold">Bed Number</th>
              <th className="py-2 px-4 text-left font-bold">Mobile Number</th>
              <th className="py-2 px-4 text-left font-bold rounded-tr-2xl rounded-br-2xl">
                Actions
              </th>{' '}
              {/* Rounded right side */}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
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
                    </span>{' '}
                    {/* Pin number in light font */}
                  </div>
                </td>
                <td className="py-2 px-4">{student.room_number}</td>
                <td className="py-2 px-4">{student.bed_number}</td>
                <td className="py-2 px-4">{student.student_contact_number}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleShowDetails(student)}
                    className="bg-[#37AFE1] text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <StudentModal
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
            {' '}
            {/* Center the page numbers */}
            {getPageNumbers().map((number, index) => (
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

export default StudentTable;
