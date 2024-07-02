// src/components/SuccessPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch access code from backend or generate it
    fetch('/create-access-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code) {
          setCode(data.code);
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
      <h2>Chris Mingles</h2>
      <h3>Thank you for your purchase!</h3>
      <p>Please remember to take note of your code as you won't have another opportunity to access it later.</p>
      <p>Your code is: {code}</p>
    </div>
  );
};

export default SuccessPage;
