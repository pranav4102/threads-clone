import React, { useEffect, useState } from "react";
import ReplyMenu from "./ReplyMenu";
import { Link } from "react-router-dom";
const Reply = ({ data, currUser }) => {
  const [replyData, setReplyData] = useState();
  useEffect(() => {
    if (data) {
      setReplyData(data?.replies);
      if(replyData){
      }
      
    }
  }, [data]);

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


  return (
    replyData?.map((replydata) => {
      return (
        <div key={replydata?._id}>
          <hr />
          <div className="flex items-center justify-between pt-6 px-2">
            <Link to={`/user/${replydata?.replyinguser?._id}`}>
            <div className="flex items-center">
              <img
                src={replydata?.replyinguser?.pfp ? replydata?.replyinguser?.pfp : '/nopfp.jpeg'}
                alt=""
                className="size-10 rounded-full cursor-pointer object-cover"
              />
              <div className="font-bold px-4 cursor-pointer">{replydata?.replyinguser?.name}</div>
            </div> </Link>
            <div className="flex items-center gap-4">
              <div className="time text-sm text-zinc-500 pl-2">{formatCreatedAt(replydata?.createdAt)}</div>
              <ReplyMenu replyinguserid={replydata?.replyinguser?._id} postid={data?._id} replyid={replydata._id} currUser={currUser}/>
            </div>
          </div>
          <div className="px-16 pb-4">
            <div className="w-full font-normal ">{replydata?.text}</div>
          </div>
          <hr />
        </div>
      );
    })
    
  );
};

export default Reply;