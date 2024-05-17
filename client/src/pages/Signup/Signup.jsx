import React from 'react'
import Navbar from '../../Components/Navbar/navbar'
import './Signup.css'

const Signup = () => {
  return (
    <div className='signupPage'>
    <Navbar/>
    <div className='signupsection'>
    
      <div>
        <img src="src\assets\Man lifting barbell.gif" alt="" srcset="" width='400px' height="400px" />
      </div>
      <div>
       <div >
        
        <form className='signupform' >
        <h2 className='form-heading'>Register Your account</h2> 
          <input type="text" placeholder='Username' required="true" />
          <input type="email" name="" placeholder='enter your email'  required="true"/>
          <input type="password" placeholder='enter your password' required="true" />
          <label style={{color:"white"}}>Upload your gym Logo</label>
          <input type="file" id='logo' name="" required="true"></input>
         <button>SignUp</button>
         </form>
        
        </div>
     
      </div>
    </div>
    </div>
  )
}

export default Signup
