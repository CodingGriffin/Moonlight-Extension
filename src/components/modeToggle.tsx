import React, { useState, useEffect } from 'react';
import SunIcon from './svg/sunIcon';
import MoonIcon from './svg/moonIcon';

const ModeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
        if (savedMode) {
            document.body.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', (!isDarkMode).toString());
    };

    return (
        <div className="flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                    />
                    <div className="block bg-purple-800 w-12 h-6 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-yellow-200 w-4 h-4 rounded-full transition ${isDarkMode ? 'transform translate-x-full bg-blue-400 left-3' : ''}`}></div>
                    {!isDarkMode ? 
                        <div className='absolute top-1 right-1'>
                            <SunIcon />
                        </div>:
                        <div className='absolute top-1 left-1'> 
                            <MoonIcon />
                        </div>
                    }
                </div>
            </label>
        </div>
    );
};

export default ModeToggle;
