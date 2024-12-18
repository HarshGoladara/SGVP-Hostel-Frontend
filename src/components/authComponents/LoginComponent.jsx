import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { v4 as uuid } from 'uuid';

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
  const [tabValue, setTabValue] = useState(0); // Track active tab
  const [cookies, setCookie] = useCookies(['token']);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Set loading to true while waiting for the API response
      let response;

      if (tabValue === 0) {
        // // Email/password login logic
        // response = await axios.post(`${VITE_BACKEND_BASE_API}/auth/emailLogin`, {
        //   email: data.email,
        //   password: data.password,
        // });
      } else {
        // Mobile number login logic
        response = await axios.post(`${VITE_BACKEND_BASE_API}/auth/login`, {
          phone: data.phone,
          mobile_number: data.mobileNumber,
        });
      }

      if (response.status === 200) {
        toast.success(
          tabValue === 0
            ? `Login successful with email ${data.email}`
            : `OTP sent on ${data.mobileNumber}`,
        );

        if (tabValue === 0) {
          const userRole = response.data.data;
          if (
            userRole.role_name === 'rector' ||
            userRole.role_name === 'chief rector'
          ) {
            const unique_id = uuid();
            setCookie('token', unique_id, {
              // path: "/",        // Cookie available across the entire site
              days: 1,
              Secure: true, // Ensures the cookie is sent over HTTPS
              SameSite: 'Strict', // Prevents cross-site request forgery
            });
            navigate('/dashboard', { state: { userRole: userRole } });
          } else {
            navigate('/welcome', { state: { userRole: userRole } });
          }
        } else {
          navigate('/otpVerification', {
            state: { mobileNumber: data.mobileNumber },
          });
        }
      } else {
        toast.error('Error: Try Again');
      }
    } catch (error) {
      console.error('Error during login', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
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
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
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
            style={{ height: '80px', width: 'auto' }}
          />
        </Box>

        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Email & Password" />
          <Tab label="Mobile Number" />
        </Tabs>

        {/* Form */}
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            borderRadius: 1,
            background: 'none',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email/Password Login */}
            {tabValue === 0 && (
              <>
                {/* Email */}
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ marginBottom: 2 }}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                />

                {/* Password */}
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ marginBottom: 2 }}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  })}
                />
              </>
            )}

            {/* Mobile Number Login */}
            {tabValue === 1 && (
              <>
                {/* Phone Input */}
                <Controller
                  name="phone"
                  control={control}
                  defaultValue="91"
                  rules={{
                    required: 'Phone code is required',
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
                        backgroundColor: 'white',
                      }}
                      containerStyle={{ marginBottom: '16px', width: '100%' }}
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

                {/* Mobile Number */}
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber?.message}
                  sx={{ marginBottom: 2 }}
                  {...register('mobileNumber', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^\d+$/,
                      message: 'Mobile number must be digits',
                    },
                  })}
                />
              </>
            )}

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
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Login'
              )}
            </Button>
            <Box className="h-3" />
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{
                padding: '12px 0',
                fontWeight: 'bold',
              }}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginComponent;
