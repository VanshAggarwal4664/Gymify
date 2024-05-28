import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { Card, CardHeader, CardBody, Heading,Text,Image } from '@chakra-ui/react'
import {ArrowRightIcon} from '@chakra-ui/icons'
import { NavLink, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../ReduxFeatures/User/UserSlice'

const Dashboard = () => {
   const dispatch= useDispatch()
   const userData= useSelector((state)=>{ return state.user})
  
  const [isVerified,setIsVerified]= useState(false);
  const[message,setMessage]=useState("")
  // const [data,setData]= useState({})

  useEffect(() => {
    console.log(userData)
   const getUser= async()=>{
       try {
        const response=  await axios.get("http://localhost:2000/api/v1/users/getuser",{
         withCredentials:true
        })
        // const data = response.then((await response).data)
        // const jsonresponse= response.json()
        console.log(response.data.data)
        setIsVerified(true)
        dispatch(setUser(response.data.data));
        // setData(response.data.data)
       
       } catch (error) {
          //  console.log(error.response.data.message)
         setMessage(error.response.data.message)
          console.log(error)
       }
   }
  getUser();
    
  }, [])
  
  return (
    <>
    {isVerified?(<div className='dashboard'>
          <div className='dashboard-menu'>
              <Card align="center" textAlign="center" padding={8}>
                <CardHeader borderRadius="10">
                {userData?.logo && (<Image src={userData.logo} alt="" boxSize="60px" borderRadius="full" />)}
                    
                </CardHeader>
                <CardBody>
                {userData?.username && (<Heading fontSize={26} color="white">{(userData.username).toUpperCase()}</Heading>)}
                {userData?.email && (<Text fontSize={19} color="white">{userData.email}</Text>)}
                </CardBody>
              </Card>
              <ul className='menu-items'>
                
                <li> 
                <NavLink style={{textDecoration:"none"}} to="dashboard" className= {({isActive})=>{return `menu-item ${isActive?"active":""}` }}>
                <ArrowRightIcon boxSize={14} paddingRight={4}/> Dashboard 
                </NavLink> 
                </li>
                <li> 
                <NavLink  style={{textDecoration:"none"}}to="profile" className= {({isActive})=>{return `menu-item ${isActive? "active ":""}` }}>
                <ArrowRightIcon boxSize={14} paddingRight={4}/> Admin Profile
                </NavLink> 
                </li>
                <li> 
                <NavLink  style={{textDecoration:"none"}}to="register" className= {({isActive})=>{return `menu-item ${isActive?"active":""}` }}>
                <ArrowRightIcon boxSize={14} paddingRight={4}/>  Registration
                </NavLink> 
                </li>
                <li> 
                <NavLink style={{textDecoration:"none"}} to="plan" className= {({isActive})=>{return `menu-item ${isActive?"active":""}` }}>
                <ArrowRightIcon boxSize={14} paddingRight={4}/> Plan
                </NavLink> 
                
                </li>
                <li>
                 <NavLink style={{textDecoration:"none"}} to="payment" className= {({isActive})=>{return `menu-item ${isActive?"active":""}` }}>
                <ArrowRightIcon boxSize={14} paddingRight={4}/>Payment
                 </NavLink>
                 </li>
                <li> 
                <NavLink style={{textDecoration:"none"}} to="view-members" className= {({isActive})=>{return `menu-item ${isActive?"active":""}` }}>
                <ArrowRightIcon boxSize={14} paddingRight={4}/> View Members
                 </NavLink>
                </li>
                <li> 
                <NavLink style={{textDecoration:"none"}} to="message" className= {({isActive})=>{return `menu-item ${isActive?"active":""}` }}>
                <ArrowRightIcon boxSize={14} paddingRight={4}/> Personalized Message
                 </NavLink>
                </li>
                
              </ul>
          </div>
          <div className='dashboard-component'>
            <Outlet />
          </div>
       </div>):<p style={{color:"black", fontSize:"40px"}}>{message}
       </p>}
           
    </>
  )
}

export default Dashboard