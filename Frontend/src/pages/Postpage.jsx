import React,{useState, useEffect} from "react";
import Post from "../components/post";
import Header from "../components/Header";


const Postpage = () => {
  const [currUser, setCurrUser] = useState();

  useEffect(() => {
    const userDataString = localStorage.getItem("currUser");
    try {
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setCurrUser({
          id: user?._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },[]);
  return (
    <>
    <Header/>
      <Post currUser={currUser} />
    </>
  );
};

export default Postpage;
