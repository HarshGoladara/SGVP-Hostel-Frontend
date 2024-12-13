import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomeComponent() {
  const navigate = useNavigate();

  const handleLoginNavigation = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url('/images/sgvp-building.jpg')`, // Replace with your background image path
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // Makes the background image fixed
        backgroundPosition: 'center',
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on larger screens
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
          borderRadius: 2,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Left Section - Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            backgroundColor: 'rgba(240, 240, 240, 0.9)',
            borderRadius: '8px 0 0 8px',
          }}
        >
          <img
            src="/images/swaminarayan.jpg" // Replace with your Swaminarayan Murti image path
            alt="Swaminarayan Murti"
            style={{
              maxHeight: '400px',
              width: 'auto',
              borderRadius: '8px',
            }}
          />
        </Box>

        {/* Right Section - Intro Box */}
        <Box
          sx={{
            flex: 2,
            padding: 4,
            borderRadius: '0 8px 8px 0',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 3,
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
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to SGVP Chharodi Hostel
          </Typography>

          {/* Description */}
          <Paper
            elevation={0}
            sx={{
              padding: 3,
              borderRadius: 1,
              background: 'none', // Transparent background for the text container
            }}
          >
            <Typography variant="body1" paragraph>
              SGVP-Ahmedabad Chharodi Hostel is a serene and welcoming
              environment that nurtures academic excellence, personal growth,
              and holistic development. Situated amidst lush greenery, the
              hostel offers state-of-the-art facilities designed to create a
              comfortable and productive atmosphere for students.
            </Typography>

            <Typography variant="body1" paragraph>
              The hostel is equipped with spacious rooms, modern amenities, and
              recreational spaces to ensure students feel at home. With a focus
              on fostering discipline and a sense of community, the hostel
              provides various extracurricular activities and support systems to
              promote a balanced lifestyle.
            </Typography>

            <Typography variant="body1" paragraph>
              At SGVP, we believe in nurturing young minds to achieve their
              fullest potential while providing a secure and supportive
              environment. Join us and experience a unique blend of tradition,
              values, and modern education.
            </Typography>
          </Paper>

          {/* Navigation Button */}
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginNavigation}
              sx={{
                padding: '12px 24px',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Go to Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
