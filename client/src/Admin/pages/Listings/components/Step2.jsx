// Step2.jsx
import React from 'react';

const Step2 = ({ formData, handleChange }) => {
  return (
    <div>
      <h2>Step 2: Room Details</h2>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Single Bed Rooms <span className="text-meta-1">*</span>
          </label>
          <input
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            name="SingleBedRooms"
            type="number"
            min={0}
            value={formData.SingleBedRooms}
            disabled={!formData.TotalRooms}
            placeholder="Enter the number of Single Bed Rooms"
            onChange={handleChange}
          />
        </div>
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Double Bed Rooms
          </label>
          <input
            name="DoubleBedRooms"
            type="number"
            readOnly
            value={formData.DoubleBedRooms}
            onChange={handleChange}
            placeholder="Number of double bed rooms."
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
