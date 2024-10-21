import React from 'react';
import Header from '../components/header';
import Avatar from '../components/svg/avatar';


const SettingPage: React.FC = () => {
    localStorage.setItem('pageId', '/setting');

    setTimeout(() => {
        localStorage.clear();
    }, 30 * 60 * 1000);
    return (
        <>
        <div className='text-center'>
            <Header />
            <hr className='mt-3 mb-1' />
            <div>
                <span className='text-lg font-["Arima"] dark:text-white'>Settings</span>
            </div>
            <hr className='mt-1' />
            <Avatar />
        </div>
        </>
    );
};

export default SettingPage;
