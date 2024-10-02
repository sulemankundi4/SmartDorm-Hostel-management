import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import alerts from '../../../utils/alerts';
import { getDownloadURL } from 'firebase/storage';
import MediaManagment from '../../../utils/mediaManagement';
import ImageLoader from '../../common/Loader/imageLoader';
import { useAddNewListingMutation } from '../../../Redux/api/hostelApis';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCombobox } from 'downshift';

import axios from 'axios';

const AddNewListing = () => {
  const facilitiesList = [
    'FreeBreakfast',
    'FreeParking',
    'FreeCityMaps',
    'FreeWifi',
    'FreeInternetAccess',
    'BicycleParking',
    'AirportTransfers',
    'LuggageStorage',
  ];

  const navigate = useNavigate();

  const [totalRooms, setTotalRooms] = useState(0);
  const [singleBedRooms, setSingleBedRooms] = useState(0);
  const [doubleBedRooms, setDoubleBedRooms] = useState(0);
  const { user } = useSelector((s) => s.userReducer);
  const ListingOwner = user._id;

  const [listingData, setListingData] = useState({});

  const [FoodMenu, setFoodMenu] = useState([
    {
      Day: 'Monday',
      BreakFast: '',
      Lunch: '',
      Dinner: '',
    },
    {
      Day: 'Tuesday',
      BreakFast: '',
      Lunch: '',
      Dinner: '',
    },
    {
      Day: 'Wednesday',
      BreakFast: '',
      Lunch: '',
      Dinner: '',
    },
    {
      Day: 'Thursday',
      BreakFast: '',
      Lunch: '',
      Dinner: '',
    },
    {
      Day: 'Friday',
      BreakFast: '',
      Lunch: '',
      Dinner: '',
    },
    {
      Day: 'Saturday',
      BreakFast: '',
      Lunch: '',
      Dinner: '',
    },
    {
      Day: 'Sunday',
      BreakFast: '',
      Lunch: '',
      Dinner: '',
    },
  ]);

  const [hostelFacilities, setHostelFacilities] = useState({
    FreeBreakfast: false,
    FreeParking: false,
    FreeCityMaps: false,
    FreeWifi: false,
    FreeInternetAccess: false,
    BicycleParking: false,
    AirportTransfers: false,
    LuggageStorage: false,
  });

  const [locations, setLocations] = useState([]);
  const [selectedlocation, setSelectedLocation] = useState();

  const {
    HostelImages,
    HostelAddress,
    HostelAddressProof,
    Currency,
    HostelName,
    HostelProvince,
    HostelDescription,
    HostelCity,
    PropertyType,
  } = listingData;

  //////////////////LOCATION CHANGE///////////////////////
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
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
            access_token:
              'pk.eyJ1Ijoic3VsZW1hbmt1bmRpNCIsImEiOiJjbHc3aGRrcG0xYmZvMm1yemE1aGE0ZjVjIn0.TT_W_UV0G3pGZ8VqtdUBBg',
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
      setSelectedLocation(selectedItem);
    },
  });
  ///////////////////////////////////////////////////

  //APIS
  const [addNewListing] = useAddNewListingMutation();

  const { uploadFile } = MediaManagment();
  const [progress, setProgress] = useState(0);
  const [loading, setUploading] = useState(false);

  const { basicAlert } = alerts();
  const allowedFileTypes = ['jpg', 'jpeg', 'png'];

  const handleChange = async (e) => {
    e.preventDefault();

    const { name, value, type, files } = e.target;

    let numericSingleBedRooms = singleBedRooms;
    let numericTotalRooms = totalRooms;

    if (name === 'TotalRooms') {
      numericTotalRooms = Number(value);
      setTotalRooms(numericTotalRooms);
    }

    if (name === 'SingleBedRooms') {
      numericSingleBedRooms = Number(value);
      setSingleBedRooms(numericSingleBedRooms);
    }

    if (numericSingleBedRooms > numericTotalRooms) {
      setSingleBedRooms('');
      setDoubleBedRooms(numericTotalRooms);
      return basicAlert(
        'Validation Error',
        'Single Bed Rooms should be less than or equal to Total Rooms',
        'error',
      );
    }
    setDoubleBedRooms(numericTotalRooms - numericSingleBedRooms);

    if (type === 'file') {
      setListingData({ ...listingData, [name]: files });
    } else {
      setListingData({ ...listingData, [name]: value });
    }
  };

  /////////////////HANDLE CHAGNE FUNCTION FOR THE FOOF MENU/////////////
  const handleFoodMenu = (index, meal, value) => {
    const newMenu = [...FoodMenu];
    newMenu[index][meal] = value;
    setFoodMenu(newMenu);
  };

  const handleFacilities = (e) => {
    const { name, checked } = e.target;
    setHostelFacilities({
      ...hostelFacilities,
      [name]: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !HostelAddress ||
      !HostelAddressProof ||
      !Currency ||
      !HostelName ||
      !HostelProvince ||
      !HostelCity ||
      !PropertyType ||
      !HostelImages ||
      !HostelDescription ||
      !HostelAddressProof ||
      !singleBedRooms ||
      !doubleBedRooms ||
      !totalRooms ||
      selectedlocation.length === 0
    ) {
      return basicAlert(
        'Validation Error',
        'Please fill all the required fields',
        'error',
      );
    }

    try {
      if (HostelImages.length < 1) {
        return basicAlert(
          'Validation Error',
          'Please upload at least 4 images',
          'error',
        );
      }
      let downloadURLs = [];
      let allImages = Array.from(HostelImages);
      allImages.push(HostelAddressProof[0]);

      //This will check the extension of each image
      for (let i = 0; i < allImages.length; i++) {
        const photo = allImages[i];
        const fileExtension = photo.name.split('.').pop().toLowerCase();

        if (!allowedFileTypes.includes(fileExtension)) {
          return basicAlert(
            'Validation Error',
            `We only accept jpg, jpeg and png files! Invalid file: ${photo.name}`,
            'error',
          );
        }
        //Checking images size not allowing over 1 mb
        if (photo.size > 1048576) {
          return basicAlert(
            'Validation Error',
            `Image should be less than 1 MB: ${photo.name}`,
            'error',
          );
        }
      }

      const totalBytes = allImages.reduce(
        (total, file) => total + file.size,
        0,
      );

      const snapshots = await uploadFile({
        files: allImages,
        setUploading,
        setProgress,
        totalBytes,
      });

      //creating download URL for each snapshots
      for (let i = 0; i < snapshots.length; i++) {
        const downloadURL = await getDownloadURL(snapshots[i].ref);
        downloadURLs.push(downloadURL);
      }

      const adressVerifyImg = downloadURLs.pop();

      const res = await addNewListing({
        body: {
          ...listingData,
          ListingOwner,
          FoodMenu,
          TotalRooms: totalRooms,
          SingleBedRooms: singleBedRooms,
          DoubleBedRooms: doubleBedRooms,
          Facilities: hostelFacilities,
          Location: {
            type: 'Point',
            coordinates: selectedlocation[1],
          },
          SelectedLocationName: selectedlocation[0],
          HostelAddressProof: adressVerifyImg,
          HostelImages: downloadURLs,
        },
      });
      setUploading(false);

      if (res.data) {
        navigate('/myListings');
        return basicAlert('Success', 'Listing Created Successfully', 'success');
      }

      basicAlert('Oops...', `${res.error.message}', 'error' `);
    } catch (e) {
      basicAlert('Oops...', 'Something went wrong...', 'error');
    }
  };

  return (
    <>
      <DefaultLayout>
        <>
          <div className={`grid grid-cols-1 gap-9 sm:grid-cols-1 relative`}>
            <div
              className={`flex flex-col gap-9 ${
                loading ? 'blur-md pointer-events-none' : ''
              }`}
            >
              {/* <!-- Contact Form --> */}
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Create New Listing
                  </h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Property Name
                        </label>
                        <input
                          name="HostelName"
                          type="text"
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
                          onChange={handleChange}
                        >
                          <option disabled selected value="">
                            Select your currency
                          </option>
                          <option value="Pkr">PKR</option>
                          <option value="USD">USD</option>
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
                          onChange={handleChange}
                          placeholder="Number of beds"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Sinle Bed Rooms <span className="text-meta-1">*</span>
                        </label>
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          name="SingleBedRooms"
                          type="number"
                          min={0}
                          value={singleBedRooms}
                          disabled={!totalRooms}
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
                          value={doubleBedRooms}
                          onChange={handleChange}
                          placeholder="Number of double bed rooms."
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full ">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Property Address
                        </label>
                        <textarea
                          name="HostelAddress"
                          placeholder="Enter Property Address"
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full ">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Property Description
                        </label>
                        <textarea
                          name="HostelDescription"
                          placeholder="Enter Property Description"
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Province <span className="text-meta-1">*</span>
                        </label>
                        <select
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          name="HostelProvince"
                          onChange={handleChange}
                        >
                          <option disabled selected value="">
                            Select your Province
                          </option>
                          <option value="Sindh">Sindh</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Balochistan">Balochistan</option>
                          <option value="KPk">KPk</option>
                          <option value="Gilgit Baltistan">
                            Gilgit Baltistan
                          </option>
                          <option value="AJK">AJK</option>
                        </select>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          City
                        </label>
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          name="HostelCity"
                          type="text"
                          placeholder="Enter the city name please"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-1.5 flex flex-col gap-6 xl:flex-row">
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Proof of Address{' '}
                            <span className="text-meta-1">*</span>
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
                            Images of the Hostels
                            <span className="text-meta-1">*</span>
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
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Hostel Rent per Month (PKR)
                          <span className="text-meta-1">*</span>
                        </label>
                        <input
                          name="HostelRent"
                          onChange={handleChange}
                          placeholder="Enter The monthly Hostel Rent in PKR"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="number"
                        />
                      </div>
                    </div>
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
                                    highlightedIndex === index
                                      ? 'bg-blue-500 text-white'
                                      : ''
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
                    <h1 className="font-bold my-8 underline text-lg text-center dark:text-white">
                      Food Menu Of the Hostel
                    </h1>
                    {FoodMenu.map((menu, index) => (
                      <div
                        key={index}
                        className="mb-4 dark:border-strokedark dark:bg-boxdark"
                      >
                        <h2 className="font-bold text-lg mb-2 dark:text-white">
                          {menu.Day}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                              Breakfast
                            </label>
                            <input
                              type="text"
                              name={`FoodMenu[${index}].BreakFast`}
                              onChange={(e) =>
                                handleFoodMenu(
                                  index,
                                  'BreakFast',
                                  e.target.value,
                                )
                              }
                              placeholder={`Enter Breakfast for ${menu.Day}`}
                              required
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                              Lunch
                            </label>
                            <input
                              type="text"
                              name={`FoodMenu[${index}].Lunch`}
                              onChange={(e) =>
                                handleFoodMenu(index, 'Lunch', e.target.value)
                              }
                              placeholder={`Enter Lunch for ${menu.Day}`}
                              required
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                              Dinner
                            </label>
                            <input
                              type="text"
                              name={`FoodMenu[${index}].Dinner`}
                              onChange={(e) =>
                                handleFoodMenu(index, 'Dinner', e.target.value)
                              }
                              placeholder={`Enter Dinner for ${menu.Day}`}
                              required
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <h1 className="font-bold mb-4 underline text-lg text-center dark:text-white">
                      Services Provided by the Hostel
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 dark:text-white gap-4 p-4 dark:bg-[#24303F]">
                      {facilitiesList.map((facility, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name={`${facility}`}
                            onChange={(e) => handleFacilities(e)}
                            className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary"
                          />
                          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {facility.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </label>
                      ))}
                    </div>
                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                      Create Listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageLoader progress={progress} />
              </div>
            )}
          </div>
        </>
      </DefaultLayout>
    </>
  );
};

export default AddNewListing;
