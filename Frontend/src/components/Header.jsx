import React, { useState, useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { GoPerson } from "react-icons/go";
import {useNavigate} from 'react-router-dom'
import { SiThreads } from "react-icons/si";


const Header = () => {
  const toast=useToast();
  const navigate=useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userDataString = localStorage.getItem("currUser");
    try {
      if (userDataString) {
        const currUser = JSON.parse(userDataString);
        setUser({
          id: currUser?._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);


  const logout = async () => {
    try {
      const response = await axios({
        url: "/api/v1/logout",
        method: 'post',
      });
      localStorage.removeItem('currUser');
      toast({
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      navigate('/authorize');
    } catch (error) {
      toast({
        description: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className={` ${colorMode == "dark" ? 'bg-[#101010]' : 'bg-white'} fixed top-0 right-0  w-full flex items-center justify-center z-20`}>
        <div className={` ${colorMode == "dark" ? 'bg-[#101010]' : 'bg-white'}   flex items-center justify-center py-2 `}>
          <div className="flex justify-center items-center ">

            <Link to={"/"}>   
              <div className={`${colorMode == "dark" ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100' } px-4 sm:px-8 md:px-10 lg:px-10 xl:px-16 m py-4 rounded-lg cursor-pointer`}>
                <GoHome color="gray" size={28} />
              </div>
            </Link>

            <Link to={"/search"}>
              <div className={`${colorMode == "dark" ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100' } px-4 sm:px-8 md:px-10 lg:px-10 xl:px-16 py-4 rounded-lg cursor-pointer`}>
                <FiSearch color="gray" size={26} />
              </div>
            </Link>

            <div className="px-4 sm:px-8 md:px-10 lg:px-10 xl:px-16 cursor-pointer" onClick={toggleColorMode}>
              <SiThreads size={32}/>
            </div>
            
            <Link to={`/user/${user?.id}`}>
              <div className={`${colorMode == "dark" ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100' } px-4 sm:px-8 md:px-10 lg:px-10 xl:px-16 py-4 rounded-lg cursor-pointer`}>
                <GoPerson color="gray" size={28} />
              </div>
            </Link>
           
              <div className={`${colorMode == "dark" ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100' } px-4 sm:px-8 md:px-10 lg:px-10 xl:px-16 py-4 rounded-lg cursor-pointer`} onClick={logout}>
                <RiLogoutCircleRLine color="gray" size={28} />
              </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
