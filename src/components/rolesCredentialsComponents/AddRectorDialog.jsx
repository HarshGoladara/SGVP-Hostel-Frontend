import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_config/firebase.js';

export const AddRectorDialog = ({
  rolesCredentials,
  setRolesCredentials,
  selectedRolesCredential,
  setSelectedRolesCredential,
  fetchRectors,
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState(selectedRolesCredential); // Initialize with student data
  const [loading, setLoading] = useState(false); // Loading state
  const [photoFile, setPhotoFile] = useState({
    rectorPhotoFile: null,
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update formData
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPhotoFile({ ...photoFile, [name]: files[0] }); // Store the file in state
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // console.log(formData);
      // console.log(photoFile.rectorPhotoFile);

      let rectorPhotoUrl = '';
      if (photoFile.rectorPhotoFile) {
        rectorPhotoUrl = await uploadImage(
          photoFile.rectorPhotoFile,
          `rectors/${formData.name}/rector_photo`,
        );
      }

      const data = {
        ...formData,
        photo_url: rectorPhotoUrl,
      };

      console.log(data);

      // console.log(formData);
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/rector/addRector`,
        data,
      );
      if (response.status === 201) {
        // console.log("Successfully updated alumni data.");
        toast.success('Rector Added successfully');
        // setSelectedRolesCredential(formData);
        fetchRectors();
      } else {
        toast.error('Error adding rector');
      }
    } catch (error) {
      console.error('Error adding rector:', error);
      toast.error('Error adding rector');
    } finally {
      setLoading(false);
      setOpenEditDialog(false);
    }
  };

  const convertToDateOnly = (isoDateString) => {
    const date = new Date(isoDateString);
    // Adjust to local timezone and format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {/* <IconButton
          onClick={() => setOpenEditDialog(true)}
        >
          <EditIcon />
        </IconButton> */}
      <Button
        onClick={() => setOpenEditDialog(true)}
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
      </Button>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Student Details</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              name="name"
              label="Full Name"
              value={formData?.name}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
            <TextField
              name="mobile_number"
              label="Contact Number"
              value={formData?.mobile_number}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
            <TextField
              name="email_id"
              label="Email"
              value={formData?.email_id}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              label="Rector Profile Photo"
              type="file"
              variant="outlined"
              name="rectorPhotoFile"
              onChange={handleFileChange}
              fullWidth
              // {...register('student_profile_photo', { required: true })}
              // error={!!errors.dob}
              // helperText={
              //   errors.dob ? 'Must upload a student profile photo' : ''
              // }
              InputLabelProps={{ shrink: true }}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
            {/* <TextField
                  name="religion"
                  label="Religion"
                  value={formData?.religion}
                  onChange={handleEditInputChange}
                  fullWidth
                  margin="normal"
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
                />
                <TextField
                  name="caste"
                  label="Caste"
                  value={formData?.caste}
                  onChange={handleEditInputChange}
                  fullWidth
                  margin="normal"
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
                /> */}
            {/* <TextField
                  name="city"
                  label="Home Town"
                  value={formData?.city}
                  onChange={handleEditInputChange}
                  fullWidth
                  margin="normal"
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
                /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <TextField
                  name="dob"
                  type="date"
                  label="Date of Birth"
                  value={convertToDateOnly(formData?.dob)}
                  onChange={handleEditInputChange}
                  fullWidth
                  margin="normal"
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
                /> */}
            {/* <TextField
                  name="nationality"
                  label="Nationality"
                  value={formData?.nationality}
                  onChange={handleEditInputChange}
                  fullWidth
                  margin="normal"
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
                /> */}
            {/* <TextField
                  name="postal_pin_number"
                  label="Postal Pin Number"
                  value={formData?.postal_pin_number}
                  onChange={handleEditInputChange}
                  fullWidth
                  margin="normal"
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
                /> */}
          </div>
          <div>
            {/* <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={formData?.address}
                  fullWidth
                  multiline
                  onChange={handleEditInputChange}
                  rows={4}
                  aria-colspan={200}
                  className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
                /> */}
          </div>
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'primary' }} />
            ) : (
              'Submit'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
