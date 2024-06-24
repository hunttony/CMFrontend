// src/components/SuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetch access code from backend or generate it
    fetch('/create-access-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code) {
          alert('Purchase complete. Your code is: ' + data.code);
          navigate('/code-input');
        } else {
          alert('An error occurred. Please try again.');
        }
      });
  }, [navigate]);

  return (
    <div>
      <h1>Success</h1>
      <p>Thank you for your purchase!</p>
    </div>
  );
};

export default SuccessPage;

