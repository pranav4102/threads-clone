import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';
const FollowMessageButton = ({ id, currUser, followers }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
const toast=useToast();
const {colorMode}=useColorMode()
  useEffect(() => {
    setFollowerCount(followers?.length);
    setIsFollowing(followers?.includes(currUser?.id));
  }, [followers, currUser]);


  const handleFollowUnfollow = async () => {
    try {
      let response = await axios({
        url: `/api/v1/follow/${id}`,
        method: "post",
      });

      setFollowerCount(response.data.newfollowerCount);
      setIsFollowing((prevIsfollowed) => !prevIsfollowed); 
      toast({
        description: response.data.message,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: 'some error occured',
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      console.log(error)
    }
  };

  return (
    <>
      <div className="w-full  flex justify-around items-center mt-4 gap-4">
        <button
          className={`${colorMode == 'dark' ? (isFollowing ?'bg-neutral-700 text-white hover:bg-neutral-600' :'bg-white text-black hover:bg-neutral-300') : (isFollowing ? 'bg-neutral-700 text-white hover:bg-neutral-600' :'bg-neutral-900 text-white hover:bg-zinc-800')} w-full py-2 rounded-lg font-semibold text-lg }`}
          onClick={handleFollowUnfollow}
        >
          {isFollowing ? "following" : "follow"}
        </button>
    
      </div>
    </>
  );
};

export default FollowMessageButton;
