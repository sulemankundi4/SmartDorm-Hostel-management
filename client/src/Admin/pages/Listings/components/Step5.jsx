// Step5.jsx
import React from 'react';

const Step5 = ({
  formData,
  handleChange,
  getLabelProps,
  getInputProps,
  getMenuProps,
  isOpen,
  locations,
  highlightedIndex,
  getItemProps,
}) => {
  return (
    <div>
      <h2>Step 5: Location and Images</h2>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full">
          <label
            className="mb-2.5 block text-black dark:text-white"
            {...getLabelProps()}
          >
            Location
            <span className="text-meta-1">*</span>
          </label>
          <input
            name="Location"
            placeholder="Enter The Hostel Location "
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            type="text"
            {...getInputProps()}
          />
          {locations.length > 0 && (
            <ul
              {...getMenuProps({}, { suppressRefError: true })}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {isOpen &&
                locations.map((item, index) => (
                  <li
                    className={`cursor-pointer ${
                      highlightedIndex === index ? 'bg-blue-500 text-white' : ''
                    }`}
                    key={`${item}${index}`}
                    {...getItemProps({
                      item,
                      index,
                    })}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mb-1.5 flex flex-col gap-6 xl:flex-row">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <label className="mb-2.5 block text-black dark:text-white">
              Proof of Address <span className="text-meta-1">*</span>
            </label>
            <input
              name="HostelAddressProof"
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              type="file"
            />
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full">
            <label className="mb-2.5 block text-black dark:text-white">
              Images of the Hostels <span className="text-meta-1">*</span>
            </label>
            <input
              name="HostelImages"
              multiple
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              type="file"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
