import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../Components/Navbar/navbar'
import './Signup.css'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

  const navigate=useNavigate()
       // pehle usestate ma username password email store karte h
  const [formdata,setFormdata]= useState({
    username:"",
    email:"",
    password:"",
    logo:null
  })

  const [show ,setShow]=useState(false)
  const [successMessage ,setSuccessMessage]= useState()
  const handleChange=(event)=>{
    if(event.target.name === "logo"){
      
      setFormdata({...formdata, logo:event.target.files[0]})
     
    }
    else{
      setFormdata({...formdata, [event.target.name]: event.target.value})
    
    }
  }
  const OnSubmit=async(event)=>{
      event.preventDefault()

      try {
        const formdataToSend= new FormData();
        formdataToSend.append('username', formdata.username)
        formdataToSend.append('email', formdata.email)
        formdataToSend.append('password', formdata.password)
        formdataToSend.append('logo', formdata.logo)

        const outcome= await axios.post(" http://localhost:2000/api/v1/users/register",formdataToSend,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(outcome)
        setShow(true)
        setSuccessMessage(outcome.data.message)
        setTimeout(() => {
          navigate('/signin')// Redirect to login page
        }, 3000)
       
      } catch (error) {
      
       console.log("error occurred registring the user on client side",error.response.data)
      //  const tempdiv=document.createElement('div')
      //  tempdiv.innerHTML=error.response.data
      //  const errorpre=tempdiv.querySelector('pre')
      //  const message=errorpre.textContent
       setShow(true)
       setSuccessMessage(error.response.data.message)
       
      }
  }
  return (
 
    <div className='signupPage'>
    <Navbar/>
    <div className='signupsection'>
    
      <div>
        <img src="src\assets\Man lifting barbell.gif" alt="" srcSet="" width='400px' height="400px" />
      </div>
      <div>
       <div >
        
        <form className='signupform' >
        <h2 className='form-heading'>Register Your account</h2> 
          <input 
          type="text" 
          name="username"
          value={formdata.username}
          placeholder='Username' 
          onChange={handleChange}
          />
          <input
           type="email" 
           name="email" 
           value={formdata.email}
           placeholder='enter your email' 
           onChange={handleChange}
           required={true}/>
          <input
           type="password"
           name='password'
           placeholder='enter your password' 
           value={formdata.password}
           onChange={handleChange}
           required />

          <label style={{color:"white"}}>Upload your gym Logo</label>

          <input 
          type="file"
           id='logo' 
           name="logo" 
           required
           onChange={handleChange}></input>
         <button onClick={OnSubmit}>SignUp</button>
          {show ? <p style={{color:"white"}}>{successMessage}</p>:""} 
         </form>
        </div>
      
      </div>
    </div>

    
    </div>
  )
}

export default Signup
