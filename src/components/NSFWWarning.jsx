// src/components/NSFWWarning.js

import PropTypes from 'prop-types';
import { Button, Box, Typography } from '@mui/material';

const NSFWWarning = ({ onContinue, onEscape }) => {
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
      textAlign="center"
    >
      <Typography variant="h2" gutterBottom>
                <img src="https://cm-storage.s3.us-east-2.amazonaws.com/Christine+Mingles-red.svg" alt="Khrez Mingles" style={{ width: '300px' }}/>
      </Typography>
      <Typography variant="h4" gutterBottom>
        NSFW Content Warning
      </Typography>
      <Typography variant="h6" gutterBottom>
        This site contains content that may not be suitable for all audiences.
      </Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={onContinue} 
        style={{ margin: '10px' }}
      >
        Continue
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onEscape} 
        style={{ margin: '10px' }}
      >
        Escape to Google
      </Button>
    </Box>
  );
};

NSFWWarning.propTypes = {
  onContinue: PropTypes.func.isRequired,
  onEscape: PropTypes.func.isRequired,
};

export default NSFWWarning;
