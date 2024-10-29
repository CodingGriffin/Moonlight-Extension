import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [showPage, setShowPage] = useState('');
  useEffect(() => {
      setShowPage('/launch');
  }, []);
  return <Navigate to={showPage} replace />;
};

export default NotFound;
