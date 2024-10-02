import React from 'react';
import { FaInstagram, FaRegClock, FaTwitter } from 'react-icons/fa6';
import { FiFacebook } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMailOutline } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';

const TopBar = () => {
  return (
    <div class="bg-slate-900 p-3 hidden xsm:block">
      <div class="relative w-[94%] mx-auto">
        <div class="grid grid-cols-1">
          <div class="flex items-center justify-between">
            <ul class="list-none">
              <li class="inline-flex items-center">
                <FaRegClock color="rgb(239 68 68)" />
                <span class="ms-2 text-slate-300">Mon-Sat: 9am to 6pm</span>
              </li>
              <li class="inline-flex items-center ms-2">
                <IoLocationOutline color="rgb(239 68 68)" />

                <span class="ms-2 text-slate-300">Houston, USA 485</span>
              </li>
            </ul>

            <ul class="list-none">
              <li class="inline-flex items-center">
                <MdMailOutline color="rgb(239 68 68)" />
                <a
                  href="mailto:contact@example.com"
                  class="ms-2 text-slate-300 hover:text-slate-200"
                >
                  contact@example.com
                </a>
              </li>
              <li class="inline-flex items-center ms-2">
                <ul class="list-none">
                  <li class="inline-flex mb-0">
                    <FiFacebook color="white" />
                  </li>
                  <li class="inline-flex ms-2 mb-0">
                    <FaInstagram color="white" />
                  </li>
                  <li class="inline-flex ms-2 mb-0">
                    <FiTwitter color="white" />
                  </li>
                  <li class="inline-flex ms-2 mb-0">
                    <BsTelephone color="white" />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
