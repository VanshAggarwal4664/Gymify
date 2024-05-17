import React from 'react'
import './SignIn.css'
import Navbar from '../../Components/Navbar/navbar'

const SignIn = () => {
  return (
      <div className='signInPage'>
      <Navbar/>
      <div className='signInsection'>
      
        <div>
          <img src="src\assets\Girl running on treadmill.gif" alt="" srcset="" width='400px' height="400px" />
        </div>
        <div>
         <div >
          
          <form className='signInform' >
          <h2 className='form-heading'>Login Your account</h2> 
            <input type="text" placeholder='Username' required="true" />
            <input type="password" placeholder='enter your password' required="true" />
           <button>Login</button>
           </form>
          
          </div>
       
        </div>
      </div>
      </div>
    )
}

export default SignIn