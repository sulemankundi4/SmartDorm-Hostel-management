import React from 'react';
const AllowLocation = () => {
  const locationHandler = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates = [position.coords.longitude, position.coords.latitude];
      document.cookie = `coordinates=${coordinates}; path=/`;
      console.log('Location:', coordinates);
      window.location.reload();
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-blue-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </div>
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Please Allow Location Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We need your location to provide a better experience.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={locationHandler}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Allow Location
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllowLocation;
