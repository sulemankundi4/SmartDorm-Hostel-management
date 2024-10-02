import React from 'react';
import { IoBedOutline } from 'react-icons/io5';

const facilities = [
  { name: 'Linen Included', icon: <IoBedOutline /> },
  { name: 'Free Parking', icon: <IoBedOutline /> },
  { name: 'Free WiFi', icon: <IoBedOutline /> },
  { name: 'Free Internet Access', icon: <IoBedOutline /> },
  { name: 'Security Lockers', icon: <IoBedOutline /> },
  { name: 'Common Room', icon: <IoBedOutline /> },
  { name: 'Bicycle Parking', icon: <IoBedOutline /> },
  { name: 'Breakfast Not Included', icon: <IoBedOutline /> },
];

const FacilitiesSection = ({ facilities }) => {
  //convert this object to map plz
  const facilitiesArray = Object.entries(facilities).map(([key, value]) => ({
    key,
    ...value,
  }));

  const facilitiesIcons = {
    FreeBreakfast: <IoBedOutline />,
    FreeParking: <IoBedOutline />,
    FreeCityMaps: <IoBedOutline />,
    FreeWiFi: <IoBedOutline />,
    FreeInternetAccess: <IoBedOutline />,
    BicycleParking: <IoBedOutline />,
    AirportTransfers: <IoBedOutline />,
    LuggageStorage: <IoBedOutline />,
  };

  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  const facilitiesArrayWithIcons = facilitiesArray.map((facility) => ({
    ...facility,
    name: formatKey(facility.key),
    icon: facilitiesIcons[facility.key],
  }));

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Facilities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {facilitiesArrayWithIcons.map((facility, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="mr-4 text-indigo-600">
              <div className="text-3xl">{facility.icon}</div>
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
  );
};

export default FacilitiesSection;
