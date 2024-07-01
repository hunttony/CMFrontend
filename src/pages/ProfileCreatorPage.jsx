import { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100vw',
  maxWidth: 600,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: '#333',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
  },
}));

const PreviewContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  marginTop: theme.spacing(4),
}));

const PreviewBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#333',
  color: 'white',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const ProfilePicture = styled('img')(({ theme }) => ({
  height: 100,
  width: 100,
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
}));

const WhiteText = styled(Typography)({
  color: 'white',
});

const WhiteTextField = styled(TextField)({
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
});

const WhiteSelect = styled(Select)({
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
});

const ProfileCreatorPage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    bio: '',
    interests: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      await axios.post('https://cmbackend.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('An error occurred while creating the profile. Please try again later.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} color="white" bgcolor="black" height="100vh" width="100vw">
<Typography><img src="https://cm-storage.s3.us-east-2.amazonaws.com/Christine+Mingles-red.svg" alt="Khrez Mingles" style={{ width: '200px', margin: '10px'}}/></Typography>
      <Typography variant="h4" gutterBottom className={WhiteText}>Create Your Profile</Typography>
      <FormContainer>
        <WhiteTextField
          label="Name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <WhiteTextField
          label="Age"
          name="age"
          type="number"
          value={profileData.age}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <WhiteSelect
          label="Gender"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="non-binary">Non-binary</MenuItem>
          <MenuItem value="genderqueer">Genderqueer</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </WhiteSelect>
        <WhiteTextField
          label="Bio"
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
        <WhiteTextField
          label="Interests"
          name="interests"
          value={profileData.interests}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <WhiteTextField
          label="Phone"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <WhiteTextField
          label="City"
          name="city"
          value={profileData.city}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <WhiteTextField
          label="State"
          name="state"
          value={profileData.state}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <WhiteTextField
          label="Country"
          name="country"
          value={profileData.country}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <Button variant="contained" component="label">
          Upload Profile Picture
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Profile
        </Button>
      </FormContainer>
      <PreviewContainer>
        <Typography variant="h5" gutterBottom className={WhiteText}>Profile Preview</Typography>
        <PreviewBox>
          {profileData.profilePicture && (
            <ProfilePicture
              src={URL.createObjectURL(profileData.profilePicture)}
              alt="Profile"
            />
          )}
          <WhiteText variant="h6">Name: {profileData.name}</WhiteText>
          <WhiteText variant="h6">Age: {profileData.age}</WhiteText>
          <WhiteText variant="h6">Gender: {profileData.gender}</WhiteText>
          <WhiteText variant="h6">Bio: {profileData.bio}</WhiteText>
          <WhiteText variant="h6">Interests: {profileData.interests}</WhiteText>
          <WhiteText variant="h6">Phone: {profileData.phone}</WhiteText>
          <WhiteText variant="h6">City: {profileData.city}</WhiteText>
          <WhiteText variant="h6">State: {profileData.state}</WhiteText>
          <WhiteText variant="h6">Country: {profileData.country}</WhiteText>
        </PreviewBox>
      </PreviewContainer>
    </Box>
  );
};

export default ProfileCreatorPage;
