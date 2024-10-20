import React, { useState } from 'react';
import axios from 'axios';
import SimpleButton from './simpleButton';
// interface SearchProps {
//     searchFunc: Function;
// }

interface ScrapedData {
    name: string;
    types: [];
    formatted_address: string;
    phoneNumber: string;
    email: string;
    socialLinks:[];
    website: string;
    business_status:string;
    opening_hours:{open_now:Boolean};
    rating:string;
    user_ratings_total:string;
    
}

// interface ApiResponse {
//     searchQuery: string;
//     scrapedData: ScrapedData[];
// }

const SearchInput: React.FC = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchCount, setSearchCount] = useState('');
    const [noKeyword, setNoKeyWord] = useState(false);
    const [noCount, setNoCount] = useState(false);
    const [results, setResults] = useState<ScrapedData[]>([]);

    const searchFunc = async () => {
        try {
            const response = await axios.get('http://192.168.137.37:5000/api/search/search', {
                params: {
                    q: inputValue,
                    num:50,
                },
            });

            setResults(response.data.scrapedData);
            setIsSearching(false);

        } catch (error) {
            console.log('Error fetching data:', error);
            setIsSearching(false);
        }
    };
    
    const searchFuncHandle = () => {
        if (inputValue != '' && searchCount != '') {
            setIsSearching(true);
            setNoKeyWord(false);
            setNoCount(false);
            searchFunc();
        }
        inputValue ? setNoKeyWord(false) :setNoKeyWord(true);
        searchCount ? setNoCount(false) :setNoCount(true);
    }
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchFuncHandle();
        }
    }
    
    const onChangeHandle = (e:any) => {
        setInputValue(e.target.value);
        if (inputValue != '') {
            setNoKeyWord(false);
        }
    }

    const countChangeHandle = (e:any) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setSearchCount(value);
            setNoCount(false);
        }
    }
    
    const exportHandle = async () => {
        try {
            const response = await axios.post("http://192.168.137.37:5000/api/result/export", {data: results}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const exportUrl = response.data.url; // Assuming the response has a `url` field with the link.
        
            if (exportUrl) {
                // Open the URL in a new tab
                window.open(exportUrl, '_blank');
                // window.location.href = exportUrl;
            } else {
                console.log('No URL returned in export response');
            }
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    }
    return (
        <>
            <div>
                <div className='text-left ml-8 mt-3 mb-1 font-["Arima"] dark:text-white'>
                    Keywords:
                    {noKeyword?<label className='text-red-500 ml-1'>Please enter the keywords!</label>:<></>}
                </div>
                <div className="relative mx-8 rounded-md shadow-sm">
                    <input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Search here..."
                        className="block w-full dark:bg-black rounded-md border-2 border-gray-300 px-3 dark:text-white placeholder:text-gray-400 sm:text-lg sm:leading-8"
                        onChange={onChangeHandle}
                        onKeyDown={handleKeyPress}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        {!isSearching?
                            <button className="mr-3" onClick={searchFuncHandle}>
                                <svg className="stroke-current text-gray-800 dark:text-white"  width="24" height="24" fill='none' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke='currentColor' strokeWidth="1.91667" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20.9999 20.9998L16.6499 16.6498" stroke='currentColor'  strokeWidth="1.91667" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>:
                            <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='mr-3'>
                                <circle cx="50" cy="50" r="45" stroke="#3498db" strokeWidth="5" fill="none" strokeLinecap="round">
                                    <animate 
                                    attributeName="stroke-dasharray" 
                                    from="0 50" 
                                    to="360 500" 
                                    dur="1.5s" 
                                    repeatCount="indefinite" />
                                    <animate 
                                    attributeName="transform" 
                                    type="rotate" 
                                    from="0 50 50" 
                                    to="360 50 50" 
                                    dur="1.5s" 
                                    repeatCount="indefinite" />
                                </circle>
                            </svg>
                            }
                    </div>
                </div>
                <div className='text-left ml-8 mt-3 mb-1 font-["Arima"] dark:text-white'>
                    Limited Number:
                    {noCount?<label className='text-red-500 ml-1'>Please enter the Correct Quantity!</label>:<></>}
                </div>
                <div className="relative mx-8 mt-1 rounded-md shadow-sm">
                    <input
                        id="searchCount"
                        name="searchCount"
                        type="text"
                        placeholder="10"
                        className="block w-full dark:bg-black rounded-md border-2 border-gray-300 px-3 dark:text-white placeholder:text-gray-400 sm:text-lg sm:leading-8"
                        onChange={countChangeHandle}
                        onKeyDown={handleKeyPress}
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {results.map((result, index) => (
                    <div key={index} className="border p-4 rounded shadow-md">
                        <h2 className="text-lg font-bold text-yellow-500">{result.name}</h2>
                        <p className="text-gray-300">Industry: {result.types? result.types.map((item:any) => (item + ", ")):'No Data'}</p>
                        <p className="text-gray-300">Address: {result.formatted_address || 'No Data'}</p>
                        <p className="text-gray-300">Phone Number: {result.phoneNumber || 'No Data'}</p>
                        <p className="text-gray-300">Email Address: {result.email || 'No Data'}</p>
                        <p className="text-gray-300">Social Links: {result.socialLinks ? result.socialLinks.map((sl:any) => sl + ", ") : 'No Data'}</p>
                        <p className="text-gray-300">Website: <a href={result.website} className="text-blue-500 hover:underline">{result.website}</a></p>
                        <p className="text-gray-300">Business_status: {result.business_status || 'No Data'}</p>
                        <p className="text-gray-300">Opening hours: {result.opening_hours.open_now? 'Open':'Close'}</p>
                        <p className="text-gray-300">Google Review Rating: {result.rating || 'No Data'}</p>
                        <p className="text-gray-300">User Ratings Total: {result.user_ratings_total || 'No Data'}</p>
                    </div>
                    ))}
                </div>
                {results.length > 0 ? 
                    <div>
                        <SimpleButton title='Export' clickHandle={exportHandle} />
                    </div>
                    : null // Empty results shouldn't show the export button
                }
            </div>
        </>
    );
};

export default SearchInput;
