import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
// import NotFound from './pages/notFound';
import Navigation from './pages/navigation';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="*" Component={Home} />
        {/* <Route path='*' Component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

export default App;
