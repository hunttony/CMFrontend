// src/App.js
import { useState } from 'react';
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

const App = () => {
  const [page, setPage] = useState('warning');

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
      const response = await axios.get(`/verify-code/${code}`);
      if (response.data === 'Code is valid') {
        setPage('main');
      } else {
        alert('Invalid or expired code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('An error occurred. Please try again later.');
    }
  };

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
          ) : (
            <Navigate to="/main" />
          )
        } />
        <Route path="/get-code" element={<GetCodePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/image/:id" element={<ImagePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </Router>
  );
};

export default App;
