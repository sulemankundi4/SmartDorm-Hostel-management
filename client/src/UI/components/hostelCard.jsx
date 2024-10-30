import React from 'react';
import hostel1 from '../../assets/listing/1.jpg';
import { FaHeart, FaStar } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const HostelCard = ({ item, rating }) => {
  return (
    <div className="group rounded-md shadow dark:shadow-gray-700">
      <div className="relative overflow-hidden rounded-t-md shadow dark:shadow-gray-700 mx-3 mt-3">
        <img
          src={item?.HostelImages[1] || hostel1}
          className="scale-125 group-hover:scale-100 duration-500"
          alt=""
        />
      </div>

      <div className="p-4">
        <p className="flex items-center text-slate-400 font-medium mb-2">
          <IoLocationOutline className="text-red-500 size-4 me-1" />
          {item?.HostelCity}
        </p>
        <Link
          to={`/hostelDetails/${item._id}`}
          className="text-lg text-black font-medium hover:text-red-500 duration-500 ease-in-out"
        >
          {item?.HostelName}
        </Link>

        <div className="flex items-center mt-4">
          <span className="text-slate-400">Rating:</span>
          <ul className="text-lg flex font-medium text-amber-400 list-none ms-2">
            {rating ? (
              <>
                {[1, 2, 3, 4, 5].map((star) => (
                  <li key={star} className="inline">
                    <AiFillStar
                      key={star}
                      className={`${
                        star <= rating.roundedRating
                          ? 'text-yellow-500'
                          : 'text-[#afafaf]'
                      }`}
                      size={24}
                    />
                  </li>
                ))}
                <li className="inline ms-1 text-black dark:text-white text-sm">
                  {rating.averageRating} ({rating.totalReviews})
                </li>
              </>
            ) : (
              <li className="inline ms-1 text-black dark:text-white text-sm">
                No ratings
              </li>
            )}
          </ul>
        </div>

        <div className="mt-4 pt-4 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
          <h5 className="text-lg font-medium text-red-500">
            {item?.HostelRent} {item.Currency} / Month
          </h5>

          <Link
            to={`/hostelDetails/${item._id}`}
            className="flex items-center text-slate-400 hover:text-red-500"
          >
            Explore Now <BsArrowRight className="align-middle ms-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
