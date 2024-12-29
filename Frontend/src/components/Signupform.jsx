import { React, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signupform = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const Schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("UserName is required"),
    email: yup.string().email().required(),
    password: yup.string().min(6).required("Min length is 6"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const navigate = useNavigate();
  const toast=useToast()
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      let response = await axios({
        url: "/api/v1/signup",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
      localStorage.setItem('currUser', JSON.stringify(response.data))
      toast({
        description:'Account created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate("/");
    } catch (error) {
      toast({
        description:error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <HStack>
        <Box>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" {...register("name")} />
            <p>{errors.name?.message}</p>
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>UserName</FormLabel>
            <Input type="text" {...register("username")} />
            <p>{errors.username?.message}</p>
          </FormControl>
        </Box>
      </HStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <p>{errors.password?.message}</p>
      </FormControl>
      <Stack spacing={10} pt={2}>

{
  isLoading ?    <Button
      isLoading
      loadingText="Signing Up"
      spinnerPlacement="start"
      size="lg"
    >
     SignUp
    </Button> :    <Button
          type="submit"
          loadingText="Submitting"
          size="lg"
          bg={useColorModeValue("#101010", "white")}
          color={useColorModeValue("white", "black")}
          _hover={{
            bg: useColorModeValue("#3b3b3b", "	#e0dede"),
          }}
          onClick={handleSubmit(onSubmit)}
        >
          Sign up
        </Button>
}
   

     
      </Stack>
    </>
  );
};

export default Signupform;
