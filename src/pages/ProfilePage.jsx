import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://cmbackend.vercel.app/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="black"
      color="white"
      p={2}
    >
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Box
        component="img"
        sx={{
          height: 100,
          width: 100,
          borderRadius: '50%',
          marginBottom: '20px'
        }}
        alt="Profile Picture"
        src={`http://localhost:5000/uploads/${user.profilePicture}`}
      />
      <Typography variant="h6">Name: {user.name}</Typography>
      <Typography variant="h6">Age: {user.age}</Typography>
      <Typography variant="h6">Gender: {user.gender}</Typography>
      <Typography variant="h6">Bio: {user.bio}</Typography>
      <Typography variant="h6">Interests: {user.interests}</Typography>
      <Typography variant="h6">Phone: {user.phone}</Typography>
      <Typography variant="h6">City: {user.city}</Typography>
      <Typography variant="h6">State: {user.state}</Typography>
      <Typography variant="h6">Country: {user.country}</Typography>
      <Button variant="contained" color="secondary" style={{ marginTop: '20px' }}>Start Quest</Button>
    </Box>
  );
};

export default ProfilePage;
