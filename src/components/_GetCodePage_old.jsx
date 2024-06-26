import { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { Link } from 'react-router-dom';

const GetCodePage = () => {
  const [testCode, setTestCode] = useState('');
  const [role, setRole] = useState('viewer'); // Add state for role

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const generateTestCode = async () => {
    try {
      const response = await axios.post('https://cmbackend.vercel.app/generate-test-code', { role }); // Send role with the request
      setTestCode(response.data.code);
    } catch (error) {
      console.error('Error generating test code:', error);
      alert('An error occurred while generating the test code. Please try again later.');
    }
  };

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
        Get Your Code
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={{ color: 'white' }}>Select Role</FormLabel>
        <RadioGroup row aria-label="role" name="role" value={role} onChange={handleRoleChange}>
          <FormControlLabel value="viewer" control={<Radio />} label="Viewer" />
          <FormControlLabel value="creator" control={<Radio />} label="Creator" />
        </RadioGroup>
      </FormControl>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="XA587Y8NTFXWQ" />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="hidden" name="return" value="https://www.website.com" />
        <input type="hidden" name="cancel_return" value="https://www.website.com" />
        <input type="hidden" name="advanced_vars" value="address_override=1\nnotify_url=https://www.mywebsite.com/PayPal_IPN" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
      </form>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={generateTestCode} 
        style={{ marginTop: '20px' }}
      >
        Generate Test Code
      </Button>
      {testCode && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Your test code: {testCode}
        </Typography>
      )}
      <Link to="/" style={{ textDecoration: 'none', marginTop: '20px' }}>
        <Button variant="contained" color="secondary">
          Go Back
        </Button>
      </Link>
    </Box>
  );
};

export default GetCodePage;
