import React from 'react';
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
        <div className='container mx-auto px-4 mt-10'>
            <div className='flex justify-center'>
                <div className='w-20 pr-3'>
                    <img src='./images/logo.png'  />
                </div>
                <div className='text-4xl font-black my-auto font-["Arial"]'>
                    Moonlight
                </div>
            </div>
            <div className='text-xl mx-20 text-center my-6 font-["Arima"]'>
                Unlock the Moonlight Extension
            </div>
            <PasswordPanel />
            <SimpleButton title={"Unlock"} clickHandle={unlockButtonHandle} />
            <div className='font-["Arima"] text-center'> 
                Need help? Contact <span className='text-blue-600'>Moonlight Support</span>
            </div>
        </div>
    );
};

export default LoginPage;
