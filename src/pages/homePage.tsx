import React from 'react';
import SearchInput from '../components/searchInput';
import Header from '../components/header';


const HomePage: React.FC = () => {
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
