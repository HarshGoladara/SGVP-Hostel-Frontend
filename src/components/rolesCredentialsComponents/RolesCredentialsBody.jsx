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
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AddRectorDialog } from './AddRectorDialog.jsx';
import RectorModal from './RectorModal.jsx';

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
  rectors,
  setRectors,
}) => {
  const [selectedRolesCredential, setSelectedRolesCredential] = useState(null);
  const [selectedRector, setSelectedRector] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rectorInfoModal, setRectorInfoModal] = useState(false);

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

  const fetchRectors = async () => {
    try {
      isLoading(true);
      const { data } = await axios.get(
        `${VITE_BACKEND_BASE_API}/rector/getRector`,
      );
      setRectors(data.data);
    } catch (error) {
      console.error('Error fetching rectors data', error);
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
    if (rectors) {
      setRectors(rectors);
    } else {
      fetchRectors();
    }
  }, [rectors]);

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

        <Divider />

        <div className="flex justify-between items-center my-2">
          <h2 className="text-[25px] ml-[42%] px-4 py-2 text-black rounded-lg shadow-md font-bold">
            Rector Info
          </h2>
          {/* <Button
            onClick={handleOpenAddRectorModal}
            variant="outlined"
            color="primary"
            size="medium"
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
            <AddCircleIcon className="mr-2" />
            Add Rector
          </Button> */}
          <AddRectorDialog
            rolesCredentials={rolesCredentials}
            setRolesCredentials={setRolesCredentials}
            selectedRolesCredential={selectedRolesCredential}
            setSelectedRolesCredential={setSelectedRolesCredential}
            fetchRectors={fetchRectors}
          />
        </div>

        <table className="min-w-full border-collapse text-s">
          <thead className="">
            <tr className="bg-gray-400 rounded-2xl">
              <th className="py-2 px-4 text-left font-bold rounded-tl-2xl rounded-bl-2xl">
                Photo
              </th>
              <th className="py-2 px-4 text-left font-bold">Name</th>
              <th className="py-2 px-4 text-left font-bold">Role ID</th>
              <th className="py-2 px-4 text-left font-bold">Rector ID</th>
              <th className="py-2 px-4 text-left font-bold">Email</th>
              <th className="py-2 px-4 text-left font-bold">Mobile No.</th>
              <th className="py-2 px-4 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">
                  <div className="relative py-8">
                    <div className="absolute inset-0 flex justify-center items-center h-auto">
                      <CustomCircularLoader
                        size={50}
                        logoSrc="/images/logo.jpg"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              rectors.map((rector) => (
                <tr
                  key={rector.rector_id}
                  className="border-b hover:bg-gradient-to-r from-blue-200 to-blue-400 odd:bg-gray-200 even:bg-gray-300"
                >
                  <td className="py-2 px-4">
                    {rector.photo_url ? (
                      <img
                        src={rector.photo_url}
                        alt={rector.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white text-lg font-bold rounded-full">
                        {rector.name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 font-bold">{rector.name}</td>
                  <td className="py-2 px-4">{rector.role_id}</td>
                  <td className="py-2 px-4">{rector.rector_id}</td>
                  <td className="py-2 px-4">{rector.email_id}</td>
                  <td className="py-2 px-4">{rector.mobile_number}</td>

                  <td className="py-2 px-4">
                    Action
                    <ActionDropdown
                      onActionSelect={(action) => {
                        if (action === 'Show') {
                          // handleShowDetails(rector);
                          setSelectedRector(rector);
                          setRectorInfoModal(true);
                        } else if (action === 'Edit') {
                          // handleMoveToAlumniAction(rector);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Divider />

        <RolesCredentialsModal
          rolesCredentials={rolesCredentials}
          setRolesCredentials={setRolesCredentials}
          rolesCredential={selectedRolesCredential}
          open={modalOpen}
          onClose={handleCloseModal}
        />

        <RectorModal
          rectors={rectors}
          setRectors={setRectors}
          rector={selectedRector}
          open={rectorInfoModal}
          onClose={() => {
            setRectorInfoModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default RolesCredentialsTable;
