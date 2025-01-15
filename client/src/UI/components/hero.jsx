import React, { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { useSearchListingWithinRangeMutation } from '../../Redux/api/hostelApis';
import { useNavigate } from 'react-router-dom';
import SearchForm from './../pages/Listings/components/SearchForm';

const Hero = () => {
  const navigate = useNavigate();
  const [searchNearByHostels] = useSearchListingWithinRangeMutation();

  const handleSearchSubmit = async (formData) => {
    const { selectedLocationCoords, distance } = formData;

    try {
      const res = await searchNearByHostels({
        Lat: selectedLocationCoords[1][1],
        Lon: selectedLocationCoords[1][0],
        distance,
      });
      if (res.data) {
        return navigate('/search', {
          state: {
            nearHostelsData: res.data.payLoad,
            coordinates: selectedLocationCoords,
            distance,
          },
        });
      }

      return toast.error(res.error.message);
    } catch (e) {}
  };

  return (
    <>
      <section className="relative md:pt-72 md:pb-60 py-36 table w-full items-center bg-[url(../../assets/Images/hero.jpg)] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="container relative w-[92%] mx-auto">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="lg:col-span-8 md:col-span-7 md:order-1 order-2">
              <h5 className="text-3xl font-dancing text-white">
                Beauty of Discover
              </h5>
              <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-4 mt-4">
                SmartDorm: Redefining Hostel Living with Ease, Comfort, and
                Connectivity
              </h4>
              <p className="text-white/70 text-xl max-w-xl">
                Elevating Hostel Living with Seamless Booking and Community
                Integration Where Comfort and Convenience Collide
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
                >
                  View Packages
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-5 md:text-center md:order-2 order-1">
              <a
                href="#!"
                className="lightbox lg:h-24 h-20 lg:w-24 w-20 rounded-full shadow-lg  inline-flex items-center justify-center bg-white hover:bg-red-500 text-red-500 hover:text-white duration-500 ease-in-out mx-auto"
              >
                <FaCirclePlay size={'96px'} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="container relative w-[90%] mx-auto -mt-16 z-1">
        <div className="grid grid-cols-1">
          <SearchForm initialFormData={{}} onSubmit={handleSearchSubmit} />
        </div>
      </div>
    </>
  );
};

export default Hero;
