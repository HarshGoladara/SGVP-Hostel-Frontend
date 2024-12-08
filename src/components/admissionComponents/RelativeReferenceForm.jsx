import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box } from '@mui/material';

const RelativeReferenceForm = () => {
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
        `${VITE_BACKEND_BASE_API}/admission/addRelativeReference`,
        data,
      );
      console.log(response.data);
      setSuccessMessage('Relative Reference data added successfully!');
      toast.success('Relative Reference data added successfully!');
    } catch (error) {
      console.error('error submitting relative reference data:', error);
      setErrorMessage('Error, Try again!');
      toast.error('Error, Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 max-w-xl mx-auto bg-slate-300 p-6 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-700">
        Add Relative Reference
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
            label="Full Name"
            fullWidth
            variant="outlined"
            {...register('full_name', {
              required: 'Full name is required',
              pattern: /^[A-Za-z\s]+$/,
            })}
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Relation"
            fullWidth
            variant="outlined"
            {...register('relation', {
              required: 'Relation is required',
              pattern: /^[A-Za-z\s]+$/,
            })}
            error={!!errors.relation}
            helperText={errors.relation?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Mobile Number"
            fullWidth
            variant="outlined"
            type="text"
            {...register('mobile_number', {
              required: 'Mobile number is required',
              pattern: /^[0-9]{10}$/,
            })}
            error={!!errors.mobile_number}
            helperText={errors.mobile_number?.message}
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

export default RelativeReferenceForm;
