import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useColorMode } from "@chakra-ui/react";
const AllUsers = () => {
  const { colorMode } = useColorMode();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response = await axios({
          url: '/api/v1/users',
          method: 'get'
        })
        setAllUsers(response.data)
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    };
    fetchUserData();
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center w-full"><Spinner /><h1 className="py-24 font-semibold text-xl px-4">Loading...</h1></div>
  }
  else {

    return (

      allUsers?.map((user) => (

        <div key={user?._id}>
          <Link to={`/user/${user?._id}`} >
            <div className="px-2 sm:px-2 md:px-16 lg:px-16 xl:px-20 cursor-pointer " >
              <div className={`flex items-center justify-between py-4 ${colorMode == 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'} px-6`}>
                <div className="userinfo">
                  <div className="username font-bold text-lg pb-2">{user?.username}</div>
                  <div className="info flex">
                    <div className="text-neutral-500 font-semibold">{user?.name}</div>
                  </div>
                </div>
                <img src={user?.pfp ? user?.pfp : '/nopfp.jpeg'} alt="" className="rounded-[1000px] size-12 object-cover" />
              </div>
              <hr />
            </div>
          </Link>
        </div>

      ))

    )
  }
}


export default AllUsers