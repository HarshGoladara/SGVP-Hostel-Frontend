import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box } from '@mui/material';

const RelativeForm = () => {
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
        `${VITE_BACKEND_BASE_API}/admission/addRelativeDetails`,
        data,
      );
      console.log(response.data);
      setSuccessMessage('Relative data added successfully!');
      toast.success('Relative data added successfully!');
    } catch (error) {
      console.error('error submitting relative data:', error);
      setErrorMessage('Error, Try again!');
      toast.error('Error, Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add Relative Details
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
            label="Relative Name"
            fullWidth
            variant="outlined"
            {...register('relative_name', {
              required: 'Relative name is required',
              pattern: /^[A-Za-z\s]+$/,
            })}
            error={!!errors.relative_name}
            helperText={errors.relative_name?.message}
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
            label="Relative Contact Number"
            fullWidth
            variant="outlined"
            type="text"
            {...register('relative_contact_number', {
              required: 'Contact number is required',
              pattern: /^[0-9]{10}$/,
            })}
            error={!!errors.relative_contact_number}
            helperText={errors.relative_contact_number?.message}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Relative Address"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            {...register('relative_address', {
              required: 'Address is required',
            })}
            error={!!errors.relative_address}
            helperText={errors.relative_address?.message}
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

export default RelativeForm;
