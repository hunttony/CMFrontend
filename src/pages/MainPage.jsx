import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, InputAdornment, IconButton, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInputAdornment-root': {
    color: 'white',
  },
}));


const MainPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch profiles from the backend API
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('https://cmbackend.vercel.app/api/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (profile.name && profile.name.toLowerCase().includes(searchTermLower)) ||
      (profile.city && profile.city.toLowerCase().includes(searchTermLower)) ||
      (profile.state && profile.state.toLowerCase().includes(searchTermLower)) ||
      (profile.interests && profile.interests.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <>
    <Typography><img src="https://cm-storage.s3.us-east-2.amazonaws.com/Christine+Mingles-red.svg" alt="Khrez Mingles" style={{ width: '150px', margin: '10px'}}/></Typography>
    <Container maxWidth="lg" >
      
      <Typography variant="h4" gutterBottom>
        Profiles
      </Typography>
      <StyledTextField
        label="Search Profiles"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}       
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchTerm('')} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={3}>
        {filteredProfiles.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile._id}>
            <StyledCard elevation={3}>
              <CardMedia
                component="img"
                alt={profile.name}
                height="250"
                image={profile.profilePicture}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {profile.name}
                </Typography>
                <Typography color="textSecondary">
                  Age: {profile.age}
                </Typography>
                <Typography color="textSecondary">
                  Gender: {profile.gender}
                </Typography>
                <Typography color="textSecondary">
                  Phone: {profile.phone}
                </Typography>
                <Typography color="textSecondary">
                  City: {profile.city}
                </Typography>
                <Typography color="textSecondary">
                  State: {profile.state}
                </Typography>
                <Typography color="textSecondary">
                  Country: {profile.country}
                </Typography>
                <Typography variant="body2" component="p" style={{ marginTop: '10px' }}>
                  Bio: {profile.bio}
                </Typography>
                <Typography variant="body2" component="p" style={{ marginTop: '10px' }}>
                  Interests: {profile.interests}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
};

export default MainPage;
