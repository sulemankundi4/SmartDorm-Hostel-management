import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetBookingsQuery } from '../../../Redux/api/singleRoomBookingsApis';
import Loader from '../../common/Loader';
import toast from 'react-hot-toast';
import { BsChevronRight } from 'react-icons/bs';

const VerifySingleRoomBookings = () => {
  const { user } = useSelector((s) => s.userReducer);
  const { data, isLoading, isError } = useGetBookingsQuery({
    userId: user._id,
  });

  const bookingData = data?.bookings;

  if (isError) {
    return toast.error('An error occurred while fetching your bookings');
  }

  const handleVerify = (bookingId) => {
    // Add your verification logic here
    console.log(`Verifying booking with ID: ${bookingId}`);
  };

  return (
    <div>
      <DefaultLayout>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col w-full">
              <h3 className="text-2xl mb-2 font-bold text-black dark:text-white">
                Hi {`${user.Name}`}!
              </h3>
              <p className="text-black dark:text-white">
                This is where you can manage all your Single room bookings.
              </p>
            </div>

            <div className="flex flex-col items-center md:flex-row md:space-x-4 w-full my-8">
              <div className="w-full md:w-1/2">
                <h6 className="text-xl font-bold text-black dark:text-white">
                  My Bookings
                </h6>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookingData?.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-[#24303F] duration-300"
                >
                  <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                    Hostel Name: {booking.HostelName.HostelName}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-extrabold">Address</span>:{' '}
                    {booking.HostelName.HostelAddress}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-extrabold">Student </span>:{' '}
                    {booking.StudentName.Name} ({booking.StudentName.Email})
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-extrabold"> University </span>:{' '}
                    {booking.StudentName.University}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-extrabold"> Check-In Date </span>:{' '}
                    {new Date(booking.CheckInDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-extrabold"> Check-Out Date</span>:{' '}
                    {new Date(booking.CheckOutDate).toLocaleDateString()}
                  </p>
                  <p
                    className={`mb-1 ${
                      booking.Status === 'confirmed'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    Status: {booking.Status}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-extrabold">Amount</span>: $
                    {booking.Amount}
                  </p>
                  {booking.Status !== 'confirmed' && (
                    <button
                      onClick={() => handleVerify(booking._id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                    >
                      Verify
                    </button>
                  )}
                  <div className="flex items-center mt-4">
                    <Link
                      to={`/listingDetails/${booking.HostelName._id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                    >
                      See Summary
                      <BsChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </DefaultLayout>
    </div>
  );
};

export default VerifySingleRoomBookings;
