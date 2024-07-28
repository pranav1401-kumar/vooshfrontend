import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Avatar, 
  Button, 
  Paper, 
  Box, 
  Grid,
  Skeleton,
  Divider,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import { getProfile } from '../../services/authService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error('Error fetching profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={user?.avatarUrl}
              sx={{
                width: 150,
                height: 150,
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            {/* <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button> */}
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box>
          {/* <Typography variant="h6" gutterBottom>
            About Me
          </Typography> */}
          {/* <Typography variant="body1">
            {user?.bio || "No bio available. Click 'Edit Profile' to add one!"}
          </Typography> */}
        </Box>
      </Paper>
    </Container>
  );
};

const ProfileSkeleton = () => (
  <Container maxWidth="md">
    <Paper elevation={3} sx={{ mt: 4, p: 4, borderRadius: 2 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton variant="circular" width={150} height={150} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width={120} height={36} />
        </Grid>
      </Grid>
      <Skeleton variant="text" width="100%" height={20} sx={{ mt: 4 }} />
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="80%" height={20} />
    </Paper>
  </Container>
);

export default Profile;