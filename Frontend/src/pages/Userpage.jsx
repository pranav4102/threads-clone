import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Userheader from '../components/Userheader';
import { Spinner } from '@chakra-ui/react';

const Userpage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/v1/user/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const userDataString = localStorage.getItem('currUser');
    try {
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setCurrUser({ id: user?._id });
      }
    } catch (error) {
      console.error('Error parsing current user data:', error);
    }
  }, []);

  return (
    <>
      <Header />
      {!loading ? (
        <>
          <Userheader user={user} currUser={currUser}  />
         
        </>
      ) : <div className="flex items-center justify-center w-full"> <Spinner/> <h1 className="py-24 font-semibold text-xl px-4">Loading...</h1></div>
    }
    </>
  );
};

export default Userpage;
