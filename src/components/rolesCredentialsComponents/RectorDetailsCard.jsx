import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Divider,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import './css/DetailsCard.css';
import { UpdateDialog } from './UpdateDialog.jsx';
import { RectorUpdateDialog } from './RectorUpdateDialog.jsx';
import { useCookies } from 'react-cookie';
import { storage } from '../../firebase_config/firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import { CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';

const ReactorDetailsCard = ({ rectors, setRectors, rector, onClose }) => {
  const totalPages = 4;
  const [selectedRector, setSelectedRector] = useState(rector);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationDirection, setAnimationDirection] = useState('');
  const [rectorLoading, setRectorLoading] = useState(false);
  const [fatherLoading, setFatherLoading] = useState(false);
  const [motherLoading, setMotherLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState({
    rectorPhotoFile: null,
    fatherPhotoFile: null,
    motherPhotoFile: null,
  });
  const [
    photoUploadConfirmationDialogOpen,
    setPhotoUploadConfirmationDialogOpen,
  ] = useState(false);
  const [cookies] = useCookies(['token']);

  const gotoNextPage = () => {
    if (currentPage < totalPages) {
      setAnimationDirection('slide-out'); // Set to slide out
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setAnimationDirection('slide-in'); // Set to slide in
      }, 300); // Duration of the animation
    }
  };

  const gotoPreviousPage = () => {
    if (currentPage > 1) {
      setAnimationDirection('glide-out'); // Set to glide out
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setAnimationDirection('glide-in'); // Set to glide in
      }, 300); // Duration of the animation
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPhotoFile({ ...photoFile, [name]: files[0] }); // Store the file in state
    setPhotoUploadConfirmationDialogOpen(true); // Open the confirmation dialog after file selection
  };

  const handleDialogClose = () => {
    setPhotoFile({ ...photoFile, rectorPhotoFile: null }); // Reset the file if upload is canceled
    setPhotoUploadConfirmationDialogOpen(false);
  };

  const uploadImage = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: handle progress here if needed
        },
        (error) => {
          console.error('Upload failed:', error);
          setErrorMessage('Upload failed, please try again.');
          toast.error('Upload failed, please try again.');
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        },
      );
    });
  };

  const uploadRectorPhoto = async () => {
    try {
      setRectorLoading(true);

      const rectorPhotoUrl = await uploadImage(
        photoFile.rectorPhotoFile,
        `rectors/${selectedRector.name}/rector_photo`,
      );

      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/rector/updateRector`,
        {
          rector_id: selectedRector.rector_id,
          photo_url: rectorPhotoUrl,
        },
      );

      if (response.status === 200) {
        toast.success('Rector Photo Updated Successfully.');
        setSelectedRector({
          ...selectedRector,
          photo_url: rectorPhotoUrl,
        });
        setPhotoUploadConfirmationDialogOpen(false); // Close the confirmation dialog
      } else {
        toast.error('Error Updating Rector Photo');
      }
    } catch (error) {
      console.log('Error photo upload:', error);
      toast.error('Error Updating Rector Photo');
    } finally {
      setRectorLoading(false);
    }
  };

  const uploadFatherPhoto = async () => {
    try {
      //   setFatherLoading(true);
      //   const fatherPhotoUrl = await uploadImage(
      //     photoFile.fatherPhotoFile,
      //     `rectors/${selectedRector.name}/father_photo`,
      //   );
      //   const response = await axios.put(
      //     `${VITE_BACKEND_BASE_API}/updateData/updateParentDetails`,
      //     {
      //       rector_id: selectedRector.rector_id,
      //       father_photo_url: fatherPhotoUrl,
      //     },
      //   );
      //   if (response.status === 200) {
      //     toast.success('Father Photo Updated Successfully.');
      //     setSelectedRector({
      //       ...selectedRector,
      //       father_photo_url: fatherPhotoUrl,
      //     });
      //   } else {
      //     toast.error('Error Updating Father Photo');
      //   }
    } catch (error) {
      //   console.log('Error photo upload:', error);
      //   toast.error('Error Updating Father Photo');
    } finally {
      //   setFatherLoading(false);
    }
  };
  const uploadMotherPhoto = async () => {
    try {
      //   setMotherLoading(true);
      //   const motherPhotoUrl = await uploadImage(
      //     photoFile.motherPhotoFile,
      //     `rectors/${selectedRector.name}/student_photo`,
      //   );
      //   const response = await axios.put(
      //     `${VITE_BACKEND_BASE_API}/updateData/updateParentDetails`,
      //     {
      //       rector_id: selectedRector.rector_id,
      //       mother_photo_url: motherPhotoUrl,
      //     },
      //   );
      //   if (response.status === 200) {
      //     toast.success('Mother Photo Updated Successfully.');
      //     setSelectedRector({
      //       ...selectedRector,
      //       mother_photo_url: motherPhotoUrl,
      //     });
      //   } else {
      //     toast.error('Error Updating Mother Photo');
      //   }
    } catch (error) {
      //   console.log('Error photo upload:', error);
      //   toast.error('Error Updating Mother Photo');
    } finally {
      //   setMotherLoading(false);
    }
  };

  const isUpdateDialogEnabled = cookies.token.update_data_credentials;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
      }}
      className="bg-white rounded-xl shadow-lg min-w-[800px] min-h-[450px] p-6 h-[57%] w-[75%] transform transition-transform duration-300 scale-100 relative"
    >
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16 }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      {/* --------------------------page-1----------------------------- */}
      <div
        className={`flex flex-col ${currentPage === 1 ? animationDirection : 'hidden'}`}
      >
        <div className="flex justify-stretch">
          <div className="text-3xl font-bold">Rector Info</div>
          {isUpdateDialogEnabled && (
            <RectorUpdateDialog
              rectors={rectors}
              setRectors={setRectors}
              selectedRector={selectedRector}
              setSelectedRector={setSelectedRector}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4 relative group">
            {/* Fixed 20% width for the image */}
            <label htmlFor="upload-photo">
              {selectedRector.photo_url ? (
                <img
                  src={
                    selectedRector.photo_url ||
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s`
                  }
                  alt={selectedRector.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-5xl font-bold rounded-lg">
                  {selectedRector.name.charAt(0)}
                </div>
              )}

              {/* Overlay */}
              <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditIcon className="text-white text-4xl" />
              </div>
            </label>

            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <input
                  type="file"
                  id="upload-photo"
                  name="rectorPhotoFile"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedRector.name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              Rector ID :- {selectedRector.rector_id}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Mobile Number</div>
                  <div>{selectedRector.mobile_number}</div>
                </div>
                {/* <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Religion</div>
                  <div>{selectedRector.religion}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Caste</div>
                  <div>{selectedRector.caste}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Home Town</div>
                  <div>{selectedRector.city}</div>
                </div> */}
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Email</div>
                  <div>{selectedRector.email_id}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Role ID</div>
                  <div>{selectedRector.role_id}</div>
                </div>
              </div>
              <Divider />

              {/* <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Email</div>
                  <div>{selectedRector.student_email}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Date Of Birth
                  </div>
                  <div>
                    {new Date(selectedRector.dob).toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      },
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Nationality</div>
                  <div>{selectedRector.nationality}</div>
                </div>
              </div> */}

              {/* <Divider /> */}

              {/* <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Address</div>
                  <div className="text-[13px]">
                    {selectedRector.address}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/*........................ page logic ends her.............. */}

      {/* <div
        className="flex flex-row justify-end my-2 mx-2"
        style={{
          position: 'absolute',
          bottom: 10,
          right: '50%',
        }}
      >
        <div>{currentPage} - 4</div>
        <div className="cursor-pointer">
          <button
            disabled={currentPage == 1 ? true : false}
            className="disabled:text-gray-400"
            onClick={gotoPreviousPage}
          >
            <ChevronLeftIcon />
          </button>
        </div>
        <div className="cursor-pointer">
          <button
            disabled={currentPage == 4 ? true : false}
            className="disabled:text-gray-400"
            onClick={gotoNextPage}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div> */}

      {/* Confirmation Dialog */}
      <Dialog
        open={photoUploadConfirmationDialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirm Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to upload this photo for the rector? Once
            uploaded, it will replace the existing photo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={uploadRectorPhoto} color="primary" autoFocus>
            {rectorLoading ? (
              <CircularProgress size={24} sx={{ color: 'primary' }} />
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ReactorDetailsCard;
