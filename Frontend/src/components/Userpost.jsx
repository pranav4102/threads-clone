import { React, useEffect, useReducer, useState } from "react";
import { Avatar, Spinner,  Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
import Actions from "./Actions";
import { VStack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import axios from "axios";
import PostMenu from "./PostMenu";
const Userpost = ({ currUser }) => {
  const [timeline, setTimeline] = useState([]);
const [loading, setLoading]=useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios({
          url: "/api/v1/timeline",
          method: "get",
        });
        setTimeline(response.data);
      
      } catch (error) {
        console.error("Error fetching timeline data:", error);
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
      return `${secondsAgo}s${secondsAgo !== 1 ? "" : ""}`;
    }
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo}m${minutesAgo !== 1 ? "" : ""}`;
    }
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo}h${hoursAgo !== 1 ? "" : ""}`;
    }
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo}d${daysAgo !== 1 ? "" : ""}`;
  };
if (loading) {
  return <div className="my-8">
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
  <Skeleton height={ '280'} width={'100%'} mt={'8'} borderRadius={'10'}/>

  <SkeletonCircle size='10' mt={'8'} />
  <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
  <Skeleton height={ '280'} width={'100%'} mt={'8'} borderRadius={'10'}/>
  
</div>
}
else{
  
  return timeline?.map((post) => (
    <VStack align="stretch" spacing={1} key={post?._id}>
      <div className="flex items-center justify-between px-2 py-4">
        <Link to={`/user/${post?.author?._id}`}>
          <div className="flex items-center">
            <img
              src={post?.author?.pfp ? post?.author?.pfp : "/nopfp.jpeg"}
              alt=""
              className="size-10 rounded-full object-cover"
            />
            <div className="pl-4">
              <div className="flex items-center">
                <div className="font-bold">{post?.author?.name}</div>
                <div className="time text-sm text-zinc-500 pl-2">
                  {formatCreatedAt(post?.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </Link>

        {currUser && <PostMenu id={post?._id} currUser={currUser} />}
      </div>
      <div className="flex">
        <div className="border  ml-7 rounded-lg"></div>
        <div className="px-12">
          <Link
            to={`${post?.author?.username}/post/${post?._id}`}
            className="cursor-pointer"
          >
            <div className="txt pb-3 max-w-80 text-sm">{post?.posttext}</div>
            {post?.postImage && (
              <img
                src={post?.postImage}
                alt="post"
                className="rounded-md lg:max-w-72 md:max-w-64 sm:max-w-52  "
              />
            )}
          </Link>
          <Actions id={post?._id} likes={post?.likes} currentUser={currUser} />
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
          <div className="font-normal  text-zinc-500 cursor-pointer">
            {post?.replies?.length} replies
          </div>
          <div className="font-normal  text-zinc-500">.</div>
          <div className="instalink font-normal text-zinc-500 cursor-pointer">
            {post?.likes?.length} likes
          </div>
        </div>
      </div>
      <div className="border my-4 mx-9"></div>
    </VStack>
  ));
}

};

export default Userpost;



