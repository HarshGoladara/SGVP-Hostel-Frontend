import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_config/firebase'; // Adjust the import according to your file structure
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import { TextField, Button, Grid, CircularProgress, Box } from '@mui/material';

const ParentDetailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [photoFile, setPhotoFile] = useState({
    fatherPhotoFile: null,
    motherPhotoFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const validateForm = (data) => {
    const alphabetRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /\S+@\S+\.\S+/; // Regular expression for email validation

    if (!data.pin_number || isNaN(data.pin_number))
      return 'Pin number is required and should be a number.';
    if (
      !data.father_name.trim() ||
      !alphabetRegex.test(data.father_name.trim())
    )
      return 'Father name is required.';
    if (
      !data.father_contact_number ||
      isNaN(data.father_contact_number) ||
      data.father_contact_number.length !== 10
    )
      return 'Father contact number is required and should be a valid number of 10 digits.';
    if (!data.father_email || !emailRegex.test(data.father_email))
      return 'A valid father email is required.';
    if (!photoFile.fatherPhotoFile) return 'Father photo is required.';
    if (
      !data.mother_name.trim() ||
      !alphabetRegex.test(data.mother_name.trim())
    )
      return 'Mother name is required.';
    if (
      !data.mother_contact_number ||
      isNaN(data.mother_contact_number) ||
      data.mother_contact_number.length !== 10
    )
      return 'Mother contact number is required and should be a valid number of 10 digits.';
    if (!photoFile.motherPhotoFile) return 'Mother photo is required.';
    if (
      !data.approval_person_name.trim() ||
      !alphabetRegex.test(data.approval_person_name.trim())
    )
      return 'Approval person name is required.';
    if (
      !data.approval_person_contact ||
      isNaN(data.approval_person_contact) ||
      data.approval_person_contact.length !== 10
    )
      return 'Approval person contact number is required and should be a valid number of 10 digits.';
    if (
      !data.approval_person_relation.trim() ||
      !alphabetRegex.test(data.approval_person_name.trim())
    )
      return 'Approval person relation is required.';
    if (
      !data.approval_person_email ||
      !emailRegex.test(data.approval_person_email)
    )
      return 'A valid approval person email is required.';

    return null;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validate the form
    const error = validateForm(data);
    if (error) {
      toast.error(error);
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    try {
      // Upload father photo to Firebase and get the URL
      let fatherPhotoUrl = '';
      if (photoFile.fatherPhotoFile) {
        fatherPhotoUrl = await uploadImage(
          photoFile.fatherPhotoFile,
          `students/${data.pin_number}/father_photo`,
        );
      }

      // Upload mother photo to Firebase and get the URL
      let motherPhotoUrl = '';
      if (photoFile.motherPhotoFile) {
        motherPhotoUrl = await uploadImage(
          photoFile.motherPhotoFile,
          `students/${data.pin_number}/mother_photo`,
        );
      }

      // Update form data with the URLs
      const updatedParentData = {
        ...data,
        father_photo_url: fatherPhotoUrl,
        mother_photo_url: motherPhotoUrl,
      };

      // Submit the form data along with image URLs to the server
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/addParentsdetails`,
        updatedParentData,
      );
      console.log('Parent data added successfully:', response.data);
      setSuccessMessage('Parent data added successfully!');
      toast.success('Parent data added successfully!');
    } catch (error) {
      console.error('Error submitting Parent data:', error);
      setErrorMessage('Error, Try again!');
      toast.error('Error, Try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setValue('pin_number', '');
    setValue('father_name', '');
    setValue('father_contact_number', '');
    setValue('father_email', '');
    setValue('mother_name', '');
    setValue('mother_contact_number', '');
    setValue('approval_person_name', '');
    setValue('approval_person_contact', '');
    setValue('approval_person_relation', '');
    setValue('approval_person_email', '');
    setPhotoFile({ fatherPhotoFile: null, motherPhotoFile: null });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 max-w-2xl mx-auto bg-slate-300 p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add Parent Details
      </h2>

      <Grid container spacing={3}>
        {/* Pin Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pin Number"
            variant="outlined"
            fullWidth
            {...register('pin_number', { required: 'Pin number is required.' })}
            error={!!errors.pin_number}
            helperText={errors.pin_number?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        {/* Father Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Father Name"
            variant="outlined"
            fullWidth
            {...register('father_name', {
              required: 'Father name is required.',
            })}
            error={!!errors.father_name}
            helperText={errors.father_name?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Father Contact Number"
            variant="outlined"
            fullWidth
            {...register('father_contact_number', {
              required: 'Father contact number is required.',
            })}
            error={!!errors.father_contact_number}
            helperText={errors.father_contact_number?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Father Email"
            variant="outlined"
            fullWidth
            {...register('father_email', {
              required: 'Father email is required.',
            })}
            error={!!errors.father_email}
            helperText={errors.father_email?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <input
            type="file"
            name="fatherPhotoFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        {/* Mother Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mother Name"
            variant="outlined"
            fullWidth
            {...register('mother_name', {
              required: 'Mother name is required.',
            })}
            error={!!errors.mother_name}
            helperText={errors.mother_name?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Mother Contact Number"
            variant="outlined"
            fullWidth
            {...register('mother_contact_number', {
              required: 'Mother contact number is required.',
            })}
            error={!!errors.mother_contact_number}
            helperText={errors.mother_contact_number?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <input
            type="file"
            name="motherPhotoFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>
      </Grid>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add Parent Details
      </h2>

      <Grid container spacing={3}>
        {/* Approval Person Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Approval Person Name"
            variant="outlined"
            fullWidth
            {...register('approval_person_name', {
              required: 'Approval person name is required.',
            })}
            error={!!errors.approval_person_name}
            helperText={errors.approval_person_name?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Approval Person Contact"
            variant="outlined"
            fullWidth
            {...register('approval_person_contact', {
              required: 'Approval person contact is required.',
            })}
            error={!!errors.approval_person_contact}
            helperText={errors.approval_person_contact?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Approval Person Relation"
            variant="outlined"
            fullWidth
            {...register('approval_person_relation', {
              required: 'Approval person relation is required.',
            })}
            error={!!errors.approval_person_relation}
            helperText={errors.approval_person_relation?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Approval Person Email"
            variant="outlined"
            fullWidth
            {...register('approval_person_email', {
              required: 'Approval person email is required.',
            })}
            error={!!errors.approval_person_email}
            helperText={errors.approval_person_email?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>
      </Grid>

      <div className="flex justify-center mt-6">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ width: 150 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
          {/* <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ width: 150 }}
          >
            Cancel
          </Button> */}
        </Box>
      </div>
    </form>
  );
};

export default ParentDetailForm;
