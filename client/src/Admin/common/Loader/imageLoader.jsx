import React from 'react';

const ImageLoader = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-2xl flex flex-col items-center space-y-3">
        <h2 className="mb-4 text-2xl font-bold text-gray-700">
          Uploading Images
        </h2>
        <div className="relative pt-1 w-64">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-600">{progress}%</p>
      </div>
    </div>
  );
};

export default ImageLoader;
