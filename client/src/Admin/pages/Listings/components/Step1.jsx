// Step1.jsx
import React from 'react';

const Step1 = ({ formData, handleChange }) => {
  return (
    <div>
      <h2>Step 1: Property Details</h2>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Property Name
          </label>
          <input
            name="HostelName"
            type="text"
            value={formData.HostelName}
            onChange={handleChange}
            placeholder="Enter Hostel Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Property Type
          </label>
          <select
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            name="PropertyType"
            value={formData.PropertyType}
            onChange={handleChange}
          >
            <option disabled selected value="">
              Select Property Type
            </option>
            <option value="Hostel">Hostel</option>
          </select>
        </div>
      </div>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Currency <span className="text-meta-1">*</span>
          </label>
          <select
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            name="Currency"
            value={formData.Currency}
            onChange={handleChange}
          >
            <option disabled selected value="">
              Select your currency
            </option>
            <option value="Pkr">PKR</option>
          </select>
        </div>
        <div className="w-full xl:w-1/2">
          <label className="mb-2.5 block text-black dark:text-white">
            Total Rooms
          </label>
          <input
            name="TotalRooms"
            type="number"
            min={0}
            value={formData.TotalRooms}
            onChange={handleChange}
            placeholder="Number of beds"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
