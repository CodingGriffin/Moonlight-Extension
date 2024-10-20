import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import DetailPage from './pages/detailPage';
// import NotFound from './pages/notFound';
// import Navigation from './pages/navigation';

const App: React.FC = () => {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="*" Component={LoginPage} />
        <Route path='/home' Component={HomePage} />
        <Route path='/detail' Component={DetailPage} />
        {/* <Route path='*' Component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

export default App;
