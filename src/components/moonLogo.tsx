// src/MoonLogo.tsx

import React, { useState, useEffect } from 'react';
import './css/moonLogo.css';

const MoonLogo: React.FC = () => {
    const [isWaking, setIsWaking] = useState(false);
    const [eyeState, setEyeState] = useState<'open' | 'sleep'>('open');

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isWaking) {
            interval = setInterval(() => {
                setEyeState((prev) => (prev === 'open' ? 'sleep' : 'open'));
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isWaking]);

    const handleMouseEnter = () => {
        setIsWaking(true);
        setEyeState('sleep');
    };

    const handleMouseLeave = () => {
        // setIsWaking(false);
        // setEyeState('open');
    };

    return (
        <div 
            className="flex justify-center pt-3" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <div className={`w-32 h-32 flex justify-center items-center rounded-lg transition-colors duration-300`}>
                <svg
                    id="moon-logo"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    className={`transition-transform duration-500 ${isWaking ? 'transform scale-125 opacity-100' : 'opacity-100'}`}
                >
                    <circle cx="50" cy="50" r="40" fill="#FFFF33 " />
                    <path d="M40,65 Q50,75 60,65" stroke="#000000" strokeWidth="2" fill="none" />
                    <g className="eyes">
                        {!isWaking ? <path className={`eye-top top-left-eye ${eyeState}`} d="M30,40 A5,5 0 0,0 40,40" stroke="#000000" strokeWidth="2" fill="none" />:
                        <path className={`eye-bottom bottom-left-eye ${eyeState === 'open' ? 'sleep' : ''}`} d="M30,45 A5,5 0 0,1 40,45" stroke="#000000" strokeWidth="2" fill="none" />}
                        {!isWaking ? <path className={`eye-top top-right-eye ${eyeState}`} d="M60,40 A5,5 0 0,0 70,40" stroke="#000000" strokeWidth="2" fill="none" />:
                        <path className={`eye-bottom bottom-right-eye ${eyeState === 'open' ? 'sleep' : ''}`} d="M60,45 A5,5 0 0,1 70,45" stroke="#000000" strokeWidth="2" fill="none" />}
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default MoonLogo;
