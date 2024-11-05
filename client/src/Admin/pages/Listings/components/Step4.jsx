// Step4.jsx
import React from 'react';

const Step4 = ({
  formData,
  handleChange,
  handleFacilities,
  facilitiesList,
}) => {
  return (
    <div>
      <h2>Step 4: Services Provided by the Hostel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 dark:text-white gap-4 p-4 dark:bg-[#24303F]">
        {facilitiesList.map((facility, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              name={`${facility}`}
              checked={formData.hostelFacilities[facility]}
              onChange={handleFacilities}
              className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary"
            />
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {facility.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Step4;
