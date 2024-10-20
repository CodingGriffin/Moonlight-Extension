import React from "react";

interface SimpleButtonProps {
  title: string;
  clickHandle: Function;
  isDisable:Boolean;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  title,
  clickHandle,
  isDisable
}: any) => {
  return (
    <>
      <div className="m-8">
        <button
          className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={clickHandle}
          disabled={isDisable}
        >
          {title}
        </button>
      </div>
    </>
  );
};

export default SimpleButton;
