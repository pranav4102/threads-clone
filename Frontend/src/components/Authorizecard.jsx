import {Flex,Box,FormControl, FormLabel,Input,InputGroup, HStack,InputRightElement, Stack,Button,Heading,Text, useColorModeValue,Link,} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Signupform from './Signupform'
import Loginform from './Loginform'

export default function AuthorizeCard() {
const [isLogin, setIslogin]=useState(false)
  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('white', '#101010')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={10} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
          {isLogin ? 'Login': 'Signup'}
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', '#101010')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
         {isLogin ? <Loginform/> : <Signupform/>} 
            <Stack pt={6}>
              <Text align={'center'} color={"gray"}>
              {isLogin ? 'Dont have an account?': 'Already a user?'}  <Link color={useColorModeValue('#101010', 'white')} onClick={()=>{setIslogin(!isLogin)}}>{isLogin ? 'Signup': 'Login'}</Link>

              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}