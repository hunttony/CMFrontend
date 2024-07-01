
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const PathSeparationPage = () => {
  return (
   
    <Box display="flex" flexDirection="column" alignItems="center" bgcolor="black" justifyContent="center" height="100vh" width="100vw">
      
      <h1>Chris Mingles</h1>
      <Button component={Link} to="/profile-viewer" variant="contained" color="primary" style={{ margin: '10px' }}>
        View Profiles 
      </Button>
      <Button component={Link} to="/profile-creator" variant="contained" color="secondary" style={{ margin: '10px' }}>
        Create a Profile 
      </Button>
    </Box>
  );
};

export default PathSeparationPage;
