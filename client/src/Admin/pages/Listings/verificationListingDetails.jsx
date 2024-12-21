import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import {
  useGetSingleListingQuery,
  useVerifyListingMutation,
} from '../../../Redux/api/hostelApis';
import Loader from '../../common/Loader';
import alerts from '../../../utils/alerts';
import Swal from 'sweetalert2';

const VerifyListingDetails = () => {
  const { listingId } = useParams();
  const { user } = useSelector((s) => s.userReducer);
  const [verifyListing] = useVerifyListingMutation({ id: user._id });
  const { confirmAlert, basicAlert } = alerts();

  const { data, isLoading } = useGetSingleListingQuery({
    id: user._id,
    listingId: listingId,
  });

  const hostelData = data?.payLoad;
  const FoodMenu = hostelData?.FoodMenu;

  const verifyHandler = async (listingid) => {
    const result = await confirmAlert('Are you sure want to verify Listing');

    if (result.isConfirmed) {
      const res = await verifyListing({
        id: user._id,
        listingId: listingid,
      });

      if (res.data) {
        basicAlert('Verified!', 'This Listing Has Been Verfied.', 'success');
      } else if (res.error) {
        basicAlert('Failed!', res.error.data.message, 'error');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      basicAlert('Cancelled', 'The Listing verification cancelled.', 'error');
    }
  };

  const multiSeaterRoomsAvailable = hostelData?.SeaterRooms?.some(
    (seaterRoom) => seaterRoom.rooms.some((room) => room.isAvailable),
  );

  console.log(hostelData);

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
            <p className="text-black dark:text-white">Review the Hostel info</p>
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
                </span>{' '}
                {hostelData?.ListingOwner?.Email}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Province:
                </span>{' '}
                {hostelData?.HostelProvince}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  City:
                </span>{' '}
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
                </span>{' '}
                {hostelData?.PropertyType}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Number of Beds:
                </span>{' '}
                {hostelData?.NumberOfBeds}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Rent:
                </span>{' '}
                {hostelData?.HostelRent} {hostelData?.Currency}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-700 dark:text-white">
                  Hostel Status:
                </span>
                {hostelData?.Status === 'Pending' ? (
                  <button
                    onClick={() => verifyHandler(hostelData._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-4"
                  >
                    Verify Hostel
                  </button>
                ) : (
                  <span
                    className={`ml-3 text-white rounded-full px-2 py-1 text-xs  ${
                      hostelData?.Status === 'Pending'
                        ? 'bg-red-500'
                        : 'bg-green-600'
                    }   `}
                  >
                    {hostelData?.Status}
                  </span>
                )}
              </p>
              {multiSeaterRoomsAvailable && (
                <p className="mb-2 text-green-600 text-xl font-bold">
                  Multi-seater rooms are available!
                </p>
              )}
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
        </>
      )}
    </DefaultLayout>
  );
};

export default VerifyListingDetails;
