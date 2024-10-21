import { useLocation, useNavigate } from "react-router-dom";
import ResultDisplay from "../components/resultDisplay";
import Header from "../components/header";
import SimpleButton from "../components/simpleButton";
import { useState } from "react";
import axios from "axios";

const ResultPage = () => {
    localStorage.setItem('pageId', '/result');

    setTimeout(() => {
        localStorage.clear();
    }, 30 * 60 * 1000);

    const navigate = useNavigate();
    const location = useLocation();
    const {state} = location;
    const handleGoBack = () => {
        navigate('/home');
    }

    const storedData = localStorage.getItem('data');

    console.log("state==>", state);

    const [isExporting, setIsExporting] = useState(false);

    const exportHandle = async () => {
        setIsExporting(true);
        try {
            const response = await axios.post("http://192.168.137.37:5000/api/result/export", {data: (state ? state : (storedData ? JSON.parse(storedData): []))}, {
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
        setIsExporting(false);
    }

    return (
        <>
        <div className='text-center'>
            <Header />
            <hr className='mt-3 mb-1' />
            <div className="grid grid-cols-10 items-center">
                <div className="cursor-pointer ml-3" onClick={handleGoBack}>
                    <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.2071 4.29289C13.5976 4.68342 13.5976 5.31658 13.2071 5.70711L8.91421 10L13.2071 14.2929C13.5976 14.6834 13.5976 15.3166 13.2071 15.7071C12.8166 16.0976 12.1834 16.0976 11.7929 15.7071L6.79289 10.7071C6.40237 10.3166 6.40237 9.68342 6.79289 9.29289L11.7929 4.29289C12.1834 3.90237 12.8166 3.90237 13.2071 4.29289Z"
                        fill="#1F2937"
                        className="fill-current text-gray-800 dark:text-white"
                    />
                    </svg>
                </div>
                <span className='text-lg font-["Arima"] dark:text-white col-span-9'>
                    Search Results
                </span>
            </div>
            <hr className='mt-1' />
            {!isExporting ?
                <div className='fixed bottom-1/4 right-0 w-10 hover:w-16'>
                    <button type="button" className="text-blue-700 w-full bg-gray-200 hover:bg-purple-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-purple-300 hover:w-full" onClick={exportHandle}>
                        <svg className='fill-current text-blue-800 dark:text-blue-500' width="25" height="25" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9282 9.7507C12.093 9.60682 12.3086 9.51967 12.5446 9.51967C12.818 9.51967 13.0642 9.63678 13.2355 9.82358L15.6802 12.4009C16.0365 12.7765 16.0209 13.3699 15.6452 13.7262C15.2696 14.0826 14.6762 14.0669 14.3199 13.6912L13.482 12.8079L13.4819 16.7959C13.4819 17.3137 13.0622 17.7334 12.5444 17.7334C12.0267 17.7334 11.6069 17.3137 11.6069 16.7959L11.607 12.7485L10.6686 13.7033C10.3056 14.0725 9.71208 14.0777 9.34281 13.7147C8.97354 13.3518 8.9684 12.7582 9.33134 12.389L11.8758 9.80009C11.8883 9.7874 11.9011 9.7751 11.9142 9.7632C11.9188 9.75899 11.9235 9.75482 11.9282 9.7507Z"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.3061 2C10.0507 2 7.85454 2.58726 6.34676 4.33752C5.65948 5.13533 5.18121 6.10202 4.89508 7.21319C4.87723 7.2825 4.86237 7.34017 4.84898 7.3905C4.79463 7.4057 4.73208 7.4226 4.6562 7.44307C3.73256 7.69228 2.90252 8.12268 2.20092 8.73211C0.689431 10.045 0 11.9834 0 14.0705C0 16.7527 0.806973 18.8415 2.39433 20.2231C3.93547 21.5646 5.94176 22 7.86823 22C7.9328 22 7.99722 21.9992 8.06145 21.9976C8.0834 21.9992 8.10555 22 8.12786 22H18.6617L18.6747 22L18.9312 22C18.9693 22 19.007 21.9976 19.0441 21.9931C20.4337 21.9403 21.8973 21.5738 23.0575 20.5645C24.3658 19.4264 25 17.7273 25 15.6296C25 14.0277 24.5215 12.3767 23.3483 11.1918C22.7512 10.5887 22.0186 10.1537 21.1802 9.91392C21.0312 9.87128 20.9161 9.83816 20.8246 9.81042C20.8222 9.73001 20.8202 9.631 20.8179 9.50588C20.7845 7.66469 20.1772 5.96729 18.9865 4.63721C17.4308 2.8996 15.0751 2 12.3061 2ZM8.06267 21.9478L8.0639 21.9976L8.06145 21.9976L8.05898 21.9974L8.06267 21.9478ZM19.04 21.9435L19.0419 21.9932L19.0441 21.9931L19.0462 21.9928L19.04 21.9435ZM4.84898 7.3905L4.87616 7.38285L4.88977 7.43071L4.84168 7.41776L4.84898 7.3905ZM7.73817 5.55042C8.75963 4.36468 10.3331 3.85207 12.3061 3.85207C14.6876 3.85207 16.4926 4.61915 17.6183 5.87662C18.4815 6.84077 18.9509 8.09589 18.9771 9.53972L18.9777 9.57384C18.9819 9.80441 18.986 10.0335 19.0055 10.2207C19.0244 10.4015 19.0703 10.7203 19.2856 11.0019C19.5076 11.2924 19.8208 11.4193 19.9864 11.4816C20.1694 11.5503 20.4021 11.6168 20.6444 11.6861L20.6767 11.6954C21.2155 11.8495 21.6714 12.1227 22.0438 12.4988C22.7806 13.2429 23.1589 14.3674 23.1589 15.6296C23.1589 17.3503 22.65 18.4705 21.8532 19.1636C21.103 19.8163 20.0755 20.1104 18.9081 20.1446C18.8892 20.1451 18.8705 20.1462 18.852 20.1479H18.6928L18.6765 20.1479H18.6749L18.6617 20.1479H8.21651C8.17496 20.1437 8.13269 20.1423 8.08992 20.1439C8.01639 20.1465 7.94249 20.1479 7.86823 20.1479C6.18232 20.1479 4.67931 19.7628 3.59905 18.8226C2.52275 17.8857 1.84115 16.3757 1.84115 14.0705C1.84115 12.3825 2.39189 11.0132 3.40422 10.1339C3.88192 9.71896 4.45925 9.41375 5.13319 9.23191L5.16018 9.22463C5.32242 9.18088 5.49186 9.13518 5.63157 9.08533C5.77637 9.03366 6.00566 8.93962 6.20244 8.73981C6.39653 8.54272 6.48787 8.31631 6.5387 8.16911C6.5867 8.0301 6.62978 7.86269 6.67042 7.70477L6.67741 7.6776C6.90271 6.80267 7.26212 6.10303 7.73817 5.55042Z"/>
                        </svg>
                    </button>
                </div>:
                    <div className='fixed bottom-1/4 right-0 w-10 hover:w-16'>
                    <button type="button" className="text-blue-700 w-full bg-gray-200 hover:bg-purple-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-purple-300 hover:w-full cursor-pointer" disabled>
                        <svg aria-hidden="true" className="inline w-6 h-6 text-gray-100 animate-spin dark:text-gray-100 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </button>
                </div>
            }
            <ResultDisplay  results={state ? state : (storedData ? JSON.parse(storedData): [])} />
            <div>
                <SimpleButton title='New Search...' clickHandle={handleGoBack} isDisable={false} />
            </div>
        </div>
        </>
    )
}

export default ResultPage;