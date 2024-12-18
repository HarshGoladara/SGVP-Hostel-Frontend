import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { v4 as uuid } from 'uuid';

export default function OtpVerificationComponent() {
  const location = useLocation(); // To access the state passed from the login component
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // To navigate to home page after successful OTP verification
  const [cookies, setCookie] = useCookies(['token']);

  const mobileNumber = location.state?.mobileNumber; // Access the mobile number

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    try {
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/auth/otpVerification`,
        {
          mobile_number: mobileNumber,
          otp: otp,
        },
      );

      if (response.status === 200) {
        const userRole = response.data.data;
        // console.log(userRole);
        // console.log('OTP verified successfully');

        // // Navigate to the home page upon successful OTP verification
        // navigate('/welcome', { state: { userRole: userRole } });

        toast.success('Login Successful.');
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
        console.error('OTP verification failed');
        // Handle OTP verification failure
        toast.error('Login Failed');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during OTP verification', error);
      // Handle error here
      toast.error('Login Failed');
      navigate('/login');
    } finally {
      setLoading(false); // Reset loading state after the API call completes
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url('/images/sgvp-building.jpg')`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 4,
      }}
    >
      {/* OTP Verification Form */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
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
              height: '80px',
              width: 'auto',
            }}
          />
        </Box>

        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom>
          OTP Verification
        </Typography>

        {/* OTP Input Section */}
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            borderRadius: 1,
            background: 'none', // Transparent background for inner container
          }}
        >
          <form onSubmit={onSubmit}>
            {/* OTP Input Fields */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center', // Center the OTP fields
                gap: 2, // Add gap between OTP fields
                marginBottom: 2,
              }}
            >
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span style={{ margin: '0 10px' }}></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: '50px',
                  height: '56px',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: '1px solid black',
                }}
              />
            </Box>

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
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Verify'
              )}
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
