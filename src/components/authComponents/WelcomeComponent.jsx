import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

const WelcomeComponent = () => {
  const location = useLocation();
  const userRole = location.state?.userRole;

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
      {/* Welcome Message Box */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
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
          Welcome
        </Typography>

        {/* Conditional Message */}
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            borderRadius: 1,
            background: 'none',
          }}
        >
          <Typography variant="h3">
            {userRole.role_name} login successful!
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default WelcomeComponent;
