import React, { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
const ProtectedRoute = ({Component}) => {
    const navigate=useNavigate();

useEffect(()=>{
    let user=localStorage.getItem('currUser')
    if (!user) {
        navigate('/authorize')}
},[])

    
  return (
   <>
   <Component/>
   </>
  )
}

export default ProtectedRoute