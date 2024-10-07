import React from 'react';
import MoonLogo from '../components/moonLogo';
import SearchInput from '../components/searchInput';


const HomePage: React.FC = () => {
    return (
        <>
        <div className='text-center'>
            <h1 className='text-2xl font-bold text-white p-5'>Moonlight</h1>
            <hr />
            <MoonLogo />
            <SearchInput />
        </div>
        </>
    );
};

export default HomePage;
