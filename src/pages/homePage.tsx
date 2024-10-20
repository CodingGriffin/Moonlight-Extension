import React from 'react';
import SearchInput from '../components/searchInput';
import Header from '../components/header';


const HomePage: React.FC = () => {
    return (
        <>
        <div className='text-center'>
            <Header />
            <hr className='mt-3' />
            <SearchInput />
        </div>
        </>
    );
};

export default HomePage;
