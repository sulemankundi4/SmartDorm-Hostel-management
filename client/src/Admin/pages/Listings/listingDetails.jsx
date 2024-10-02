import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import { useGetListingDetailsQuery } from '../../../Redux/api/hostelApis';
import Loader from '../../common/Loader';
import Modal from 'react-modal';

const ListingDetails = () => {
  const { listingId } = useParams();
  const { user } = useSelector((s) => s.userReducer);

  const { data, isLoading } = useGetListingDetailsQuery({
    listingId: listingId,
  });

  const hostelData = data?.payLoad;
  const FoodMenu = hostelData?.FoodMenu;

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
  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex mb-10 flex-col w-full">
            <h3 className="text-2xl mb-2 font-bold text-black dark:text-white">
              Hi {`${user.Name}`}!
            </h3>
            <p className="text-black dark:text-white">
              Review the Hostel info of HOSTEL NAME
            </p>
          </div>
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 dark:bg-boxdark">
            <div className="w-full mb-4 md:w-1/2 md:mb-0 relative">
              <img
                src={hostelData?.HostelAddressProof}
                alt="Hostel"
                className="rounded-lg object-contain h-full w-full"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50"
                onClick={() =>
                  window.open(hostelData?.HostelAddressProof, '_blank')
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-12 w-12 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">
                {hostelData?.HostelName}
              </h2>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Hostel Owner Name:
                </span>{' '}
                {hostelData?.ListingOwner?.Name}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Hostel Owner Email:
                </span>
                {hostelData?.ListingOwner?.Email}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Province:
                </span>
                {hostelData?.HostelProvince}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  City:
                </span>
                {hostelData?.HostelCity}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Address:
                </span>{' '}
                {hostelData?.HostelAddress}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Property Type:
                </span>
                {hostelData?.PropertyType}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Number of Beds:
                </span>
                {hostelData?.NumberOfBeds}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Rent:
                </span>{' '}
                {hostelData?.HostelRent} {hostelData?.Currency}
              </p>
            </div>
          </div>
          <div className="flex mt-6 mb-3 flex-col w-full ">
            <h3 className="text-2xl mb-2 font-bold text-black dark:text-white">
              Food Menu of the Listing
            </h3>
          </div>
          <div className="w-full mb-4 mt-4 bg-white shadow-lg rounded-lg overflow-x-auto p-6 dark:bg-boxdark md:mb-0 relative">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-boxdark">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-bold text-black dark:text-white  tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-black dark:text-white tracking-wider">
                    Breakfast
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-black dark:text-white tracking-wider">
                    Lunch
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-black dark:text-white tracking-wider">
                    Dinner
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-boxdark">
                {FoodMenu.map((menu, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                      {menu.Day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                      {menu.BreakFast}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                      {menu.Lunch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                      {menu.Dinner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex mt-6 mb-3 flex-col w-full">
            <h3 className="text-2xl mb-2 font-bold text-black dark:text-white">
              Images of the Listing
            </h3>
          </div>

          <div className="w-full mb-4 bg-white shadow-lg rounded-lg p-6 dark:bg-boxdark md:mb-0 relative">
            <div className="grid grid-cols-3 gap-4">
              {hostelData?.HostelImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hostel ${index + 1}`}
                  className="rounded-lg object-contain cursor-pointer"
                  onClick={() => openModal(image)}
                />
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
        </>
      )}
    </DefaultLayout>
  );
};

export default ListingDetails;
