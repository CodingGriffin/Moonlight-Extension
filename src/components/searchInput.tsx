import React, { useState } from 'react';
import axios from 'axios';
// interface SearchProps {
//     searchFunc: Function;
// }

interface ScrapedData {
    address: string;
    country: string;
    email: string;
    firstParagraph: string;
    googleReviewRating: string;
    industry: string;
    name: string;
    phone: string;
    title: string;
    url: string;
    website: string;
}

// interface ApiResponse {
//     searchQuery: string;
//     scrapedData: ScrapedData[];
// }

const SearchInput: React.FC = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [noKeyword, setNoKeyWord] = useState(false);
    const [results, setResults] = useState<ScrapedData[]>([]);

    const searchFunc = async () => {
        try {
            const response = await axios.get('http://192.168.137.37:5000/api/search/search', {
                params: {
                    q: inputValue,
                    num:10,
                },
            });

            setResults(response.data.scrapedData);
            setIsSearching(false);

            console.log("results============>", results);
        } catch (error) {
            console.log('Error fetching data:', error);
            setIsSearching(false);
        }
    };

    const searchFuncHandle = () => {
        if (inputValue != '') {
            setIsSearching(true);
            setNoKeyWord(false);
            searchFunc();
        }
        else {
            setNoKeyWord(true);
        }
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
    return (
        <>
            <div>
                <div className="relative m-8 mb-1 rounded-md shadow-sm">
                    <input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Enter Search keywords"
                        className="block w-full bg-black rounded-md border-0 py-1.5 px-3 text-white placeholder:text-gray-400 sm:text-lg sm:leading-8"
                        onChange={onChangeHandle}
                        onKeyDown={handleKeyPress}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        {!isSearching?
                            <button className="mr-3" onClick={searchFuncHandle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#ffff00' xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke='#ffff00' strokeWidth="1.91667" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20.9999 20.9998L16.6499 16.6498" stroke='#ffff00'  strokeWidth="1.91667" strokeLinecap="round" strokeLinejoin="round"/>
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
                {noKeyword?<label className='text-red-500'>Please enter the keywords!</label>:<></>}
                {/* <div>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{JSON.stringify(result)}</li>
                        ))}
                    </ul>
                </div> */}
                <div className="grid grid-cols-1 gap-4">
                    {results.map((result, index) => (
                    <div key={index} className="border p-4 rounded shadow-md">
                        <h2 className="text-lg font-bold text-yellow-500">{result.title}</h2>
                        <p className="text-gray-300">Name: {result.name || 'No Data'}</p>
                        <p className="text-gray-300">Phone: {result.phone || 'No Data'}</p>
                        <p className="text-gray-300">Email: {result.email || 'No Data'}</p>
                        <p className="text-gray-300">Address: {result.address || 'No Data'}</p>
                        <p className="text-gray-300">Website: <a href={result.url} className="text-blue-500 hover:underline">{result.url}</a></p>
                        <p className="text-gray-300">First Paragraph: {result.firstParagraph || 'No Data'}</p>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchInput;
