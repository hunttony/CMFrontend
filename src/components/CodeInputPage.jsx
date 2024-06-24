import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const CodeInputPage = () => {
  const [code, setCode] = useState('');
  const [redirectToMain, setRedirectToMain] = useState(false);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`https://cmbackend.onrender.com:5000/verify-code/${code}`);
      if (response.data === 'Code is valid') {
        setRedirectToMain(true);
      } else {
        alert('Invalid or expired code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  if (redirectToMain) {
    return <Navigate to="/main" />;
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

export default CodeInputPage;
