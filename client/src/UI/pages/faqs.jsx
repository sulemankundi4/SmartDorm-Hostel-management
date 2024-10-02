import React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { FiLock } from 'react-icons/fi';
import { FaRegFileAlt } from 'react-icons/fa';

import { Link } from 'react-router-dom';

function Icon({ id, open }) {
  return (
    <div className="w-8 flex items-center justify-center h-8">
      {id === open ? (
        <img src="/minus.png" alt="" className="w-full h-full object-cover" />
      ) : (
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {'{'}' '{'}'}
            <title>plus</title> <desc>Created with Sketch Beta.</desc>
            {'{'}' '{'}'}
            <defs> </defs>
            {'{'}' '{'}'}
            <g
              id="Page-1"
              stroke="none"
              strokeWidth={1}
              fill="none"
              fillRule="evenodd"
              sketch:type="MSPage"
            >
              {'{'}' '{'}'}
              <g
                id="Icon-Set-Filled"
                sketch:type="MSLayerGroup"
                transform="translate(-362.000000, -1037.000000)"
                fill="#000000"
              >
                {'{'}' '{'}'}
                <path
                  d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049"
                  id="plus"
                  sketch:type="MSShapeGroup"
                >
                  {'{'}' '{'}'}
                </path>
                {'{'}' '{'}'}
              </g>
              {'{'}' '{'}'}
            </g>
            {'{'}' '{'}'}
          </g>
        </svg>
      )}
    </div>
  );
}

const Faqs = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex flex-col gap-2">
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} className="" />}
      >
        <AccordionHeader
          className={`${
            open === 1 ? 'text-blue-600 hover:text-blue-600' : 'text-black'
          } text-base xsm:text-xl`}
          onClick={() => handleOpen(1)}
        >
          Intro to Course and Histudy
        </AccordionHeader>
        <AccordionBody>
          <div>
            <Link
              to={'/'}
              className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between w-full my-4 sm:my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Course Intro</h6>
              </div>
              <div>
                <button className="text-pink-400 font-medium bg-pink-50 px-8 py-2 rounded-md mr-3">
                  30 min
                </button>
                <button className="text-[#5557EF] font-medium bg-[#DFE4FD] px-8 py-2 rounded-md">
                  Preview
                </button>
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center w-full my-4 sm:my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Watch Before Start</h6>
              </div>
              <div>
                <button className="text-pink-400 font-medium bg-pink-50 px-8 py-2 rounded-md mr-3">
                  0.5 min
                </button>
                <button className="text-[#5557EF] font-medium bg-[#DFE4FD] px-8 py-2 rounded-md">
                  Preview
                </button>
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Read Before You Start</h6>
              </div>
              <div>
                <button className="text-pink-400 font-medium bg-pink-50 px-8 py-2 rounded-md mr-3">
                  10 min
                </button>
                <button className="text-[#5557EF] font-medium bg-[#DFE4FD] px-8 py-2 rounded-md">
                  Preview
                </button>
              </div>
            </Link>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          className={`${
            open === 2 ? 'text-blue-600 hover:text-blue-600' : 'text-black'
          } text-base xsm:text-xl`}
          onClick={() => handleOpen(2)}
        >
          15 Things To Know About Education?
        </AccordionHeader>
        <AccordionBody>
          <div>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Course Intro</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Why You Should Not Get Education</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          className={`${
            open === 3 ? 'text-blue-600 hover:text-blue-600' : 'text-black'
          } text-base xsm:text-xl`}
          onClick={() => handleOpen(3)}
        >
          Course Fundamentals
        </AccordionHeader>
        <AccordionBody>
          <div>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Course Intro</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Why You Should Not Get Education</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader
          className={`${
            open === 4 ? 'text-blue-600 hover:text-blue-600' : 'text-black'
          } text-base xsm:text-xl`}
          onClick={() => handleOpen(4)}
        >
          You can develop skill and setup
        </AccordionHeader>
        <AccordionBody>
          <div>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Course Intro</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Why You Should Not Get Education</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
        <AccordionHeader
          className={`${
            open === 5 ? 'text-blue-600 hover:text-blue-600' : 'text-black'
          } text-base xsm:text-xl`}
          onClick={() => handleOpen(5)}
        >
          Course Description
        </AccordionHeader>
        <AccordionBody>
          <div>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Course Intro</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Why You Should Not Get Education</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
        <AccordionHeader
          className={`${
            open === 6 ? 'text-blue-600 hover:text-blue-600' : 'text-black'
          } text-base xsm:text-xl`}
          onClick={() => handleOpen(6)}
        >
          Route 53
        </AccordionHeader>
        <AccordionBody>
          <div>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Course Intro</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <IoPlayCircleOutline />
                <h6>Why You Should Not Get Education</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
            <Link
              to={'/'}
              className="flex items-center justify-between w-full my-2"
            >
              <div className="flex items-center gap-2 text-lg text-black font-normal hover:text-blue-600 duration-300">
                <FaRegFileAlt />
                <h6>Read Before You Start</h6>
              </div>
              <div className="w-8 flex items-center justify-center h-8">
                <FiLock className="text-2xl" />
              </div>
            </Link>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default Faqs;
