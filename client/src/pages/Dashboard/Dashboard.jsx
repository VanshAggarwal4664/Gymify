import React from 'react'
import './dashboard.css'
import { Card, CardHeader, CardBody, Heading,Text,Image } from '@chakra-ui/react'

import {ArrowRightIcon} from '@chakra-ui/icons'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>

       <div className='dashboard'>
          <div className='dashboard-menu'>
              <Card align="center" textAlign="center" padding={4}>
                <CardHeader borderRadius="10">
                    <Image src="src\assets\image-removebg-preview (7) (1).png" alt="" boxSize="60px" borderRadius="full" />
                </CardHeader>
                <CardBody>
                <Heading fontSize={30}>Username</Heading>
                <Text fontSize={24}>email@gmail.com</Text>
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
            <Outlet/>
          </div>
       </div>    
    </>
  )
}

export default Dashboard