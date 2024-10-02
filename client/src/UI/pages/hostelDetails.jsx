import React, { useEffect, useRef } from 'react';
import Navbar from '../components/navBar';
import TopBar from '../components/topBar';
import hostel1 from '../../assets/listing/1.jpg';
import mapboxgl from 'mapbox-gl';
import { BsArrowLeft, BsArrowRight, BsClock, BsStarFill } from 'react-icons/bs';
import { FiActivity } from 'react-icons/fi';
import { FaGlobe, FaRupeeSign } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { useGetListingDetailsQuery } from '../../Redux/api/hostelApis';
import Loader from '../../Admin/common/Loader';
import { IoBedSharp } from 'react-icons/io5';
import '../style/style.css';
import '../js/script.js';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FacilitiesSection from '../components/facilities.jsx';

const HostelDetails = () => {
  useEffect(() => {
    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 2,
      spaceBetween: 32,
      centeredSlides: false,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 13,
        },
      },
    });
  }, []);

  const students = [
    {
      university: 'Harvard University',
      NoOfStudents: 12,
    },
    {
      university: 'Stanford University',
      NoOfStudents: 12,
    },
    {
      university: 'ARID university Rawalpindi',
      NoOfStudents: 12,
    },
    // Add more students as needed
  ];
  const { hostelId } = useParams();
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic3VsZW1hbmt1bmRpNCIsImEiOiJjbHc3aGRrcG0xYmZvMm1yemE1aGE0ZjVjIn0.TT_W_UV0G3pGZ8VqtdUBBg';

  const mapContainer = useRef(null);
  const map = useRef(null);

  const { data, isLoading } = useGetListingDetailsQuery({
    listingId: hostelId,
  });

  const hostelData = data?.payLoad;
  console.log('This is the hostel data ', hostelData);
  const longitude = hostelData?.Location?.coordinates[0];
  const latitude = hostelData?.Location?.coordinates[1];

  console.log(longitude, latitude);
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

  console.log(hostelData?.HostelImages[0]);
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
            style={{ backgroundImage: `url(${hostel1})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
            <div className="container relative">
              <div className="grid grid-cols-1 pb-8 text-center mt-10">
                <h3 className="text-3xl leading-normal tracking-wider font-semibold text-white">
                  {hostelData.HostelName}
                </h3>
              </div>
            </div>
          </section>

          <section className="bg-white relative md:pt-24 md:pb-10 pb-8 pt-16 w-[93%] mx-auto">
            <div className="container relative">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                <div className="lg:col-span-8 md:col-span-7">
                  <div className="grid grid-cols-12 gap-4">
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
                      <BsClock className="size-5  text-red-500" />
                      <div className="ms-3">
                        <p className="font-medium text-black">Duration</p>
                        <span className="text-slate-400 font-medium text-sm">
                          Per month
                        </span>
                      </div>
                    </li>

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
                        <p className="font-medium text-black">No of Beds:</p>
                        <span className="text-slate-400 font-medium text-sm">
                          {hostelData.NumberOfBeds}
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
                    <h5 className="text-lg text-black font-semibold">
                      Food Menu:
                    </h5>

                    <div className="mt-3 shadow-2xl overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg bg-white">
                        <thead className="bg-red-500 rounded-t-lg">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                              Day
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                              Breakfast
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                              Lunch
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                              Dinner
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {hostelData?.FoodMenu?.map((item, index) => (
                            <tr
                              key={index}
                              className="hover:bg-blue-100 transition duration-200 ease-in-out"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-gray-500">
                                {item.Day}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.BreakFast}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.Lunch}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.Dinner}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="text-black container mx-auto p-6 shadow-2xl rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                      Community Page
                    </h1>
                    <div className="overflow-hidden shadow-lg rounded-lg">
                      <table className="min-w-full  bg-white border p-5 border-gray-200">
                        <thead className="bg-red-500">
                          <tr>
                            <th className="py-3 px-6 text-left text-sm font-medium text-white uppercase tracking-wider">
                              University
                            </th>

                            <th className="py-3 px-6 text-left text-sm font-medium text-white uppercase tracking-wider">
                              Total No of students
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-transparent">
                          {students.map((student, index) => (
                            <tr
                              key={index}
                              className="hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-md mb-2"
                            >
                              <td className="py-4 px-6 text-sm text-gray-500">
                                {student.university}
                              </td>

                              <td className="py-4 px-6 text-sm text-gray-500">
                                {student.NoOfStudents}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <section>
                      <FacilitiesSection facilities={hostelData?.Facilities} />
                    </section>
                  </div>
                </div>

                <div className="lg:col-span-4 md:col-span-5">
                  <div className="container relative shadow-lg">
                    <div className="lg:col-span-4 md:col-span-5">
                      <div className="sticky top-0">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <div className="text-center mb-4">
                            <p className="text-gray-500">From</p>
                            <p className="text-2xl font-bold text-gray-800">
                              PKRs2372.49
                            </p>
                          </div>

                          <button className="bg-red-500 w-full text-white py-2 rounded-md font-bold">
                            Choose a room
                          </button>
                          <div className="mt-4">
                            <div className="flex items-center mb-2">
                              <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10m-6 4h2m-6 4h10m-6 4h2"
                                />
                              </svg>
                              <span>Booking only takes 2 minutes</span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>Instant Confirmation</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <ul className="flex space-x-4">
                              <li>
                                <img
                                  src="https://a.hwstatic.com/raw/upload/f_auto,q_auto/wds/logos/payment/visa.svg"
                                  title="Visa"
                                  alt="Visa"
                                  aria-label="Visa"
                                  className="w-8 h-8"
                                />
                              </li>
                              <li>
                                <img
                                  src="https://a.hwstatic.com/raw/upload/f_auto,q_auto/wds/logos/payment/maestro.svg"
                                  title="Maestro"
                                  alt="Maestro"
                                  aria-label="Maestro"
                                  className="w-8 h-8"
                                />
                              </li>
                              <li>
                                <img
                                  src="https://a.hwstatic.com/raw/upload/f_auto,q_auto/wds/logos/payment/mastercard.svg"
                                  title="Mastercard"
                                  alt="Mastercard"
                                  aria-label="Mastercard"
                                  className="w-8 h-8"
                                />
                              </li>
                              <li>
                                <img
                                  src="https://a.hwstatic.com/raw/upload/f_auto,q_auto/wds/logos/payment/jcb.svg"
                                  title="JCB"
                                  alt="JCB"
                                  aria-label="JCB"
                                  className="w-8 h-8"
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

      <section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
            <div className="w-full lg:w-2/5">
              <span className="text-sm text-black font-medium mb-4 block">
                Hostel Reviews
              </span>
              <h2 className="text-4xl font-bold text-black leading-[3.25rem] mb-8">
                23k+ Customers gave their{' '}
                <span className=" text-transparent bg-clip-text bg-gradient-to-tr from-red-400 to-red-500">
                  Feedback
                </span>
              </h2>
            </div>
            <div className="w-full lg:w-3/5">
              <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide group bg-white border border-solid border-gray-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-5 transition-all duration-500 hover:border-indigo-600">
                    <div className="flex items-center gap-5 mb-3 sm:mb-7">
                      <img
                        className="rounded-full"
                        src="https://pagedone.io/asset/uploads/1696229969.png"
                        alt="avatar"
                      />
                      <div className="grid gap-1">
                        <h5 className="text-black font-medium transition-all duration-500  ">
                          Jane D
                        </h5>
                        <span className="text-sm leading-6 text-black">
                          CEO{' '}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 sm:mb-4 gap-2 text-amber-500 transition-all duration-500  ">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                    </div>
                    <p className="text-sm text-black font-medium leading-6 transition-all duration-500 min-h-18">
                      The user interface of this pagedone is so intuitive, I was
                      able to start using it without any guidance.
                    </p>
                  </div>
                  <div className="swiper-slide group bg-white border border-solid border-gray-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-5 transition-all duration-500 hover:border-indigo-600">
                    <div className="flex items-center gap-5 mb-3 sm:mb-7">
                      <img
                        className="rounded-full"
                        src="https://pagedone.io/asset/uploads/1696229969.png"
                        alt="avatar"
                      />
                      <div className="grid gap-1">
                        <h5 className="text-black font-medium transition-all duration-500  ">
                          Jane D
                        </h5>
                        <span className="text-sm leading-6 text-black">
                          CEO{' '}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 sm:mb-4 gap-2 text-amber-500 transition-all duration-500  ">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                    </div>
                    <p className="text-sm text-black font-medium leading-6 transition-all duration-500 min-h-18">
                      The user interface of this pagedone is so intuitive, I was
                      able to start using it without any guidance.
                    </p>
                  </div>
                  <div className="swiper-slide group bg-white border border-solid border-gray-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-5 transition-all duration-500 hover:border-indigo-600">
                    <div className="flex items-center gap-5 mb-3 sm:mb-7">
                      <img
                        className="rounded-full"
                        src="https://pagedone.io/asset/uploads/1696229969.png"
                        alt="avatar"
                      />
                      <div className="grid gap-1">
                        <h5 className="text-black font-medium transition-all duration-500  ">
                          Jane D
                        </h5>
                        <span className="text-sm leading-6 text-black">
                          CEO{' '}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 sm:mb-4 gap-2 text-amber-500 transition-all duration-500  ">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                    </div>
                    <p className="text-sm text-black font-medium leading-6 transition-all duration-500 min-h-18">
                      The user interface of this pagedone is so intuitive, I was
                      able to start using it without any guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HostelDetails;
