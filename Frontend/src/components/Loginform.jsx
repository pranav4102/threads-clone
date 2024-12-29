import {React, useState }from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {FormControl, FormLabel,Input,InputGroup,InputRightElement, Stack,Button, useColorModeValue, useToast} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Loginform = () => {
  const toast=useToast();
  const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading]= useState(false)
    const Schema=yup.object().shape({
      username:yup.string().required(),
      password:yup.string().required()
    })
    const {register, handleSubmit, formState:{errors}}=useForm({
      resolver:yupResolver(Schema)
    });
const onsubmit= async(data)=>{
try {
  setIsLoading(true)
  let response=await axios({
    url:'/api/v1/login',
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    data:data
  })
  localStorage.setItem('currUser', JSON.stringify(response.data))
  toast({
    description:`Welcome back ${response.data.name}`,
    status:'success',
    duration:3000,
    isClosable:true
  }),
  navigate('/')
} catch (error) {
  toast({
    description:error.response.data.error,
    status:'error',
    duration:3000,
    isClosable:true
  })
}
finally{
  setIsLoading(false)
}
}

  return (
    <>
<FormControl isRequired>
    
       <FormLabel>UserName</FormLabel>
       <Input type="text" {...register("username")} />
       <p>{errors.username?.message}</p>
     </FormControl>
 <FormControl id="password" isRequired>
   <FormLabel>Password</FormLabel>
   <InputGroup>
     <Input type={showPassword ? 'text' : 'password'}  {...register("password")} width={'25rem'}/>
     <InputRightElement h={'full'}>
       <Button
         variant={'ghost'}
         onClick={() => setShowPassword((showPassword) => !showPassword)}>
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
      loadingText="Loging In"
      spinnerPlacement="start"
      size="lg"
    >
    Login
    </Button> :    <Button
          type="submit"
          loadingText="Submitting"
          size="lg"
          bg={useColorModeValue("#101010", "white")}
          color={useColorModeValue("white", "black")}
          _hover={{
            bg: useColorModeValue("#3b3b3b", "	#e0dede"),
          }}
          onClick={handleSubmit(onsubmit)}
        >
          Login
        </Button>
}

 </Stack></>
  )
}

export default Loginform