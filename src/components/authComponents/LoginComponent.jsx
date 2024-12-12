import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Set loading to true while waiting for the API response

      // Send a POST request to the login API
      const response = await axios.post(`${VITE_BACKEND_BASE_API}/auth/login`, {
        phone: data.phone,
        mobile_number: data.mobileNumber,
      });

      if (response.status === 200) {
        console.log('Login successful');
        // Redirect to OTP verification page on success
        navigate('/otpVerification', {
          state: { mobileNumber: data.mobileNumber },
        });
      } else {
        console.log('Login failed', response.data);
        // Handle failure here
      }
    } catch (error) {
      console.error('Error during login', error);
      // Handle error here
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url('/images/sgvp-building.jpg')`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 4,
      }}
    >
      {/* Login Form */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <img
            src="/images/logo.jpg" // Replace with your logo path
            alt="Logo"
            style={{
              height: '80px', // Adjust height as needed
              width: 'auto',
            }}
          />
        </Box>

        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {/* Form */}
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            borderRadius: 1,
            background: 'none', // No background for the inner container
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Phone Input */}
            <Controller
              name="phone"
              control={control}
              defaultValue="91"
              rules={{
                required: 'Phone code is required',
                validate: (value) => value.length >= 1 || 'Invalid phone code',
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country={'in'}
                  value={value}
                  onChange={(phone) => {
                    setValue('phone', phone, { shouldValidate: true });
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '56px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: 'white', // Fully opaque
                  }}
                  containerStyle={{
                    marginBottom: '16px',
                    width: '100%',
                  }}
                />
              )}
            />
            {errors.phone && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: '16px' }}
              >
                {errors.phone.message}
              </Typography>
            )}

            {/* Mobile Number Input */}
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber?.message}
              sx={{
                marginBottom: 2,
                backgroundColor: 'white', // Fully opaque
                borderRadius: '4px',
              }}
              {...register('mobileNumber', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^\d+$/,
                  message: 'Mobile number must be of digits',
                },
              })}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: '12px 0',
                fontWeight: 'bold',
              }}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginComponent;
