import PasswordPanel from '../components/passwordPanel';
import SimpleButton from '../components/simpleButton';
import { useNavigate } from 'react-router-dom';
import ModeToggle from '../components/modeToggle';

const LoginPage = () => {
    const navigate = useNavigate();

    localStorage.setItem('pageId', '/login');
    setTimeout(() => {
        localStorage.clear();
    }, 30 * 60 * 1000);

    const unlockButtonHandle = () => {
        console.log("ok");
        localStorage.setItem('pageId', '/home');
        navigate('/home');
    }
    return (
        <div className='container mx-auto px-4 mt-10'>
            <div className='fixed right-5 top-2'>
                <ModeToggle />
            </div>
            <div className='flex justify-center'>
                <div className='w-20 pr-3'>
                    <img src='./images/logo.png'  />
                </div>
                <div className='text-4xl font-black my-auto font-["Arial"] dark:text-white'>
                    Moonlight
                </div>
            </div>
            <div className='text-xl mx-20 text-center my-6 font-["Arima"] dark:text-white'>
                Unlock the Moonlight Extension
            </div>
            <PasswordPanel />
            <SimpleButton title={"Unlock"} clickHandle={unlockButtonHandle} isDisable={false} />
            <div className='font-["Arima"] text-center dark:text-white'> 
                Need help? Contact <span className='text-blue-600'>Moonlight Support</span>
            </div>
        </div>
    );
};

export default LoginPage;
