import React from 'react';
import { MdFreeBreakfast } from 'react-icons/md';
import { FaParking } from 'react-icons/fa';
import { MdOutlineSignalWifi4Bar } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import { MdOutlineSignalCellularConnectedNoInternet4Bar } from 'react-icons/md';
import { PiBicycleFill } from 'react-icons/pi';
import { MdLocalAirport } from 'react-icons/md';
import { TiCloudStorage } from 'react-icons/ti';

const FacilitiesSection = ({ facilities }) => {
  const facilitiesIcons = {
    FreeBreakfast: <MdFreeBreakfast />,
    FreeParking: <FaParking />,
    FreeCityMaps: <SiGooglemaps />,
    FreeWifi: <MdOutlineSignalWifi4Bar />,
    FreeInternetAccess: <MdOutlineSignalCellularConnectedNoInternet4Bar />,
    BicycleParking: <PiBicycleFill />,
    AirportTransfers: <MdLocalAirport />,
    LuggageStorage: <TiCloudStorage />,
  };

  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };
  //convert this object to map plz
  const facilitiesArray = Object.entries(facilities)
    .filter(([key, value]) => value === true)
    .map(([key]) => ({
      key,
      name: formatKey(key),
      icon: facilitiesIcons[key],
    }));

  return (
    <>
      {facilitiesArray.length > 0 ? (
        <>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
              Facilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {facilitiesArray.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="mr-4 text-indigo-600">
                    <div className="text-3xl text-indigo-600">
                      {facility.icon}
                    </div>
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    {facility.name}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-6 flex items-center justify-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
              <span className="mr-2">View all facilities</span>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <use xlinkHref="#chevron-right" href="#chevron-right"></use>
              </svg>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default FacilitiesSection;
