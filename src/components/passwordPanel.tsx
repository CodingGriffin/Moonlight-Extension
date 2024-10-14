import React, { useState } from 'react';

const PasswordPanel: React.FC = () => {
    const [isPassword, setIsPassword] = useState(true);
    return (
        <>
            <div>
                <div className="relative m-8 rounded-md shadow-sm">
                    <input
                        id="password"
                        name="password"
                        type={isPassword?"password":"text"}
                        placeholder="Your unlock passcode"
                        className="block w-full bg-black rounded-md border-0 py-1.5 px-3 text-white placeholder:text-gray-400 sm:text-lg sm:leading-8"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <button className="mr-3" onClick={() => setIsPassword(!isPassword)}>
                            <svg width="20" height="16" viewBox="0 0 20 16" stroke={isPassword?'#333':'#ffff00'} fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 4.21314C8.8144 4.21314 7.83961 4.61698 7.16667 5.34639C6.50383 6.06485 6.20655 7.01986 6.20655 8C6.20655 8.98014 6.50383 9.93516 7.16667 10.6536C7.83961 11.383 8.8144 11.7869 10 11.7869C11.1856 11.7869 12.1604 11.383 12.8333 10.6536C13.4962 9.93516 13.7934 8.98014 13.7934 8C13.7934 7.01986 13.4962 6.06485 12.8333 5.34639C12.1604 4.61698 11.1856 4.21314 10 4.21314ZM8.36461 6.44777C8.68478 6.10074 9.19961 5.83891 10 5.83891C10.8004 5.83891 11.3152 6.10074 11.6354 6.44777C11.9657 6.80575 12.1648 7.33776 12.1648 8C12.1648 8.66224 11.9657 9.19425 11.6354 9.55223C11.3152 9.89926 10.8004 10.1611 10 10.1611C9.19961 10.1611 8.68478 9.89926 8.36461 9.55223C8.03435 9.19425 7.83515 8.66224 7.83515 8C7.83515 7.33776 8.03435 6.80575 8.36461 6.44777Z" fill="#1F2937"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C6.11297 0 3.58698 1.31971 2.04049 3.02671C0.5183 4.7069 0 6.70232 0 8C0 9.29768 0.5183 11.2931 2.04049 12.9733C3.58698 14.6803 6.11297 16 10 16C13.887 16 16.413 14.6803 17.9595 12.9733C19.4817 11.2931 20 9.29768 20 8C20 6.70232 19.4817 4.7069 17.9595 3.02671C16.413 1.31971 13.887 0 10 0ZM3.17925 4.02303C4.40408 2.67107 6.49692 1.49832 10 1.49832C13.5031 1.49832 15.5959 2.67107 16.8208 4.02303C18.0699 5.4018 18.4753 7.03181 18.4753 8C18.4753 8.96819 18.0699 10.5982 16.8208 11.977C15.5959 13.3289 13.5031 14.5017 10 14.5017C6.49692 14.5017 4.40408 13.3289 3.17925 11.977C1.93013 10.5982 1.52468 8.96819 1.52468 8C1.52468 7.03181 1.93013 5.4018 3.17925 4.02303Z" fill="#1F2937"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordPanel;
