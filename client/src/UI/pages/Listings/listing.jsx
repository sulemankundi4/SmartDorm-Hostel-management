import React from 'react';
import { BsArrowRight, BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Listing = ({ listingData }) => {
  return (
    <div className="group rounded-md shadow dark:shadow-gray-700">
      <div className="relative overflow-hidden rounded-t-md shadow dark:shadow-gray-700 mx-3 mt-3">
        <img
          src={listingData.HostelImages[0]}
          className="scale-125 w-full h-40  group-hover:scale-100 duration-500"
        />
        <div className="absolute top-0 start-0 p-4">
          <span className="bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
            20% Off
          </span>
        </div>

        <div className="absolute top-0 end-0 p-4">
          <a className="size-8 inline-flex justify-center items-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-500 dark:focus:text-red-500 hover:text-red-500 dark:hover:text-red-500">
            <BsHeartFill className="text-red-500 text-[20px] align-middle" />
          </a>
        </div>
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
          <ul className=" flex gap-1 text-lg font-medium text-amber-400 list-none ms-2">
            <li>
              <BsStarFill className="align-middle" />
            </li>
            <li className="inline">
              <BsStarFill className="align-middle" />
            </li>
            <li className="inline">
              <BsStarFill className="align-middle" />
            </li>
            <li className="inline">
              <BsStarFill className="align-middle" />
            </li>
            <li className="inline">
              <BsStarFill className="align-middle" />
            </li>
            <li className="inline text-black dark:text-white text-sm">
              5.0(30)
            </li>
          </ul>
        </div>

        <div className="mt-4 pt-4 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
          <h5 className="text-lg font-medium text-red-500">
            {listingData.HostelRent} pkr / Month
          </h5>

          <Link
            to={`/hostelDetails/${listingData._id}`}
            className="flex items-center text-slate-400 hover:text-red-500"
          >
            Explore Now <BsArrowRight className="ml-1 mt-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Listing;
