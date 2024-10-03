import React from 'react';
import Navbar from '../../components/navBar';
import TopBar from '../../components/topBar';
import { FaRegUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { user, loading } = useSelector((state) => state.userReducer);

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="relative w-[94%] mx-auto lg:pb-24 pb-16 md:mt-[84px] mt-[70px] bg-white">
        <div className="container relative md:mt-24 mt-16">
          <div className="md:flex">
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
                      <li className=" text-[#B0A3B8] flex items-center py-2 rounded hover:text-red-500 cursor-pointer">
                        <span className="me-2 mb-0">
                          <FaRegUser className="" />
                        </span>
                        <h6 className="mb-0 font-medium">Profile</h6>
                      </li>
                      <li className=" text-[#B0A3B8] flex items-center py-2 rounded hover:text-red-500 cursor-pointer">
                        <span className="me-2 mb-0">
                          <FaRegUser className="" />
                        </span>
                        <h6 className="mb-0 font-medium">Univeristy</h6>
                      </li>
                      <li className=" text-[#B0A3B8] flex items-center py-2 rounded hover:text-red-500 cursor-pointer">
                        <span className="me-2 mb-0">
                          <FaRegUser className="" />
                        </span>
                        <h6 className="mb-0 font-medium">Hello</h6>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mt-6">
                  <h5 className="text-lg font-semibold mb-4">Introduction</h5>
                  <p className="text-gray-700">
                    {user.introduction || 'No introduction provided.'}
                  </p>
                </div>
                <div className="mt-6">
                  <h5 className="text-lg font-semibold mb-4">Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-md font-extrabold text-gray-600">
                        User Name
                      </h6>
                      <p className="text-gray-700">{user.Name || 'N/A'}</p>
                    </div>
                    <div>
                      <h6 className="text-md font-extrabold text-gray-600">
                        User Email
                      </h6>
                      <p className="text-gray-700">{user.Email || 'N/A'}</p>
                    </div>
                    <div>
                      <h6 className="text-md font-extrabold text-gray-600">
                        Date of Birth
                      </h6>
                      <p className="text-gray-700">{user.dob || 'N/A'}</p>
                    </div>
                    <div>
                      <h6 className="text-md font-extrabold text-gray-600">
                        University
                      </h6>
                      <p className="text-gray-700">
                        {user.University || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <h6 className="text-md font-extrabold text-gray-600">
                        Account Status
                      </h6>
                      <p className="text-gray-700">{'True'}</p>
                    </div>
                    <div>
                      <h6 className="text-md font-extrabold text-gray-600">
                        Email Verified
                      </h6>
                      <p className="text-gray-700">
                        {user.IsEmailVerified ? 'Verified' : 'Not Verified'}
                      </p>
                    </div>
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

export default StudentProfile;
