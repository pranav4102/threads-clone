import React, { useState, useEffect } from 'react';
import CreateThread from './components/CreateThread';
import Userpost from './components/Userpost';
import Header from './components/Header';
const Home = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('currUser');
    try {
      if (userDataString) {
        const currUser = JSON.parse(userDataString);
        setUser({
          id: currUser?._id,
          pfp: currUser?.pfp
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
     <Header/>
      {user && <CreateThread pfp={user?.pfp} id={user?.id}/>}
      <Userpost  currUser={user}/>
    </>
  );
}

export default Home;
