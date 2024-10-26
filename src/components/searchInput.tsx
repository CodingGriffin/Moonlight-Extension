import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleButton from './simpleButton';
// import MImage from './mImage';
// import { useNavigate } from 'react-router-dom';
// import MapPanel from './MapPanel';
// import mockData from '../mockData/scrapedData.json';
// interface SearchProps {
//     searchFunc: Function;
// }

// interface ScrapedData {
//     name: string;
//     types: [];
//     formatted_address: string;
//     phoneNumber: string;
//     email: string;
//     socialLinks:[];
//     website: string;
//     business_status:string;
//     opening_hours:{open_now:Boolean};
//     rating:string;
//     user_ratings_total:string;
    
// }

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
    // const [results, setResults] = useState<ScrapedData[]>([]);

    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLocation = () => {
           if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                },
                (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                    setError('User denied the request for Geolocation.');
                    break;
                    case error.POSITION_UNAVAILABLE:
                    setError('Location information is unavailable.');
                    break;
                    case error.TIMEOUT:
                    setError('The request to get user location timed out.');
                    break;
                    // case error.UNKNOWN_ERROR:
                    //   setError('An unknown error occurred.');
                    //   break;
                }
                }
            );
            } else {
            setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);


    const getLocationByKeyword = async () => {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inputValue)}&key=AIzaSyD8pk2ZnpR82LXx3IJUXFbaRnhZ27hR4ZY`);
        const data = await response.json();

        if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
        }
    } catch (error) {
        console.log('Error fetching location. Please try again.');
    }
    }

    const getMapSrc = () => {
        if (location) {
            const { latitude, longitude } = location;
            return `https://www.google.com/maps/embed/v1/view?key=AIzaSyD8pk2ZnpR82LXx3IJUXFbaRnhZ27hR4ZY&center=${latitude},${longitude}&zoom=14`;
        }
        return '';
    };

    // const navigate = useNavigate();

    const exportHandle = async ({exportData}:any) => {
        try {
            const response = await axios.post("http://192.168.137.37:5000/api/result/export", {data: exportData}, {
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

    const searchFunc = async () => {
        try {
            const response = await axios.get('http://192.168.137.37:5000/api/search/search', {
                params: {
                    q: inputValue,
                    num:parseInt(searchCount),
                },
            });
            console.log(JSON.stringify(response.data.scrapedData));
            // localStorage.setItem("data", JSON.stringify(response.data.scrapedData));
            // setResults(response.data.scrapedData);
            exportHandle(response);
            setIsSearching(false);
            // navigate('/result', {state:response.data.scrapedData});


        } catch (error) {
            console.log('Error fetching data:', error);
            setIsSearching(false);
        }
    };

    // const searchFunc = async () => {
    //     // Simulate a delay to mimic an API call
    //     setIsSearching(true);
    //     setTimeout(() => {
    //         setResults(mockData.data.scrapedData); // Set mock data as the results
    //         setIsSearching(false);
    //     }, 1000); // Simulate a 1 second delay
    // };
    
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
            getLocationByKeyword();
        }
    }

    const countChangeHandle = (e:any) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setSearchCount(value);
            setNoCount(false);
        }
    }
    
    
    return (
        <>
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
                        className="block w-full rounded-md border-2 border-gray-300 py-1.5 px-3 placeholder:text-gray-400 sm:text-lg sm:leading-8 dark:bg-black dark:bg-opacity-15 dark:text-white dark:border-[#E4E6EA]"
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
                            <svg aria-hidden="true" className="inline w-6 h-6 text-gray-500 animate-spin dark:text-gray-100 fill-purple-600 mr-3" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
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
                        className="block w-full rounded-md border-2 border-gray-300 py-1.5 px-3 placeholder:text-gray-400 sm:text-lg sm:leading-8 dark:bg-opacity-15 dark:bg-black dark:text-white dark:border-[#E4E6EA]"
                        onChange={countChangeHandle}
                        onKeyDown={handleKeyPress}
                    />
                </div>
                
                <div className='mt-3 flex justify-center'>
                    {/* <MImage 
                        imgSrc={!isSearching?
                            './images/search_start.png' :
                            './images/search_waiting.png'
                        } 
                        width='200px' 
                    /> */}
                    {/* <MapPanel place={inputValue}/> */}
                    {error && <p>Error: {error}</p>}
                    {location ? (
                        <figure>
                            <iframe
                            src={getMapSrc()}
                            width="400"
                            height="250"
                            loading="lazy"
                            title="Google Map"
                            ></iframe>
                        </figure>
                        ) : (
                        <p>Getting location...</p>
                    )}
                </div>
                <SimpleButton title='Click here to search...' clickHandle={searchFuncHandle} isDisable={isSearching} />
        </>
    );
};

export default SearchInput;
