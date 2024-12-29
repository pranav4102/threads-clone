import React from 'react' 
import {Link} from 'react-router-dom'
import { useColorMode } from '@chakra-ui/react'
const EditProfileButton = ({userid}) => {
const {colorMode}=useColorMode()
  return (
    <Link to={`/user/edit/${userid}`} className="w-full flex items-center justify-center mt-4">
    <button className={` w-full ${colorMode == 'dark' ? 'bg-white text-black hover:bg-neutral-300' : 'bg-neutral-900 text-white hover:bg-zinc-800'} py-2 px-4 rounded-lg font-semibold text-lg `} >edit profile</button>
    </Link>
  )
}

export default EditProfileButton