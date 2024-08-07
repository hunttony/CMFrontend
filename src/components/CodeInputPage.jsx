import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const CodeInputPage = () => {
  const [code, setCode] = useState('');
  const [redirectPath, setRedirectPath] = useState(null);
 

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`https://cmbackend.vercel.app/api/verify-code/${code}`, { withCredentials: true });
      if (response.data.message === 'Code is valid') {      
        const role = response.data.role;
        console.log('Role:', role);
        if (role === 'viewer') {
          setRedirectPath('/main');
        } else if (role === 'creator') {
          setRedirectPath('/profile-creator');
        } else {
          alert('Invalid role. Please contact support.');
        }
      } else {
        alert('Invalid or expired code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
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
      <Typography>
        <img 
          src="https://cm-storage.s3.us-east-2.amazonaws.com/Christine+Mingles-red.svg" 
          alt="Khrez Mingles" 
          style={{ width: '300px', marginBottom: '100px' }}
        />
      </Typography>
      <Typography variant="h4" gutterBottom>
        Enter Your Code
      </Typography>
      <TextField 
        variant="outlined" 
        color="primary" 
        label="7-digit code" 
        value={code} 
        onChange={handleChange} 
        inputProps={{ maxLength: 7 }} 
        style={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleSubmit} 
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>
      <Link to="/get-code" style={{ textDecoration: 'none', marginTop: '20px' }}>
        <Button 
          variant="outlined" 
          color="primary" 
          endIcon={<ArrowForwardIcon />}
        >
          Get a Code
        </Button>
      </Link>
    </Box>
  );
};

CodeInputPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CodeInputPage;
