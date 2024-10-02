import React, { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { IoLocation, IoSearchOutline } from 'react-icons/io5';
import { LuCalendarDays } from 'react-icons/lu';
import { useCombobox } from 'downshift';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSearchListingWithinRangeMutation } from '../../Redux/api/hostelApis';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedLocationCoords, setSelectedLocationCoords] = useState([]);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const [searchNearByHostels] = useSearchListingWithinRangeMutation();

  const {
    isOpen,
    getMenuProps,
    getLabelProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    items: locations,
    onInputValueChange: async ({ inputValue }) => {
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
      setIsLocationSelected(true);
    },
    itemToString: (item) => (item ? item[0] : ''),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedLocationCoords.length === 0)
      return toast.error('Please select a valid location');

    if (!formData.startDate || !formData.endDate)
      return toast.error('Please select Start Date and End Date');

    if (!formData.distance || formData.distance < 0)
      return toast.error('Please enter the distance to search within');

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const currentDate = new Date();

    startDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (startDate.getTime() < currentDate.getTime()) {
      return toast.error('Start Date cannot be past date');
    }

    let oneMonthAfterStartDate = new Date(startDate.getTime());
    oneMonthAfterStartDate.setMonth(startDate.getMonth() + 1);

    if (endDate.getTime() < oneMonthAfterStartDate.getTime()) {
      return toast.error(
        'End Date should be at least one month after the Start Date',
      );
    }

    try {
      const res = await searchNearByHostels({
        Lat: selectedLocationCoords[1][1],
        Lon: selectedLocationCoords[1][0],
        distance: formData.distance,
      });
      if (res.data) {
        return navigate('/search', {
          state: {
            nearHostelsData: res.data.payLoad,
            coordinates: selectedLocationCoords,
            distance: formData.distance,
          },
        });
      }

      return toast.error(res.error.message);
    } catch (e) {}
  };

  return (
    <>
      <section className="relative md:pt-72 md:pb-60 py-36 table w-full items-center bg-[url(../../assets/Images/hero.jpg)] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="container relative w-[92%] mx-auto">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="lg:col-span-8 md:col-span-7 md:order-1 order-2">
              <h5 className="text-3xl font-dancing text-white">
                Beauty of Discover
              </h5>
              <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-4 mt-4">
                SmartDorm: Redefining Hostel Living with Ease, Comfort, and
                Connectivity
              </h4>
              <p className="text-white/70 text-xl max-w-xl">
                Elevating Hostel Living with Seamless Booking and Community
                Integration Where Comfort and Convenience Collide
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
                >
                  View Packages
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-5 md:text-center md:order-2 order-1">
              <a
                href="#!"
                className="lightbox lg:h-24 h-20 lg:w-24 w-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white hover:bg-red-500 text-red-500 hover:text-white duration-500 ease-in-out mx-auto"
              >
                {/* <i className="mdi mdi-play inline-flex items-center justify-center text-3xl"></i> */}
                <FaCirclePlay size={'96px'} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="container relative w-[90%] mx-auto -mt-16 z-1">
        <div className="grid grid-cols-1">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-700"
          >
            <div className="registration-form text-dark text-start">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label
                    className="form-label font-medium text-slate-900 dark:text-white"
                    {...getLabelProps()}
                  >
                    Search:
                  </label>
                  <div className="relative mt-2">
                    <IoSearchOutline className="size-[18px] absolute top-[10px] start-3" />

                    <input
                      name="name"
                      type="text"
                      className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0"
                      placeholder="Search"
                      disabled={isLocationSelected}
                      {...getInputProps()}
                    />

                    {locations.length > 0 && (
                      <ul
                        {...getMenuProps()}
                        className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          selectedItem ? 'hidden' : ''
                        }`}
                      >
                        {isOpen &&
                          locations.map((item, index) => (
                            <>
                              <div className="flex gap-2">
                                <li>
                                  <IoLocation />
                                </li>
                                <li
                                  className={`cursor-pointer ${
                                    highlightedIndex === index
                                      ? 'bg-blue-500 text-white'
                                      : ''
                                  }`}
                                  key={`${item[0]}${index}`}
                                  {...getItemProps({
                                    item,
                                    index,
                                  })}
                                >
                                  {item[0]}
                                </li>
                              </div>
                            </>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label font-medium text-slate-900 dark:text-white">
                    Select Your Date:
                  </label>
                  <div className="relative mt-2">
                    <LuCalendarDays className="size-[18px] absolute top-[10px] start-3" />

                    <input
                      name="startDate"
                      type="date"
                      onChange={handleChange}
                      className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0 start"
                      placeholder="Select Your Date"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label font-medium text-slate-900 dark:text-white">
                    Select Your Date:
                  </label>
                  <div className="relative mt-2">
                    <LuCalendarDays className="size-[18px] absolute top-[10px] start-3" />

                    <input
                      name="endDate"
                      type="date"
                      onChange={handleChange}
                      className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0 end"
                      placeholder="Select Your Date"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label font-medium text-slate-900 dark:text-white">
                    Distance to search within (KM):
                  </label>
                  <div className="relative mt-2">
                    <input
                      name="distance"
                      type="number"
                      onChange={handleChange}
                      className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0 end"
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
        </div>
      </div>
    </>
  );
};

export default Hero;
