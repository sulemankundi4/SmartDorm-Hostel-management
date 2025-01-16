import React, { useState } from 'react';
import { IoLocation, IoSearchOutline } from 'react-icons/io5';
import { LuCalendarDays } from 'react-icons/lu';
import { useCombobox } from 'downshift';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';

const SearchForm = ({ initialFormData, onSubmit }) => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedLocationCoords, setSelectedLocationCoords] = useState(
    initialFormData.selectedLocationCoords || null,
  );
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const {
    isOpen,
    getMenuProps,
    getLabelProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
    reset,
  } = useCombobox({
    items: locations,
    onInputValueChange: async ({ inputValue }) => {
      if (!inputValue) return;
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          inputValue,
        )}.json`,
        {
          params: {
            country: 'PK',
            access_token: import.meta.env.VITE_MAP_BOX_KEY,
          },
        },
      );

      if (response.data.features) {
        setLocations(
          response.data.features.map((feature) => [
            feature.place_name,
            feature.geometry.coordinates,
          ]),
        );
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedLocationCoords(selectedItem);
      setIsEditingLocation(false);
    },
    itemToString: (item) => (item ? item[0] : ''),
  });

  const handleEditClick = () => {
    setIsEditingLocation(true);
    setSelectedLocationCoords(null); // Ensure it is set to an empty array
    reset(); // Reset the combobox state
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLocationCoords || selectedLocationCoords.length === 0)
      return toast.error('Please select a valid location');

    if (!formData.startDate || !formData.endDate)
      return toast.error('Please select Start Date and End Date');

    if (!formData.distance || formData.distance < 0)
      return toast.error('Please enter the distance to search within');

    onSubmit({ ...formData, selectedLocationCoords });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white  rounded-xl shadow">
      <div className="registration-form text-dark text-start">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label
              className="form-label font-medium text-slate-900 "
              {...getLabelProps()}
            >
              Search:
            </label>
            <div className="relative mt-2">
              <IoSearchOutline className="size-[18px] absolute top-[10px] start-3" />

              <input
                name="name"
                type="text"
                className="w-full py-2 px-3 ps-10 h-10 bg-transparent   rounded-md outline-none border border-[rgb(243,244,246)] focus:ring-0"
                placeholder="Search"
                {...getInputProps()}
                disabled={!isEditingLocation && selectedLocationCoords}
              />
              {selectedLocationCoords && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <AiOutlineEdit size={20} />
                </button>
              )}
              {locations.length > 0 && (
                <ul
                  {...getMenuProps()}
                  className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    selectedItem ? 'hidden' : ''
                  }`}
                >
                  {isOpen &&
                    locations.map((item, index) => (
                      <div className="flex gap-2" key={`${item[0]}${index}`}>
                        <li>
                          <IoLocation />
                        </li>
                        <li
                          className={`cursor-pointer ${
                            highlightedIndex === index
                              ? 'bg-blue-500 text-white'
                              : ''
                          }`}
                          {...getItemProps({
                            item,
                            index,
                          })}
                        >
                          {item[0]}
                        </li>
                      </div>
                    ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label className="form-label font-medium text-slate-900">
              Select Your Start Date:
            </label>
            <div className="relative mt-2">
              <LuCalendarDays className="size-[18px] absolute top-[10px] start-3" />

              <input
                name="startDate"
                type="date"
                onChange={handleChange}
                value={formData.startDate}
                className="w-full py-2 px-3 ps-10 h-10 bg-transparent  rounded-md outline-none border border-[rgb(243,244,246)] focus:ring-0 start"
                placeholder="Select Your Date"
              />
            </div>
          </div>

          <div>
            <label className="form-label font-medium text-slate-900">
              Select Your End Date:
            </label>
            <div className="relative mt-2">
              <LuCalendarDays className="size-[18px] absolute top-[10px] start-3" />

              <input
                name="endDate"
                type="date"
                onChange={handleChange}
                value={formData.endDate}
                className="w-full py-2 px-3 ps-10 h-10 bg-transparent  rounded-md outline-none border border-[rgb(243,244,246)] focus:ring-0 end"
                placeholder="Select Your Date"
              />
            </div>
          </div>

          <div>
            <label className="form-label font-medium text-slate-900">
              Distance to search within (KM):
            </label>
            <div className="relative mt-2">
              <input
                name="distance"
                type="number"
                onChange={handleChange}
                value={formData.distance}
                className="w-full py-2 px-3 ps-10 h-10 bg-transparent   rounded-md outline-none border border-[rgb(243,244,246)] focus:ring-0 end"
                placeholder="Select the distance from your location in KM you want to search"
              />
            </div>
          </div>

          <div className="lg:mt-[35px]">
            <input
              type="submit"
              name="search"
              className="py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full cursor-pointer"
              value="Search"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
