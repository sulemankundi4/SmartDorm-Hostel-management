import React from 'react';
import { useGetAllVerifiedListingsQuery } from '../../Redux/api/hostelApis';
import HostelCard from '../components/hostelCard';
import Loader from '../../Admin/common/Loader';
import { useAverageRatingsQuery } from '../../Redux/api/reviewsApis';

const HostelCards = () => {
  const { data, isLoading } = useGetAllVerifiedListingsQuery();
  const { data: ratingsData, isLoading: loadingRatings } =
    useAverageRatingsQuery();

  console.log('ratingsData:', ratingsData);

  return (
    <>
      {isLoading || loadingRatings ? (
        <Loader />
      ) : (
        <div className="container relative md:mt-24 mt-16 w-[93%] mx-auto">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 text-black md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Hostel Packages
            </h3>

            <p className="text-slate-400 max-w-xl mx-auto">
              Planning for a Hostel? We will organize your hostel with the best
              places and within best budget!
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
            {data?.payLoad?.map((item) => {
              const hostelRating = ratingsData?.data?.find(
                (rating) => rating.hostelId === item._id,
              );
              return (
                <HostelCard key={item._id} item={item} rating={hostelRating} />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default HostelCards;
