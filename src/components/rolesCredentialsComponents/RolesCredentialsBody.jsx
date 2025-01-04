import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import RolesCredentialsModal from './RolesCredentialsModal';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import ActionDropdown from './ActionDropdown.jsx';
import { CircularProgress } from '@mui/material';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import HairballSpinner from '../commonCustomComponents/HairballSpinner.jsx';
import toast from 'react-hot-toast';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const RolesCredentialsTable = ({
  rolesCredentials,
  setRolesCredentials,
  currentPage,
  setCurrentPage,
  totalPages,
  // setTotalPages,
  pageNumberList,
  setPageNumberList,
  loading,
  isLoading,
}) => {
  const [selectedRolesCredential, setSelectedRolesCredential] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRolesCredentialData = async (page) => {
    try {
      isLoading(true);
      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/credential/getRolesAndCredentials?page=${page}&limit=10`,
      );
      setRolesCredentials(data.data);
    } catch (error) {
      console.error('Error fetching RolesCredentials data', error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    // console.log("searchResults in body:", searchResults);
    if (rolesCredentials) {
      setRolesCredentials(rolesCredentials);
    } else {
      fetchRolesCredentialData(currentPage);
    }
  }, [rolesCredentials]);

  useEffect(() => {
    fetchRolesCredentialData(currentPage);
  }, [currentPage]);

  const handleShowDetails = (rolesCredential) => {
    setSelectedRolesCredential(rolesCredential);
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
            <tr className="bg-gray-400 rounded-2xl">
              <th className="py-2 px-4 text-left font-bold">ID</th>
              <th className="py-2 px-4 text-left font-bold">Role</th>
              <th className="py-2 px-4 text-left font-bold">
                Gatepass Approval
              </th>
              <th className="py-2 px-4 text-left font-bold">
                Gatepass Creation
              </th>
              <th className="py-2 px-4 text-left font-bold">
                Attendance Marking
              </th>
              <th className="py-2 px-4 text-left font-bold">Room Allotment</th>
              <th className="py-2 px-4 text-left font-bold">
                Admission Credentials
              </th>
              <th className="py-2 px-4 text-left font-bold">Grant Access</th>
              <th className="py-2 px-4 text-left font-bold">Data Updation</th>
              {/* <th className="py-2 px-4 text-left font-bold rounded-tr-2xl rounded-br-2xl">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9">
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
              rolesCredentials.map((rolesCredential) => (
                <tr
                  key={rolesCredential.role_id}
                  className="border-b hover:bg-gradient-to-r from-blue-200 to-blue-400 odd:bg-gray-200 even:bg-gray-300"
                >
                  <td className="py-2 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {rolesCredential.role_id}
                      </span>
                      {/* <span className="text-gray-500 text-sm">
                        {rolesCredential.pin_number}
                      </span> */}
                      {/* Pin number in light font */}
                    </div>
                  </td>
                  <td className="py-2 px-4">{rolesCredential.role_name}</td>
                  <td className="py-2 px-4">
                    {rolesCredential.gatepass_approval_credential ? (
                      <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {rolesCredential.gatepass_creation_credential ? (
                      <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {rolesCredential.attendace_marking_credential ? (
                      <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {rolesCredential.room_allotment_credential ? (
                      <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {rolesCredential.admission_credential ? (
                      <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {rolesCredential.can_grant_access ? (
                      <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {rolesCredential.update_data_credentials ? (
                      <CheckCircleOutlineIcon style={{ color: 'green' }} />
                    ) : (
                      <HighlightOffIcon style={{ color: 'red' }} />
                    )}
                  </td>
                  {/* <td className="py-2 px-4">
                    Action
                    <ActionDropdown
                      onActionSelect={(action) => {
                        if (action === 'Show') {
                          handleShowDetails(rolesCredential);
                        } else if (action === 'Move To Alumni') {
                          handleMoveToAlumniAction(rolesCredential);
                        }
                      }}
                    />
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <RolesCredentialsModal
          rolesCredentials={rolesCredentials}
          setRolesCredentials={setRolesCredentials}
          rolesCredential={selectedRolesCredential}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
      {/* <div className="flex justify-between items-center py-4 mx-5">
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
      </div> */}
    </div>
  );
};

export default RolesCredentialsTable;
