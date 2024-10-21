import React from "react";
import Header from "../components/header";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleButton from "../components/simpleButton";

const DetailPage: React.FC = () => {
    const navigate = useNavigate();

    localStorage.setItem('pageId', '/detail');
    setTimeout(() => {
        localStorage.clear();
    }, 30 * 60 * 1000);

    const storedData = localStorage.getItem('detailData');

  const location = useLocation();
  const { state } = location;
  
  const resData = state ? state : (storedData ? JSON.parse(storedData): []) 
  const handleGoBack = () => {
    navigate('/result');
  }
  return (
    <>
      <div className="text-center">
        <Header />
        <hr className="mt-3 mb-1" />
        <div className="grid grid-cols-10 items-center">
          <div className="cursor-pointer" onClick={handleGoBack}>
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
            {resData.name}
          </span>
        </div>
        <hr className="mt-1" />
        <div className="m-5 text-left">
          <p className="text-gray-400 grid grid-cols-3">
            Industry:{" "}
            <span className="text-black dark:text-white col-span-2">
              {resData.types
                ? resData.types.map((item: any, index: number) => (
                    <span key={index}>
                      - {item}
                      <br />
                    </span>
                  ))
                : "No Data"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-3">
            Address:{" "}
            <span className="text-black dark:text-white col-span-2">
              {resData.formatted_address || "No Data"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-3">
            Phone Number:{" "}
            <span className="text-black dark:text-white col-span-2">
              {resData.phoneNumber || "No Data"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-3">
            Email Address:{" "}
            <span className="text-black dark:text-white col-span-2">
              {resData.email || "No Data"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-3">
            Social Links:{" "}
            <span className="text-black dark:text-white col-span-2">
              {resData.socialLinks
                ? resData.socialLinks.map((sl: any, index: number) => (
                    <span key={index}>
                      <a
                        href={sl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-too hover:underline"
                      >
                        {sl}
                      </a>
                      <br />
                    </span>
                  ))
                : "No Data"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-3">
            Website:{" "}
            <span className="text-black dark:text-white col-span-2">
              <a href={resData.website} className="hover:underline">
                {resData.website}
              </a>
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-3">
            Business_status:{" "}
            <span className="text-black dark:text-white col-span-2">
              {resData.business_status || "No Data"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-3">
            Opening hours:{" "}
            <span className="text-black dark:text-white col-span-2">
              {resData.opening_hours.open_now ? "Open" : "Close"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-2">
            Google Review Rating:{" "}
            <span className="text-black dark:text-white col-span-1">
              {resData.rating || "No Data"}
            </span>
          </p>
          <p className="text-gray-400 grid grid-cols-2">
            User Ratings Total:{" "}
            <span className="text-black dark:text-white col-span-1">
              {resData.user_ratings_total || "No Data"}
            </span>
          </p>
        </div>
      </div>
      <div>
        <SimpleButton title='Back' clickHandle={handleGoBack} isDisable={false} />
      </div>
    </>
  );
};

export default DetailPage;
