import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { FaBuilding } from 'react-icons/fa6';
import logo from '../../assets/Images/logo.png';
import Swal from 'sweetalert2';
import { auth } from '../../utils/firebaseAuth';
import profile from '../pages/Students/studentProfile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useSelector((state) => state.userReducer);
  const [dropdown, setDropDown] = useState(false);
  const toggleDropDown = () => setDropDown(!dropdown);

  const navigate = useNavigate();

  const jwtCookieToken = document.cookie
    .split(';')
    .some((item) => item.includes('jwt'));

  const logoutHandler = () => {
    if (jwtCookieToken) {
      document.cookie = 'jwt=; expires =Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      Swal.fire({
        title: 'Logged out!',
        text: 'You Have been Logged out',
        icon: 'success',
      }).then(() => {
        window.location.href = '/';
      });
    } else {
      //looging out from firebase
      auth.signOut().then(() => {
        Swal.fire({
          title: 'Logged out!',
          text: 'You Have been Logged out',
          icon: 'success',
        }).then(() => {
          window.location.href = '/';
        });
      });
    }
  };

  const HostelOwnerAccount = () => {
    navigate('/signup', { state: { from: 'listYourProperty' } });
  };

  return (
    <div className="absolute top-1 sm:top-13 z-9 w-[100%] ">
      <nav className="w-full flex justify-between px-[2rem] md:px-[4rem]  h-[5rem] text-lg font-bold items-center bg-white drop-shadow-2">
        <Link to={'/'}>
          <img className="h-60 w-55" src={logo} alt="Logo" />
        </Link>
        <ul
          className="bg-white w-[70%] xsm:w-[60%] md:w-[35rem] gap-2 flex xl:flex-row flex-col xl:static absolute top-0 left-0 min-h-dvh xl:w-[42rem] items-start xl:items-center px-8 xl:px-0 xl:py-0 xl:min-h-1 py-8 xl:justify-between text-black duration-300 text-center"
          style={{ left: isOpen ? '0' : '-100%' }}
        >
          <div className="flex w-100 justify-between xl:hidden  items-center">
            <Link to={'/'}>
              <img className="h-30 w-55" src={logo} alt="Logo" />
            </Link>
            <li className="mb-1 flex xl:hidden justify-end text-2xl">
              <IoClose onClick={() => setIsOpen(false)} />
            </li>
          </div>

          <Link
            to={'/'}
            className="xl:border-none xl:pb-0 border-b border-b-[#00000042] pb-2"
          >
            Home
          </Link>

          <Link
            to={'/contact'}
            className="xl:border-none xl:pb-0 border-b border-b-[#00000042] pb-2"
          >
            Contact
          </Link>
          <Link
            to={'/search'}
            className="xl:border-none xl:pb-0 border-b border-b-[#00000042] pb-2"
          >
            Recomended Hostels
          </Link>

          {user ? (
            <>
              <Link
                className="xl:border-none xl:pb-0 border-b border-b-[#00000042] pb-2"
                to="/"
              >
                {user?.Role === 'user' && 'Bookings'}
              </Link>

              <Link
                className="xl:border-none xl:pb-0 border-b border-b-[#00000042] pb-2"
                to="/dashboard"
              >
                {user?.Role === 'admin' && 'Admin Dashboard'}
                {user?.Role === 'owner' && 'Owner Dashboard'}
              </Link>
            </>
          ) : (
            <>
              <Link
                className="xl:border-none xl:pb-0 border-b border-b-[#00000042] pb-2"
                to="/signin"
              >
                Sign In
              </Link>
              <Link className="xl:pb-0 pb-2" to="/signup">
                Sign Up
              </Link>
            </>
          )}
          <li>
            <div className="flex items-center  md:gap-8">
              {user ? (
                <div className="relative">
                  <img
                    className="rounded-full h-8 w-8 md:w-12 md:h-12 cursor-pointer"
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.Name}`}
                    alt=""
                    onClick={toggleDropDown}
                  />
                  {dropdown && (
                    <div className="absolute top-full -right-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                      <ul className="py-2">
                        {user.Role !== 'owner' && user.Role !== 'admin' && (
                          <Link
                            to={'/student-profile'}
                            className="cursor-pointer block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#EF4444] hover:text-white"
                          >
                            Profile
                          </Link>
                        )}

                        <li>
                          <button
                            className="cursor-pointer block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#EF4444] hover:text-white"
                            onClick={logoutHandler}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex">
                  <FaBuilding
                    color="white"
                    className="ml-1 mr-3 absolute top-8"
                  />
                  <button
                    onClick={HostelOwnerAccount}
                    className="py-2 pl-6 pr-3 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
                  >
                    List Your Property
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
        <div className=" items-center gap-4 xl:hidden block md:gap-8">
          <IoIosMenu
            className="text-3xl xl:hidden block"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
