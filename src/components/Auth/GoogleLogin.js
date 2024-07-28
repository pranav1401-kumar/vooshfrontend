import React from 'react';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { googleLogin } from '../../services/authService';

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        onClick={handleGoogleLogin}
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        sx={{
          backgroundColor: '#4285F4',
          color: 'white',
          '&:hover': {
            backgroundColor: '#357ae8',
          },
          textTransform: 'none',
          px: 3,
          py: 1,
        }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default GoogleLogin;