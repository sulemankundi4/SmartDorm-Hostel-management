import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/navBar';
import TopBar from '../components/topBar';
import hostel1 from '../../assets/listing/1.jpg';
import mapboxgl from 'mapbox-gl';
import { FiActivity } from 'react-icons/fi';
import { FaCross, FaGlobe, FaRupeeSign } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetAllListingsQuery,
  useGetListingDetailsQuery,
} from '../../Redux/api/hostelApis';
import Loader from '../../Admin/common/Loader';
import { IoBedSharp } from 'react-icons/io5';
import '../style/style.css';

import FacilitiesSection from '../components/facilities.jsx';
import FoodMenu from '../components/HostelsComponents/foodMenu.jsx';
import CoummunityPage from '../components/HostelsComponents/coummunityPage.jsx';
import HostelReviews from '../components/HostelsComponents/hostelReviews.jsx';
import { useCreatePaymentIntentMutation } from '../../Redux/api/paymentApis.jsx';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useGetCommunityStatsQuery } from '../../Redux/api/singleRoomBookingsApis.jsx';

const HostelDetails = () => {
  const navigate = useNavigate();
  const { hostelId } = useParams();

  const { user } = useSelector((state) => state.userReducer);

  const { data, isLoading } = useGetListingDetailsQuery({
    listingId: hostelId,
  });

  const [createPaymentIntentApi] = useCreatePaymentIntentMutation();

  const { data: communityStats } = useGetCommunityStatsQuery({
    hostelId: hostelId,
  });

  const hostelData = data?.payLoad;

  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    setSelectedImage(hostelData?.HostelImages[0]);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  mapboxgl.accessToken = `pk.eyJ1Ijoic3VsZW1hbmt1bmRpNCIsImEiOiJjbHc3aGRrcG0xYmZvMm1yemE1aGE0ZjVjIn0.TT_W_UV0G3pGZ8VqtdUBBg`;

  const mapContainer = useRef(null);
  const map = useRef(null);

  const communityStatsData = communityStats?.data;

  const longitude = hostelData?.Location?.coordinates[0];
  const latitude = hostelData?.Location?.coordinates[1];

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Check if mapContainer.current is not null
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [longitude, latitude],
      zoom: 15,
    });

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
  });

  const handleBookNowClick = () => {
    if (!user) {
      return navigate('/signup');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createPaymentIntent = async () => {
    if (hostelData.SingleBedRooms === 0) {
      setShowModal(false);
      return toast.error('No Single Room Available');
    }
    try {
      setSubmitting(true);
      const { data } = await createPaymentIntentApi({
        amount: hostelData.HostelRent,
      });

      if (data.success) {
        setSubmitting(false);

        return navigate('/pay', {
          state: {
            clientSecret: data.clientSecret,
            hostelId: hostelData._id,
            amount: hostelData.HostelRent,
            ownerId: hostelData.ListingOwner._id,
          },
        });
      }
      setSubmitting(false);

      //toaster
      toast.error(data.message);
    } catch (error) {
      toast.error('Something went wrong during Booking');
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white">
          <TopBar />
          <Navbar />
          <section
            className={`relative table w-full items-center py-36 bg-top bg-no-repeat bg-cover`}
            style={{ backgroundImage: `url(${hostelData.HostelImages[1]})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
            <div className="container relative">
              <div className="grid grid-cols-1 pb-8 text-center mt-10">
                <h3 className="text-3xl leading-normal tracking-wider font-semibold text-white">
                  {hostelData?.HostelName}
                </h3>
              </div>
            </div>
          </section>

          <section className="bg-white relative md:pt-24 md:pb-10 pb-8 pt-16 w-[93%] mx-auto">
            <div className="container relative">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                <div className="lg:col-span-8 md:col-span-7">
                  {/* <div className="grid grid-cols-12 gap-4">
                    <div className="md:col-span-8 col-span-7">
                      <div className="group relative overflow-hidden rounded shadow dark:shadow-gray-800">
                        <img
                          src={hostelData.HostelImages[0] || hostel1}
                          className="w-full lg:h-60 md:h-44 h-48 object-cover"
                          alt=""
                        />
                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                      </div>
                    </div>

                    <div className="md:col-span-4 col-span-5">
                      <div className="group relative overflow-hidden rounded shadow dark:shadow-gray-800">
                        <img
                          src={hostelData.HostelImages[1] || hostel1}
                          className="w-full lg:h-60 md:h-44 h-48 object-cover"
                          alt=""
                        />
                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                      </div>
                    </div>

                    <div className="md:col-span-4 col-span-5">
                      <div className="group relative overflow-hidden rounded shadow dark:shadow-gray-800">
                        <img
                          src={hostelData.HostelImages[2] || hostel1}
                          className="w-full lg:h-60 md:h-44 h-48 object-cover"
                          alt=""
                        />
                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                      </div>
                    </div>

                    <div className="md:col-span-8 col-span-7">
                      <div className="group relative overflow-hidden rounded shadow dark:shadow-gray-800">
                        <img
                          src={hostelData.HostelImages[3] || hostel1}
                          className="w-full lg:h-60 md:h-44 h-48 object-cover"
                          alt=""
                        />
                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                      </div>
                    </div>
                  </div> */}
                  <div className="main-image mb-4 rounded-lg overflow-hidden shadow-md">
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Hostel"
                        className="w-full h-80 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="thumbnails flex space-x-2 overflow-x-auto p-2 bg-gray-100 rounded-lg shadow-inner">
                    {hostelData?.HostelImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Hostel thumbnail ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-red-500 hover:shadow-lg transition duration-300 transform hover:scale-105"
                        onClick={() => setSelectedImage(image)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <h5 className="text-2xl text-black font-semibold mt-5">
                      {hostelData.HostelName}
                    </h5>
                  </div>

                  <p className="flex items-center text-slate-400 font-medium mt-2">
                    <i data-feather="map-pin" className="size-4 me-1"></i>{' '}
                    {hostelData.HostelProvince}
                  </p>

                  <ul className="list-none">
                    <li className="inline-flex items-center me-5 mt-5">
                      <FiActivity className="size-5 stroke-[1.5] text-red-500" />
                      <div className="ms-3">
                        <p className="font-medium text-black">Type</p>
                        <span className="text-slate-400 font-medium text-sm">
                          Hostel
                        </span>
                      </div>
                    </li>

                    <li className="inline-flex items-center me-5 mt-5">
                      <IoBedSharp className="size-5 text-red-500" />
                      <div className="ms-3">
                        <p className="font-medium text-black">Single Rooms</p>
                        <span className="text-slate-400 font-medium text-sm">
                          {hostelData.SingleBedRooms} Single Rooms
                        </span>
                      </div>
                    </li>
                    <li className="inline-flex items-center me-5 mt-5">
                      <IoBedSharp className="size-5 text-red-500" />
                      <div className="ms-3">
                        <p className="font-medium text-black">Double Rooms</p>
                        <span className="text-slate-400 font-medium text-sm">
                          {hostelData.DoubleBedRooms} Double Rooms
                        </span>
                      </div>
                    </li>

                    <li className="inline-flex items-center me-5 mt-5">
                      <FaGlobe className="size-5 text-red-500" />
                      <div className="ms-3">
                        <p className="font-medium text-black">Languages</p>
                        <span className="text-slate-400 font-medium text-sm">
                          English/Urdu
                        </span>
                      </div>
                    </li>

                    <li className="inline-flex items-center me-5 mt-5">
                      <FaRupeeSign className="size-5 text-red-500" />
                      <div className="ms-3">
                        <p className="font-medium text-black">Rent / Month</p>
                        <span className="text-slate-400 font-medium text-sm">
                          {hostelData.HostelRent} Pkr
                        </span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6">
                    <h5 className="text-lg text-black font-semibold">
                      Service Descriptions:
                    </h5>

                    <p className="text-slate-400 mt-6">
                      {hostelData.HostelDescription}
                    </p>
                  </div>

                  <div className="mt-6">
                    {user?.Role !== 'user' && (
                      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="w-full md:w-1/2 p-4">
                          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <h3 className="text-2xl text-black font-semibold mb-4">
                              Book a Single Room
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Enjoy the privacy and comfort of a single room.
                            </p>
                            <p className="text-gray-800 font-bold mb-4">
                              {hostelData.HostelRent} PKR per month
                            </p>
                            <button
                              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                              onClick={handleBookNowClick}
                            >
                              Book Now
                            </button>
                          </div>

                          {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-600 ease-in-out">
                              <div className="fixed inset-0 bg-black-2 bg-opacity-75 transition-opacity duration-300 ease-in-out"></div>
                              <div className="bg-white rounded-lg p-8 z-10 w-3/4 md:w-1/2 lg:w-1/3 relative transition-transform duration-300 ease-in-out transform scale-95">
                                <button
                                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                  onClick={handleCloseModal}
                                >
                                  <FaCross />
                                </button>
                                <h2 className="text-2xl text-black font-bold mb-4">
                                  Booking Confirmation
                                </h2>
                                <p className="mb-4">
                                  You are about to book a single room for
                                  {` ` + hostelData.HostelRent} PKR per month.
                                </p>

                                {submitting ? (
                                  <button
                                    disabled=""
                                    type="button"
                                    class="bg-red-500 items-center text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mr-2"
                                  >
                                    <svg
                                      aria-hidden="true"
                                      role="status"
                                      class="inline mr-2 w-5 h-5 text-white animate-spin"
                                      viewBox="0 0 100 101"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                      ></path>
                                      <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#1C64F2"
                                      ></path>
                                    </svg>
                                    Processing...
                                  </button>
                                ) : (
                                  <button
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mr-2"
                                    onClick={createPaymentIntent}
                                  >
                                    Proceed To Check out
                                  </button>
                                )}

                                <button
                                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                                  onClick={handleCloseModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <h3 className="text-xl text-black font-semibold mb-4">
                              Book a Double Room
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Share a room with a friend or family member.
                            </p>
                            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <FoodMenu hostelData={hostelData} />
                    </div>
                  </div>

                  <div className="text-black container mx-auto p-6 shadow-2xl rounded-lg">
                    <CoummunityPage students={communityStatsData} />

                    <section>
                      <FacilitiesSection facilities={hostelData?.Facilities} />
                    </section>
                  </div>
                </div>

                <div className="lg:col-span-4 md:col-span-5">
                  <div className="p-4 rounded-md shadow-lg dark:shadow-gray-700 sticky top-0">
                    <div className="mt-6">
                      <h5 className="text-lg font-medium text-black">
                        SmartDorm Map
                      </h5>
                      <div className="mt-6">
                        <h5 className="text-lg font-medium">Location Map</h5>
                        <div className="mt-3">
                          <div ref={mapContainer} className="h-52" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <HostelReviews hostelId={hostelId} />
    </>
  );
};

export default HostelDetails;
