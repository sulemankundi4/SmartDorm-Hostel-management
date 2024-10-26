import React from 'react';
import hostel2 from '../../assets/listing/2.jpg';
import hostel3 from '../../assets/listing/3.jpg';
import hostel4 from '../../assets/listing/5.jpg';
import hostel6 from '../../assets/listing/6.jpg';

import { FaHeart, FaStar } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { BsArrowRight } from 'react-icons/bs';
import { useGetAllVerifiedListingsQuery } from '../../Redux/api/hostelApis';
import HostelCard from '../components/hostelCard';
import Loader from '../../Admin/common/Loader';
const HostelCards = () => {
  const { data, isLoading } = useGetAllVerifiedListingsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container relative md:mt-24 mt-16 w-[93%] mx-auto">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 text-black md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Hostel Packages
            </h3>

            <p className="text-slate-400 max-w-xl mx-auto">
              Planning for a trip? We will organize your trip with the best
              places and within best budget!
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
            {data?.payLoad?.map((item) => (
              <HostelCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HostelCards;
