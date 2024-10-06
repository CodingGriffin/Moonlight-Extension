import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <Link to="/" className='text-white'>Home</Link>
      <Link to="/about" className='text-white'>About</Link>
    </nav>
  );
};

export default Navigation;
