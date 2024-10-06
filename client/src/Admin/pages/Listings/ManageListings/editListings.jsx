import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetListingDetailsQuery,
  useUpdateListingMutation,
} from '../../../../Redux/api/hostelApis';
import Loader from '../../../common/Loader';
import DefaultLayout from '../../../layout/DefaultLayout';
import Modal from 'react-modal';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
} from 'firebase/storage';
import MediaManagment from '../../../../utils/mediaManagement';
import alerts from '../../../../utils/alerts';
import ImageLoader from '../../../common/Loader/imageLoader';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listingData, setListingData] = useState({});
  const [deleteImages, setDeleteImages] = useState([]);
  const [newImages, setNewImages] = useState({});
  const [totalRooms, setTotalRooms] = useState(0);
  const [singleBedRooms, setSingleBedRooms] = useState(0);
  const [doubleBedRooms, setDoubleBedRooms] = useState(0);
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

  const { basicAlert } = alerts();
  const allowedFileTypes = ['jpg', 'jpeg', 'png'];
  const { uploadFile } = MediaManagment();
  const [progress, setProgress] = useState(0);
  const [loading, setUploading] = useState(false);
  const [updateHostel] = useUpdateListingMutation();

  const { data, isLoading } = useGetListingDetailsQuery({ listingId: id });
  const hostelData = data?.payLoad;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // This is a semi-transparent black background
    },
    content: {
      position: 'absolute',
      top: '57%',
      left: '60%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '60%', // You can adjust this value to your liking
      height: '70%', // You can adjust this value to your liking
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
    },
  };

  useEffect(() => {
    if (hostelData) {
      setListingData(hostelData);
      setFoodMenu(JSON.parse(JSON.stringify(hostelData.FoodMenu)));
    }
  }, [hostelData]);

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

    if (e.target.type === 'file') {
      const files = Array.from(e.target.files);

      setNewImages({ ...newImages, [name]: files });
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

  const handleDeleteImage = async (imageToDelete) => {
    event.preventDefault();
    setDeleteImages([...deleteImages, imageToDelete]);
    // Update the state after the image is deleted from Firebase
    setListingData((prevData) => ({
      ...prevData,
      HostelImages: prevData.HostelImages.filter(
        (image) => image !== imageToDelete,
      ),
    }));
  };

  //Uploading new images in case if some one added
  let newImagesUploaded;
  if (newImages?.HostelImages)
    newImagesUploaded = Array.from(newImages?.HostelImages);

  console.log(listingData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        HostelName,
        HostelProvince,
        HostelCity,
        PropertyType,
        HostelAddress,
        HostelDescription,
        HostelImages,
        Currency,
        FoodMenu,
        HostelRent,
        HostelAddressProof,
      } = listingData;

      if (
        !HostelName ||
        !HostelProvince ||
        !HostelCity ||
        !PropertyType ||
        !HostelAddress ||
        !HostelDescription ||
        !HostelImages.length ||
        totalRooms === 0 ||
        singleBedRooms === 0 ||
        !HostelRent ||
        doubleBedRooms === 0 ||
        !Currency ||
        !FoodMenu.length ||
        !HostelAddressProof
      ) {
        return basicAlert(
          'Validation Error',
          `Please fill all the required fileds`,
          'error',
        );
      }

      const storage = getStorage();
      //deleting the images incase if updated
      if (deleteImages.length > 0) {
        deleteImages.map(async (image) => {
          const storageRef = ref(storage, image);
          await deleteObject(storageRef);
        });
      }

      let res;

      if (newImagesUploaded?.length > 0) {
        let downloadURLs = [];
        //This will check the extension of each image
        for (let i = 0; i < newImagesUploaded.length; i++) {
          const photo = newImagesUploaded[i];
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

        const totalBytes = newImagesUploaded.reduce(
          (total, file) => total + file.size,
          0,
        );

        const snapshots = await uploadFile({
          files: newImagesUploaded,
          setUploading,
          setProgress,
          totalBytes,
        });

        //creating download URL for each snapshots
        for (let i = 0; i < snapshots.length; i++) {
          const downloadURL = await getDownloadURL(snapshots[i].ref);
          downloadURLs.push(downloadURL);
        }

        res = await updateHostel({
          body: {
            ...listingData,
            HostelImages: [...listingData.HostelImages, ...downloadURLs],
            FoodMenu: [...FoodMenu],
          },
          id,
        });
      } else {
        res = await updateHostel({
          body: {
            ...listingData,
            FoodMenu: [...FoodMenu],
          },
          id,
        });
      }
      setUploading(false);

      if (res.data) {
        navigate('/myListings');
        return basicAlert('Success', 'Listing Updated Successfully', 'success');
      }

      basicAlert('Oops...', `${res.error.message}', 'error' `);
    } catch (e) {
      console.log(e);
      basicAlert('Oops...', 'Something went wrong...', 'error');
    }
  };

  return (
    <>
      <DefaultLayout>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Listing
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
                        value={listingData.HostelName}
                        placeholder="Enter Hostel Name"
                        onChange={handleChange}
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
                        value={listingData.PropertyType}
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
                        value={listingData.Currency}
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
                        value={totalRooms}
                        onChange={handleChange}
                        placeholder="Number of Total Rooms"
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
                        value={listingData.HostelAddress}
                        onChange={handleChange}
                        placeholder="Enter Property Address"
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
                        value={listingData.HostelDescription}
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
                        value={listingData.HostelProvince}
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
                        onChange={handleChange}
                        type="text"
                        value={listingData.HostelCity}
                      />
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
                        value={listingData.HostelRent}
                        placeholder="Enter The monthly Hostel Rent in PKR"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        type="number"
                      />
                    </div>
                  </div>
                  <h1 className="font-bold my-8 underline text-lg text-center dark:text-white">
                    Food Menu Of the Hostel
                  </h1>
                  {FoodMenu?.map((menu, index) => (
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
                            value={menu.BreakFast}
                            onChange={(e) =>
                              handleFoodMenu(index, 'BreakFast', e.target.value)
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
                            value={menu.Lunch}
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
                            value={menu.Dinner}
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
                </div>

                <div className="flex mt-6 ml-6 mb-3 flex-col w-full">
                  <h3 className="text-2xl mb-2 font-bold text-black dark:text-white">
                    Images of the Listing
                  </h3>
                </div>

                <div className="w-full mb-4 bg-white shadow-lg rounded-lg p-6 dark:bg-boxdark md:mb-0 relative">
                  <div className="grid grid-cols-3 gap-4">
                    {listingData?.HostelImages?.map((image, index) => (
                      <>
                        <div key={index}>
                          <img
                            src={image}
                            alt={`Hostel ${index + 1}`}
                            className="rounded-lg object-contain h-35 cursor-pointer"
                            onClick={() => openModal(image)}
                          />
                          <button
                            className="bg-red-500 mt-2 text-white px-4 py-2 rounded shadow hover:bg-red-600 active:bg-red-700 focus:outline-none"
                            onClick={() => handleDeleteImage(image)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ))}
                  </div>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Image Modal"
                    style={customStyles}
                  >
                    <img src={selectedImage} alt="Selected" />
                    <button
                      className="bg-red-500 text-white p-2 font-bold mt-2 rounded-md cursor-pointer"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </Modal>
                </div>
                <div className="mb-4.5 mt-4 mx-4 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Add More image here
                      <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="HostelImages"
                      multiple
                      type="file"
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Update Listing
                </button>
              </form>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageLoader progress={progress} />
                </div>
              )}
            </div>
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default EditListing;
