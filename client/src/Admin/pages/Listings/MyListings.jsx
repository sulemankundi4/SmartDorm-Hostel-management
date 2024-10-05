import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaRegBuilding } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useOwnerListingQuery } from '../../../Redux/api/hostelApis';
import Loader from '../../common/Loader';
import { BsChevronBarRight, BsChevronRight } from 'react-icons/bs';
const MyListings = () => {
  const { user } = useSelector((s) => s.userReducer);

  const { data, isLoading, error } = useOwnerListingQuery({ id: user._id });

  const listingData = data?.payLoad;

  if (error) {
    return toast.error('An error occurred while fetching your listings');
  }

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
                This is where you can manage all your Hostel Listings.
              </p>
            </div>

            <div className="flex flex-col items-center md:flex-row md:space-x-4 w-full my-8">
              <div className="w-full md:w-1/2">
                <h6 className="text-xl font-bold text-black dark:text-white">
                  My Listings
                </h6>
              </div>
              <div className="w-full md:w-1/2 flex justify-end">
                <Link
                  to={'/myListings/new'}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white cursor-pointer bg-red-500 hover:bg-red-600 transition-all duration-200"
                >
                  <MdAdd size={24} />
                  Add New Listing
                </Link>
              </div>
            </div>

            {listingData.length > 0
              ? listingData.map((lisitng, key) => {
                  return (
                    <div
                      key={key}
                      className={`flex items-center bg-white dark:border-strokedark dark:bg-boxdark shadow-lg rounded-xl p-6  ${
                        key === 0 ? 'mb-4' : 'mb-4'
                      }`}
                    >
                      <div className="flex-grow">
                        <div className="flex items-center mb-4">
                          <FaRegBuilding
                            size={26}
                            className="mr-2 text-black dark:text-white"
                          />
                          <div className="flex items-center">
                            <a
                              href="/en/listings/1410297/summary"
                              className="text-lg font-semibold text-black underline dark:text-white mr-2"
                            >
                              {lisitng.HostelName}
                            </a>
                            <span
                              className={`text-white rounded-full px-2 py-1 text-xs  ${
                                lisitng.Status === 'Pending'
                                  ? 'bg-red-500'
                                  : 'bg-green-600'
                              }`}
                            >
                              {lisitng.Status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center mb-4">
                          <IoLocationOutline
                            size={26}
                            className="mr-2 text-black dark:text-white"
                          />

                          <p className="text-black dark:text-white">
                            {lisitng.HostelAddress}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link
                          to={`/listingDetails/${lisitng._id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                        >
                          See Summary
                          <BsChevronRight size={18} />
                        </Link>
                      </div>
                    </div>
                  );
                })
              : null}
          </>
        )}
      </DefaultLayout>
    </div>
  );
};

export default MyListings;
