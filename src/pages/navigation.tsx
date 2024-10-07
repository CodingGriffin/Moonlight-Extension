import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <Link to="/" className='text-white'>Login</Link>
      <Link to="/Home" className='text-white'>Home</Link>
    </nav>
  );
};

export default Navigation;
