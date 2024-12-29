import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useColorMode } from "@chakra-ui/react";

const SearchedUser = ({ searchedUser, loading }) => {
  const { colorMode } = useColorMode();
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center w-full"><Spinner/><h1 className="py-24 font-semibold text-xl px-4">Loading...</h1></div>
      ) : (
        <div>
          <Link to={`/user/${searchedUser?._id}`}>
            <div className=" px-2 sm:px-2 md:px-16 lg:px-16 xl:px-20 cursor-pointer">
              <div className={`flex items-center justify-between py-4 px-6 ${colorMode=='dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'}`}>
                <div className="userinfo">
                  <div className="username font-bold text-lg pb-2">{searchedUser?.username}</div>
                  <div className="info flex">
                    <div className="text-neutral-500 font-semibold">{searchedUser?.name}</div>
                  </div>
                </div>
                <img src={searchedUser?.pfp ? searchedUser?.pfp : '/nopfp.jpeg'} alt="" className="rounded-[1000px] size-12 object-cover" />
              </div>
              <hr />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchedUser;
