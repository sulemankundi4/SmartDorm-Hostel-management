import React from 'react';
import Navbar from '../../components/navBar';
import TopBar from '../../components/topBar';
import { FaRegUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SideBar from './components/sideBar';

const StudentProfile = () => {
  const { user, loading } = useSelector((state) => state.userReducer);

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="relative w-[94%] mx-auto lg:pb-24 pb-16 md:mt-[84px] mt-[70px] bg-white">
        <div className="container relative md:mt-24 mt-16">
          <div className="md:flex">
            <SideBar />
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
