import React, { useState } from 'react';
import { Input, InputGroup} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast ,useColorMode} from '@chakra-ui/react';
import AllUsers from './AllUsers';
import SearchedUser from './SearchedUser';

const SearchBar = () => {
  const toast = useToast();
  const { colorMode } = useColorMode();

  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const onSubmit = async (data) => {
    try {
      let username = data.query;
      let response = await axios({
        url: `/api/v1/user/${username}`,
        method: 'get'
      });
      setUser(response?.data);
    } catch (error) {
      toast({
        description: error.response?.data.error || 'Error in Finding User',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <h1 className="mt-20 font-bold text-4xl px-4 sm:px-4 md:px-16 lg:px-16 xl:px-20">Search</h1>
      <InputGroup>
        <div className="flex items-center justify-center w-full my-4 px-2 sm:px-2 md:px-16 lg:px-16 xl:px-20">
          <Input
            variant="filled"
            placeholder="Search"
            width={"100%"}
            size={"lg"}
            {...register('query')}
            onKeyPress={handleKeyPress}
          />
        </div>
      </InputGroup>
      {
        user ? <SearchedUser searchedUser={user} loading={loading} /> : <AllUsers />
      }
    </>
  );
};

export default SearchBar;
