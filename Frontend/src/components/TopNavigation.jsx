import React from "react";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RiMessage3Line } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import {Link} from 'react-router-dom'
const TopNavigation = () => {
  return (
    <>
      <div className="fixed top-0  w-full flex items-center justify-center">
        <div className="bg-[#101010] w-4/6  flex items-center justify-center py-2">
          <div className="flex justify-center items-center ">
           <Link to={'/'}> <div className="hover:bg-neutral-900 px-10 py-4 rounded-lg cursor-pointer">
              <GoHome color="gray"  size={28} />
            </div></Link>
            <div className="hover:bg-neutral-900 px-10 py-4 rounded-lg cursor-pointer">
              <FiSearch color="gray"  size={26} />
            </div>
           
            <div className="hover:bg-neutral-900 px-10 py-4 rounded-lg cursor-pointer">
              <RiMessage3Line color="gray"  size={28} />
            </div>
            <div className="hover:bg-neutral-900 px-10 py-4 rounded-lg cursor-pointer">
              <GoPerson color="gray"  size={28} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavigation;
