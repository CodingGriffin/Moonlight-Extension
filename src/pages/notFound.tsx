import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [showPage, setShowPage] = useState('');
  useEffect(() => {
    const storedValue = localStorage.getItem('pageId');
    if (storedValue) {
      setShowPage(storedValue);
    } else {
      localStorage.setItem('pageId', '/login');
      setShowPage('/login');
    }
  }, []);
  return <Navigate to={showPage} replace />;
};

export default NotFound;
