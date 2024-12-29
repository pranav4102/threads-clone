import React, { useEffect, useState } from "react";
import PostMenu from "./PostMenu";
import Actions from "./Actions";
import {Link, useParams}from 'react-router-dom';
import Getapp from "../components/Getapp";
import Reply from "../components/Reply";
import axios from 'axios'
import { Spinner } from "@chakra-ui/react";
const Post = ({currUser}) => {
  const [postData, setPostData] = useState(null);
  const {postid}=useParams();
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/post/${postid}`);
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
      finally{
        setLoading(false)
      }
    };
  
    fetchData();

  }, []); 


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


  if (loading) {
    return <div className="flex items-center justify-center w-full"><Spinner/> <h1 className="py-24 px-4 font-semibold text-xl">Loading...</h1></div>
  }

  else {
    return (
    <>
    <div className="flex items-center justify-between mt-24">
      <Link to={`/user/${postData?.author._id}`}>
        <div className="flex items-center">
          <img src={postData?.author.pfp ? postData?.author.pfp : "/nopfp.jpeg"} alt="" className="size-10 rounded-full cursor-pointer object-cover" />
          <div className=" font-bold px-4 cursor-pointer">{postData?.author.name}</div>
          
        </div></Link>
        <div className="flex items-center gap-4">
          <div className="time text-sm text-zinc-500 pl-2">{formatCreatedAt(postData?.createdAt)}</div>
          <PostMenu id={postid}  currUser={currUser}/>
        </div>
    </div>
    <div className="w-full flex-col items-center pt-5">
    <div className="txt pb-3 max-w-80 font-normal">
              {postData?.posttext}
            </div>
      <img src={postData?.postImage} alt="" className=" ] rounded-md lg:max-w-72 md:max-w-64 sm:max-w-52"/>
    </div>
    <Actions id={postid} likes={postData?.likes} currentUser={currUser} />
    <div className="left flex gap-2 items-center px-2 mb-6">
         <div className=" font-normal  text-zinc-500 cursor-pointer">
         {postData?.replies.length} replies
         </div>
         <div className="font-normal  text-zinc-500">.</div>
         <div className="instalink font-normal text-zinc-500 cursor-pointer">
         {postData?.likes.length} likes
         </div>
         
       </div>
       <hr/>
       <Getapp /> 
       <Reply data={postData} currUser={currUser} />
    </>
  );
  }
};

export default Post;
