import React from 'react';
import SearchInput from '../components/searchInput';
import Header from '../components/header';
import { saveSessionData } from '../utils/sessionUtils';


const HomePage: React.FC = () => {
    const sess_data = {name:'pageId', token:'/home'};
    const expirationMin = 1;
    saveSessionData(sess_data, expirationMin);
    
    return (
        <>
        <div className='text-center'>
            <Header />
            <hr className='mt-3 mb-1' />
            <div>
                <span className='text-lg font-["Arima"] dark:text-white'>Business Search</span>
            </div>
            <hr className='mt-1' />
            <SearchInput />
        </div>
        </>
    );
};

export default HomePage;
