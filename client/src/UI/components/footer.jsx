import React from 'react';
import {
  BsChevronCompactRight,
  BsFillArrowThroughHeartFill,
  BsTelephone,
} from 'react-icons/bs';
import { IoLocationOutline, IoMail } from 'react-icons/io5';
import { MdMailOutline } from 'react-icons/md';
import logo from '../../assets/Images/logo.png';

const Footer = () => {
  return (
    <>
      <footer className=" bg-[#161C28] relative text-white  ">
        <div className="container relative w-[93%] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="py-[60px] px-0">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                  <div className="lg:col-span-3 md:col-span-12">
                    <p className="mt-6 text-gray-300">
                      SmartDorm is dedicated to providing a comfortable and
                      secure living environment for students. Our hostels are
                      equipped with modern amenities to ensure a pleasant stay.
                      We strive to create a community where students can focus
                      on their studies and personal growth.
                    </p>
                  </div>

                  <div className="lg:col-span-3 md:col-span-4">
                    <div className="lg:ms-8">
                      <h5 className="tracking-[1px] text-gray-100 font-semibold">
                        Office
                      </h5>

                      <div className="flex mt-4">
                        <IoLocationOutline className="size-5 text-red-500 me-2 mt-1" />
                        <div className="">
                          <h6 className="text-gray-300">
                            C/54 Northwest Freeway, <br />
                            Suite 558, <br />
                            Houston, USA 485
                          </h6>
                        </div>
                      </div>

                      <div className="flex mt-4">
                        <MdMailOutline className="size-4 text-red-500 me-2 mt-1" />
                        <div className="">
                          <a
                            href="mailto:contact@example.com"
                            className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                          >
                            contact@example.com
                          </a>
                        </div>
                      </div>

                      <div className="flex mt-4">
                        <BsTelephone className="size-4 text-red-500 me-2 mt-1" />
                        <div className="">
                          <a
                            href="tel:+152534-468-854"
                            className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                          >
                            +152 534-468-854
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 md:col-span-4">
                    <div className="lg:ms-8">
                      <h5 className="tracking-[1px] text-gray-100 font-semibold">
                        Company
                      </h5>
                      <ul className="list-none  mt-6">
                        <li>
                          <a className="text-gray-3 flex items-center hover:text-gray-400 duration-500 ease-in-out">
                            <BsChevronCompactRight className="mr-1" />
                            About us
                          </a>
                        </li>
                        <li className="mt-[10px]">
                          <a className=" flex hover:text-gray-400 duration-500 ease-in-out">
                            <BsChevronCompactRight className="mr-1" /> Services
                          </a>
                        </li>
                        <li className="mt-[10px]">
                          <a className=" flex hover:text-gray-400 duration-500 ease-in-out">
                            <BsChevronCompactRight className="mr-1" /> Services
                          </a>
                        </li>
                        <li className="mt-[10px]">
                          <a className=" flex hover:text-gray-400 duration-500 ease-in-out">
                            <BsChevronCompactRight className="mr-1" /> Services
                          </a>
                        </li>
                        <li className="mt-[10px]">
                          <a className=" flex hover:text-gray-400 duration-500 ease-in-out">
                            <BsChevronCompactRight className="mr-1" /> Services
                          </a>
                        </li>
                        <li className="mt-[10px]">
                          <a className=" flex hover:text-gray-400 duration-500 ease-in-out">
                            <BsChevronCompactRight className="mr-1" /> Services
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-3 md:col-span-4">
                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                      Newsletter
                    </h5>
                    <p className="mt-6">
                      Sign up and receive the latest tips via email.
                    </p>
                    <form>
                      <div className="grid grid-cols-1">
                        <div className="my-3">
                          <label className="form-label">
                            Write your email{' '}
                            <span className="text-red-600">*</span>
                          </label>
                          <div className="form-icon relative mt-2">
                            <IoMail className="size-4 absolute top-3 start-4" />
                            <input
                              type="email"
                              className="ps-12 rounded w-full py-2 px-3 h-10 bg-[rgb(31,41,55)] border-0 text-gray-100 focus:shadow-none focus:ring-0 placeholder:text-[rgb(243,244,246)] outline-none"
                              placeholder="Email"
                              name="email"
                              required=""
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          name="send"
                          className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-[30px] px-0 border-t border-slate-800">
          <div className="container relative text-center">
            <div className="grid grid-cols-1">
              <div className="text-center">
                <p className="mb-0 flex items-center justify-center">
                  © 2024 SmartDorm. Design with
                  <BsFillArrowThroughHeartFill className="size-5 text-red-600 ms-2" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
