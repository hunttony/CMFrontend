import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import NSFWWarning from './components/NSFWWarning';
import VideoPage from './components/VideoPage';
import CodeInputPage from './components/CodeInputPage';
import GetCodePage from './components/GetCodePage';
import MainPage from './pages/MainPage';
import ImagePage from './pages/ImagePage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import ProfilePage from './pages/ProfilePage';
import ProfileCreatorPage from './pages/ProfileCreatorPage';
import ProfileViewerEntry from './pages/ProfileViewerEntry';

const App = () => {
  const [page, setPage] = useState('warning');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  const handleContinue = () => {
    setPage('video');
  };

  const handleEscape = () => {
    
    window.location.href = 'https://www.google.com';
  };

  const handleVideoEnd = () => {
    setPage('codeInput');
  };

  const handleCodeSubmit = async (code) => {
    console.log('Code entered:', code);
    try {
      const response = await axios.get(`https://cmbackend.vercel.app/verify-code/${code}`, { withCredentials: true });
      console.log('Response from backend:', response);
      if (response.data.message === 'Code is valid') {
        setIsAuthenticated(true);
        setRole(response.data.role);
        if (response.data.role === 'viewer') {
          setPage('main');
        } else if (response.data.role === 'creator') {
          setPage('profile-creator');
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

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('https://cmbackend.vercel.app/verify-session', { withCredentials: true });
        console.log('Session check response:', response);
        if (response.data.loggedIn) {
          setIsAuthenticated(true);
          setRole(response.data.role);
          if (response.data.role === 'viewer') {
            setPage('main');
          } else if (response.data.role === 'creator') {
            setPage('profile-creator');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('role:', role);
    console.log('page:', page);
  }, [isAuthenticated, role, page]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          page === 'warning' ? (
            <NSFWWarning onContinue={handleContinue} onEscape={handleEscape} />
          ) : page === 'video' ? (
            <VideoPage onVideoEnd={handleVideoEnd} />
          ) : page === 'codeInput' ? (
            <CodeInputPage onSubmit={handleCodeSubmit} />
          ) : page === 'get-code' ? (
            <GetCodePage />
          ) : (
            <Navigate to={`/${page}`} />
          )
        } />
        <Route path="/codeInput" element={<CodeInputPage onSubmit={handleCodeSubmit} />} />
        <Route path="/get-code" element={<GetCodePage />} />
        <Route path="/main" element={isAuthenticated && role === 'viewer' ? <MainPage role={role} /> : <Navigate to="/codeInput" />} />
        <Route path="/image/:id" element={<ImagePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile-creator" element={isAuthenticated && role === 'creator' ? <ProfileCreatorPage role={role}/> : <Navigate to="/codeInput" />} />
        <Route path="/profile-viewer-entry" element={<ProfileViewerEntry />} />
      </Routes>
    </Router>
  );
};

export default App;
