import React from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="lg:w-1/4 md:w-1/3 md:px-3">
      <div className="relative">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <div className="profile-pic text-center mb-5">
            <input
              id="pro-img"
              name="profile-image"
              type="file"
              className="hidden"
              onchange="loadFile(event)"
            />
            <div>
              <div className="relative h-28 w-28 mx-auto">
                <img
                  className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                  id="profile-image"
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.Name}`}
                />
                <label
                  className="absolute inset-0 cursor-pointer"
                  for="pro-img"
                ></label>
              </div>

              <div className="mt-4">
                <h5 className="text-lg font-semibold">{user?.Name}</h5>
                <p className="text-[#B0A3B8]">{user?.Email}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#b0b1b2]">
            <ul className="list-none mb-0 pb-0">
              <Link
                to={'/student-profile'}
                className=" text-[#B0A3B8] flex items-center py-2 rounded hover:text-red-500 cursor-pointer"
              >
                <span className="me-2 mb-0">
                  <FaRegUser className="" />
                </span>
                <h6 className="mb-0 font-medium">Profile</h6>
              </Link>
              <Link
                to={'/student-bookings'}
                className=" text-[#B0A3B8] flex items-center py-2 rounded hover:text-red-500 cursor-pointer"
              >
                <span className="me-2 mb-0">
                  <FaRegUser className="" />
                </span>
                <h6 className="mb-0 font-medium">My Bookings</h6>
              </Link>
              <Link
                to={'/student-reviews'}
                className=" text-[#B0A3B8] flex items-center py-2 rounded hover:text-red-500 cursor-pointer"
              >
                <span className="me-2 mb-0">
                  <FaRegUser className="" />
                </span>
                <h6 className="mb-0 font-medium">Reviews</h6>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
