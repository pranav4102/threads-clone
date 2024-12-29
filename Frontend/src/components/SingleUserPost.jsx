import { React, useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import { NavLink} from "react-router-dom";
import axios from "axios";
import PostMenu from "./PostMenu";
import Actions from "./Actions";
import { MdOutlineBrokenImage } from "react-icons/md";

const SingleUserPost = ({user, currUser}) => {

    const [userPost, setUserPost]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          if (user && user.username) {
            try {
              const response = await axios.get(`/api/v1/post/user/${user.username}`);
              setUserPost(response.data);
            } catch (error) {
              console.error("Error fetching user posts:", error);
            }
          }
        };
      
        fetchData();
      }, [currUser]);

  // Function to convert timestamp to human-readable format
  const formatCreatedAt = (timestamp) => {
    const createdAtDate = new Date(timestamp);
    const now = new Date();
    const secondsAgo = Math.floor((now - createdAtDate) / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo}s${secondsAgo !== 1 ? '' : ''}`;
    }
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo}m${minutesAgo !== 1 ? '' : ''}`;
    }
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo}h${hoursAgo !== 1 ? '' : ''}`;
    }
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo}d${daysAgo !== 1 ? '' : ''}`;
  };

  if (userPost.length==0){
    return <div className="flex items-center justify-center w-full gap-4 my-24"><MdOutlineBrokenImage size={40}/><h1 className="font-bold text-3xl">No Posts Yet</h1></div>
  }
  else{
      return userPost?.map((post) => (
    <VStack align="stretch" spacing={1} key={post._id} className="mt-8">
      <div className="flex items-center justify-between px-2 py-4">
<NavLink to={`/user/${user?._id}`}>
        <div className="flex items-center">
          <img
            src={user?.pfp ? user?.pfp : "/nopfp.jpeg"}
            alt=""
            className="size-10 rounded-full object-cover"
          />
          <div className="pl-4">
            <div className="flex items-center">
              <div className=" font-bold">{user?.username}</div>
              <div className="time text-sm text-zinc-500 pl-2">{formatCreatedAt(post?.createdAt)}</div>
            </div>
          </div>
        </div>
</NavLink>

        {currUser  && <PostMenu id={post._id} currUser={currUser} />}
      </div>
      <div className="flex">
        <div className="border ml-7 rounded-lg"></div>
        <div className="px-12">
        <NavLink to={`/${user?.username}/post/${post._id}`} className="cursor-pointer">
            <div className="txt pb-3 max-w-80 text-sm">{post.posttext}</div>
            {post.postImage && (
              <img
                src={post.postImage}
                alt="post"
                className="rounded-md lg:max-w-72 md:max-w-64 sm:max-w-52  "
              />
            )}
   
   </NavLink>
          <Actions id={post._id}  likes={post?.likes} currentUser={currUser}/>
        </div>
      </div>
      <div className="flex items-center ">
        <div className="avts">
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size="xs"
          />
          <Avatar
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
            size="xs"
          />
        </div>
        <div className="left flex gap-2 items-center px-10">
          <div className=" font-normal  text-zinc-500 cursor-pointer">
            {post.replies.length} replies
          </div>
          <div className="font-normal  text-zinc-500">.</div>
          <div className="instalink font-normal text-zinc-500 cursor-pointer">
            {post.likes.length} likes
          </div>
        </div>
      </div>
      <div className=" border my-4 mx-9"></div> 
    

    </VStack>
   
  ));
  }


};

export default SingleUserPost;
