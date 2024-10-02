import React, { useEffect } from 'react';
import TopBar from '../components/topBar';
import Navbar from '../components/navBar';
import Hero from '../components/hero';
import About from '../components/about';
import HostelCards from './hostelsCards';
import Footer from '../components/footer';
import Faqs from './faqs';
import { IoArrowForwardSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { IoIosPlay } from 'react-icons/io';

const LandinPage = () => {
  return (
    <div className="bg-white">
      <TopBar />
      <Navbar />
      <Hero />
      <About />
      <HostelCards />
      <div className="grid mt-10 grid-cols-1 pb-6 text-center">
        <h3 className="text-black md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
          Frequently Asked Questions
        </h3>

        <p className="text-slate-400 max-w-xl mx-auto">
          This is just a simple text made for this unique and awesome template,
          you can replace it with any text.
        </p>
      </div>

      <div className="py-8 md:py-12 flex lg:flex-row flex-col justify-between items-center lg:items-start gap-5 lg:gap-8 xl:gap-16">
        <div className="flex items-center lg:w-auto w-full md:w-[80%] flex-col">
          <div className="overflow-hidden w-full lg:w-[30rem] xl:w-[40rem] bg-white rounded-md shadow-9 relative p-5 lg:p-8">
            <img
              src="https://histudy-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcourse-elegant-01.bbef5352.jpg&w=640&q=75"
              alt=""
              className="rounded-lg"
            />
          </div>
          <Link
            to={'/'}
            className="bg-gradient-to-l from-custom-gradient-start via-custom-gradient-mid to-custom-gradient-end w-full lg:w-full md:py-5 py-4 text-center my-4 text-whiter rounded-full text-lg flex items-center justify-center gap-2 font-bold hover:bg-right-top"
          >
            Continue Course
            <IoArrowForwardSharp className="text-xl" />
          </Link>
        </div>
        {/* Course Accordion */}
        <div className="w-full lg:w-[40%] pr-3 lg:flex-1 overflow-y-scroll custom-scrollbar h-[20rem] md:h-[35rem]">
          <Faqs />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandinPage;
