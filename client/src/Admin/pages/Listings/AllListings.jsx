import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaChevronRight, FaRegBuilding } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
  useGetAllListingsQuery,
  useVerifyListingMutation,
} from '../../../Redux/api/hostelApis';
import Loader from '../../common/Loader';
import alerts from '../../../utils/alerts';
import { BsChevronRight } from 'react-icons/bs';

const AllListings = () => {
  const { user } = useSelector((s) => s.userReducer);
  const [verifyListing] = useVerifyListingMutation({ id: user._id });
  const { confirmAlert, basicAlert } = alerts();

  const { data, isLoading, error } = useGetAllListingsQuery({ id: user._id });
  const listingData = data?.payLoad;

  if (error) {
    return toast.error('An error occurred while fetching your listings');
  }

  const verifyHandler = async (listingid) => {
    const result = await confirmAlert();
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
                  ALL Listings
                </h6>
              </div>
            </div>
            {/* Hi Muhammad!
This is where you can manage all your listings. */}
            {listingData.length > 0
              ? listingData.map((lisitng, key) => {
                  return (
                    <div
                      key={key}
                      className={`flex mb-4 items-center bg-white dark:border-strokedark dark:bg-boxdark shadow-lg rounded-xl p-6  ${
                        key !== 0 && 'mb-4'
                      }`}
                    >
                      <div className="flex-grow">
                        <div className="flex items-center mb-4">
                          <FaRegBuilding
                            size={26}
                            className="mr-2 text-black dark:text-white"
                          />
                          <div className="flex items-center">
                            <a className="text-lg font-semibold text-black underline dark:text-white mr-2">
                              {lisitng.HostelName}
                            </a>
                            <span
                              className={`text-white rounded-full px-2 py-1 text-xs  ${
                                lisitng.Status === 'Pending'
                                  ? 'bg-red-500'
                                  : 'bg-green-600'
                              }   `}
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
                      <div className="flex flex-col gap-4 items-center">
                        {lisitng.Status !== 'Verified' && (
                          <button
                            onClick={() => verifyHandler(lisitng._id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                          >
                            Verify Lisitng
                            <FaChevronRight size={15} />
                          </button>
                        )}

                        <Link
                          to={`/verifyListingDetails/${lisitng._id}`}
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

        {/* I WILL USE THIS UI WHEN OWNER LIST HIS PROPERTY */}
        {/* <div className="col-span-9">
          <div className="page-header flex items-center space-x-4">
            <img
              src="https://a.hwstatic.com/raw/upload/f_auto,q_auto/wds/illustrations/md/hifive.svg"
              width="60"
              height="60"
              title="High five image"
              alt="High five image"
              aria-label="High five image"
            />
            <h1 className="text-2xl font-bold">
              Well done!
              <br />
              We will now review your signup details
            </h1>
          </div>
          <div>
            <p className="my-4">
              Thank you for signing up for your property, we will review your
              property details and send you an email to verify your account and
              let you know what to expect next.
            </p>
            <h3 className="text-xl font-semibold mb-2">
              In order to build your listing, please prepare:
            </h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Photos of your property (including photos for rooms)</li>
              <li>
                Information about your property including Property description,
                directions, rooms and things to note
              </li>
              <li>Your property facilities and policies</li>
              <li>Tax details if applicable</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">
              Not sure what to do next?
            </h3>
            <p className="mb-4">
              Our team will guide you through all the steps, and you can decide
              when you want your property to go live.
            </p>
            <div className="flex">
              <a
                href="/en/listings"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                 SVG content
                </svg>
                My Listings
              </a>
            </div>
          </div>
        </div> */}
      </DefaultLayout>
    </div>
  );
};

export default AllListings;
