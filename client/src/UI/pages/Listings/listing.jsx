import React from 'react';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Listing = ({ listingData, rating }) => {
  const hostelRating = rating?.data?.find(
    (r) => r.hostelId === listingData._id,
  );

  return (
    <div className="group rounded-md shadow">
      <div className="relative overflow-hidden rounded-t-md shadow mx-3 mt-3">
        <img
          src={listingData.HostelImages[0]}
          className="scale-125 w-full h-40 group-hover:scale-100 duration-500"
          alt="Hostel"
        />
      </div>

      <div className="p-4">
        <p className="flex items-center text-slate-400 font-medium mb-2">
          <IoLocation className="text-red-500 size-4 me-1" />
          {listingData.HostelAddress}
        </p>
        <Link
          to={`/hostelDetails/${listingData._id}`}
          className="text-lg font-medium hover:text-red-500 duration-500 ease-in-out"
        >
          {listingData.HostelName}
        </Link>

        <div className="flex items-center mt-2">
          <span className="text-slate-400">Rating:</span>
          <ul className="flex gap-1 text-lg font-medium text-amber-400 list-none ms-2">
            {hostelRating ? (
              <>
                {[1, 2, 3, 4, 5].map((star) => (
                  <li key={star} className="inline">
                    <AiFillStar
                      key={star}
                      className={`${
                        star <= hostelRating.roundedRating
                          ? 'text-yellow-500'
                          : 'text-[#afafaf]'
                      }`}
                      size={24}
                    />
                  </li>
                ))}
                <li className="inline ms-1 text-black dark:text-white text-sm">
                  {hostelRating.averageRating} ({hostelRating.totalReviews})
                </li>
              </>
            ) : (
              <li className="inline ms-1 text-black dark:text-white text-sm">
                No ratings
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Listing;
