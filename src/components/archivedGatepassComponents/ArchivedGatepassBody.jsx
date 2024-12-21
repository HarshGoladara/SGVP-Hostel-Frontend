import React, { act, useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import ActionDropdown from './ActionDropdown.jsx';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import HairballSpinner from '../commonCustomComponents/HairballSpinner.jsx';

const ArchivedGatepassTable = ({
  gatepasses,
  setGatepasses,
  currentPage,
  setCurrentPage,
  totalPages,
  // setTotalPages,
  pageNumberList,
  setPageNumberList,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  loading,
  isLoading,
}) => {
  const [selectedGatepass, setSelectedGatepass] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchGatepasses = async (page) => {
    try {
      isLoading(true);
      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/gatepass/getGatepassFromArchived`,
        {
          params: {
            page: page,
            limit: 10,
          },
        },
      );
      setGatepasses(data.data);
    } catch (error) {
      console.error('Error fetching gatepass data', error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    // console.log("searchResults in body:", searchResults);
    if (gatepasses) {
      setGatepasses(gatepasses);
    } else {
      fetchGatepasses(currentPage);
    }
  }, [gatepasses]);

  useEffect(() => {
    fetchGatepasses(currentPage);
  }, [currentPage]);

  const handleShowDetails = (gatepass) => {
    setSelectedGatepass(gatepass);
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
              {/* Rounded left side */}
              <th className="py-2 px-4 text-left font-bold">GID</th>
              <th className="py-2 px-4 text-left font-bold">Pin</th>
              <th className="py-2 px-4 text-left font-bold">Name</th>
              <th className="py-2 px-4 text-left font-bold">Out Going</th>
              <th className="py-2 px-4 text-left font-bold">Permission Upto</th>
              <th className="py-2 px-4 text-left font-bold">Entry</th>
              <th className="py-2 px-4 text-left font-bold">Reason</th>
              {/* Rounded right side */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">
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
              gatepasses.map((gatepass) => (
                <tr
                  key={gatepass.gatepass_number}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-2 px-4">
                    <span className="font-bold">
                      {gatepass.gatepass_number}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span className="font-bold">{gatepass.pin_number}</span>
                  </td>
                  <td className="py-2 px-4">{gatepass.student_full_name}</td>
                  <td className="py-2 px-4">
                    {new Date(gatepass.outgoing_timestamp).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(
                      gatepass.permission_upto_timestamp,
                    ).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    {gatepass.in_timestamp
                      ? new Date(gatepass.in_timestamp).toLocaleString()
                      : '-'}
                  </td>
                  <td className="py-2 px-4">{gatepass.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

export default ArchivedGatepassTable;
