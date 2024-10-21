import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import DetailPage from './pages/detailPage';
import NotFound from './pages/notFound';
import ResultPage from './pages/resultPage';
import SettingPage from './pages/settingPage';
// import Navigation from './pages/navigation';

const App: React.FC = () => {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='/detail' element={<DetailPage />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='*' Component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
