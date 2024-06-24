// src/components/VideoPage.js
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoPage = ({ onVideoEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onVideoEnd, 3500);
    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <video 
        src="https://drive.google.com/uc?export=view&id=1H1v_1iqm_sLCSUKTlvDbY83XyYgR9tDz" 
        autoPlay 
        muted 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

VideoPage.propTypes = {
  onVideoEnd: PropTypes.func.isRequired,
};

export default VideoPage;
