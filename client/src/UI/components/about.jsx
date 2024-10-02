import React from 'react';
import AboutPic from '../../assets/Images/about.jpg';
import { TbWorld } from 'react-icons/tb';
import { FiUsers } from 'react-icons/fi';
import mapPlane from '../../assets/Images/map-plane-big.png';
const About = () => {
  return (
    <>
      <div className="grid grid-cols-1 mt-15 pb-8 text-center">
        <h3 className="mb-4 text-black md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
          About SmartDorm
        </h3>

        <p className="text-slate-400 max-w-xl mx-auto">
          Elevating Hostel Living with Seamless Booking and Community
          Integration Where Comfort and Convenience Collide
        </p>
      </div>
      <div className="container relative md:mt-10 mt-6 w-[93%] mx-auto">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6 relative">
          <div className="md:col-span-5">
            <div className="relative">
              <img
                src={AboutPic}
                className="mx-auto rounded-3xl shadow dark:shadow-gray-700 w-[90%]"
                alt=""
              />

              <div className="absolute flex items-center bottom-16 md:-start-10 -start-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-56 m-3">
                <div className="flex items-center justify-center h-[65px] min-w-[65px] bg-red-500/5 text-red-500 text-center rounded-xl me-3">
                  <FiUsers className="size-8" />
                </div>
                <div className="flex-1">
                  <span className="text-slate-400">Students</span>
                  <p className="text-xl font-bold">
                    <span className="counter-value">2100</span>
                  </p>
                </div>
              </div>

              <div className="absolute flex items-center top-16 md:-end-10 -end-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 m-3">
                <div className="flex items-center justify-center h-[65px] min-w-[65px] bg-red-500/5 text-red-500 text-center rounded-xl me-3">
                  <TbWorld className="size-8" />
                </div>
                <div className="flex-1">
                  <span className="text-slate-400">Hostel Packages</span>
                  <p className="text-xl font-bold">
                    <span className="counter-value">1</span>+
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="lg:ms-8">
              <h3 className="mb-6 text-black md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
                World Best Hostels <br />
                Agency: SmartDorm
              </h3>

              <p className="text-slate-400 font-normal text-lg max-w-xl mb-6">
                Get instant helpful resources about anything on the go, easily
                implement secure money transfer solutions, boost your daily
                efficiency, connect to other app users and create your own
                Travosy network, and much more with just a few taps. commodo
                consequat. Duis aute irure.
              </p>

              <a
                href="#"
                className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
              >
                Read More
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 start-1/3 z-10">
            <img src={mapPlane} className="lg:w-[600px] w-96" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
