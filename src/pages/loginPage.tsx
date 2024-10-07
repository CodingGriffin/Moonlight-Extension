import React from 'react';
import MoonLogo from '../components/moonLogo';
import PasswordPanel from '../components/passwordPanel';
import SimpleButton from '../components/simpleButton';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const unlockButtonHandle = () => {
        console.log("ok");
        navigate('/home');
    }
    return (
        <>
        <div className='text-center'>
            <h1 className='text-2xl font-bold text-white p-5'>Moonlight</h1>
            <hr />
            <MoonLogo />
            <p className='text-xl text-white'>Enter your passcode</p>
            <PasswordPanel />
            <SimpleButton title={"Unlock"} clickHandle={unlockButtonHandle} />
        </div>
        </>
    );
};

export default LoginPage;
