import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box } from '@mui/material';

const SantReferenceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/addSantReference`,
        data,
      );
      console.log(response.data);
      setSuccessMessage('Sant Reference data added successfully!');
      toast.success('Sant Reference data added successfully!');
    } catch (error) {
      console.error('Error submitting sant reference data:', error);
      setErrorMessage('Error, Try again!');
      toast.error('Error, Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Add Sant Reference
      </h2>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Pin Number"
            fullWidth
            variant="outlined"
            type="text"
            {...register('pin_number', {
              required: 'Pin number is required',
              pattern: /^[0-9]+$/,
            })}
            error={!!errors.pin_number}
            helperText={errors.pin_number?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Name of Sant"
            fullWidth
            variant="outlined"
            {...register('name_of_sant', {
              required: 'Name of Sant is required',
              pattern: /^[A-Za-z\s]+$/,
            })}
            error={!!errors.name_of_sant}
            helperText={errors.name_of_sant?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Sant Phone Number"
            fullWidth
            variant="outlined"
            type="text"
            {...register('sant_phone_number', {
              required: 'Sant phone number is required',
              pattern: /^[0-9]{10}$/,
            })}
            error={!!errors.sant_phone_number}
            helperText={errors.sant_phone_number?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>
      </Grid>

      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ width: 150 }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
        {/* <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={() => {
            reset();
            setSuccessMessage('');
            setErrorMessage('');
          }}
          sx={{ width: 150 }}
        >
          Cancel
        </Button> */}
      </Box>
    </form>
  );
};

export default SantReferenceForm;
