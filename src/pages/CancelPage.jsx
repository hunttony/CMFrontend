// src/components/CancelPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    alert('Transaction was cancelled.');
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <h1>Transaction Cancelled</h1>
      <p>Your transaction was cancelled.</p>
    </div>
  );
};

export default CancelPage;
