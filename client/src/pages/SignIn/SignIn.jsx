import React, { useState } from 'react'
import './SignIn.css'
import Navbar from '../../Components/Navbar/navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const SignIn = () => {
     const navigate= useNavigate();
  const [formdata, setFormdata] =useState({
    username:"",
    password:""
  })
  const [show ,setShow]= useState(false)
  const [message ,setMessage]=useState("")

  const handleChange=(event)=>{
     setFormdata({...formdata, [event.target.name]: event.target.value})
  }

  const OnSubmit=async(event)=>{
     event.preventDefault()

    try {
       const response = await axios.post(" http://localhost:2000/api/v1/users/login",formdata,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true,
       })

       console.log("login successful",response.data);
       setShow(true)
       setMessage(response.data.message)
       setTimeout(() => {
        navigate('/admin-panel',{state:response.data.data}) // redirect to admin page
      }, 2000);
       

    } catch (error) {
      console.log(error.response.data)
      setShow(true)
      setMessage(error.response.data.message)
     
    }
  }
  return (
      <div className='signInPage'>
      <Navbar/>
      <div className='signInsection'>
      
        <div>
          <img src="src\assets\Girl running on treadmill.gif" alt="" srcSet="" width='400px' height="400px" />
        </div>
        <div>
         <div >
          
          <form className='signInform' >
          <h2 className='form-heading'>Login Your account</h2> 
            <input 
            type="text" 
            name='username'
            value={formdata.username}
            onChange={handleChange}
            placeholder='Username' 
            required />
            <input
             type="password" 
             name='password'
            value={formdata.password}
            onChange={handleChange}
             placeholder='enter your password'
             required />
           <button onClick={OnSubmit}>Login</button>
           {show?<p style={{color:"white"}}>{message}</p>:""};
           </form>
          
          </div>
       
        </div>
      </div>
      </div>
    )
}

export default SignIn