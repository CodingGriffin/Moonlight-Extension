import React from "react";

interface SimpleButtonProps {
  title: string;
  clickHandle: Function;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  title,
  clickHandle,
}: any) => {
  return (
    <>
      <div className="m-8">
        <button
          className="w-full bg-gradient-to-b from-yellow-300 to-yellow-900 opacity-50 text-white px-6 py-2 rounded shadow-lg transition-all duration-300 hover:bg-gradient-to-b hover:from-yellow-200 hover:to-yellow-600 hover:opacity-100 hover:font-bold"
          onClick={clickHandle}
        >
          {title}
        </button>
      </div>
    </>
  );
};

export default SimpleButton;
