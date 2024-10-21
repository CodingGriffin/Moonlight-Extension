import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultDisplay = ({ results }:any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const navigate = useNavigate();

    // Calculate the index of the last result on the current page
    const indexOfLastResult = currentPage * resultsPerPage;
    // Calculate the index of the first result on the current page
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    // Get the current results
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    // Calculate total pages
    const totalPages = Math.ceil(results.length / resultsPerPage);

    // Function to change page
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const showDetailHandle = (data:any) => {
        localStorage.setItem('detailData', JSON.stringify(data));
        navigate('/detail', {state:data});
    }

    return (
        <>
            {currentResults.length > 0 ? (
                <div>
                    {currentResults.map((res:any, index:any) => (
                        <div
                            className="grid grid-cols-12 border border-2 border-gray-200 rounded-lg mx-3 items-center p-1 my-1 hover:bg-gray-200 cursor-pointer dark:bg-[#C4C4C4]"
                            key={index}
                            onClick={()=>showDetailHandle(res)}
                        >
                            <div className="text-3xl font-black font-['Abhaya Libre ExtraBold']">
                                <span>{indexOfFirstResult + index + 1}</span>
                            </div>
                            <div className="col-span-10">
                                <div className="grid-rows font-bold">
                                    {res.name}
                                </div>
                                <div className="grid-rows">
                                    {res.website}
                                </div>
                            </div>
                            <div className="mx-auto">
                                <span>
                                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.96967 11.7803C0.676777 11.4874 0.676777 11.0126 0.96967 10.7197L5.43934 6.25L0.969669 1.78033C0.676776 1.48744 0.676776 1.01256 0.969669 0.719669C1.26256 0.426777 1.73744 0.426777 2.03033 0.719669L7.03033 5.71967C7.32322 6.01256 7.32322 6.48744 7.03033 6.78033L2.03033 11.7803C1.73744 12.0732 1.26256 12.0732 0.96967 11.7803Z" fill="#4B5563"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        <span className="mx-2 dark:text-white">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </>
    );
};

export default ResultDisplay;
