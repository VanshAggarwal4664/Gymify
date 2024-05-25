import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ChakraProvider, Spinner } from '@chakra-ui/react'



const Register = () => {
      const navigate= useNavigate()
      const [message,setMessage]=useState('');
      const [show,setShow]=useState(false)
      
    const [form, setForm]= useState({
        fullname:"",
        email:"",
        mobileNumber:"",
        photo:null 
    })
    const handleCancel=()=>{
        setForm({
            fullname:"",
            email:"",
            mobileNumber:"",
            photo:null
        })
    }
      const handleEvent=(event)=>{
          if(event.target.name==="photo")
            {
                setForm({...form, photo: event.target.files[0]})
            }
            else{
                setForm({...form, [event.target.name]: event.target.value})
            }
      }

      const handleSubmit= async(event)=>{
        try {
             event.preventDefault()
    
             const formDataToSend= new FormData();
             formDataToSend.append("fullName",form.fullname)
             formDataToSend.append("email",form.email)
             formDataToSend.append("mobileNumber",form.mobileNumber)
             formDataToSend.append("photo",form.photo)
    
             const response= await axios.post("http://localhost:2000/api/v1/members/register",formDataToSend,{
                headers:{
                    'Content-Type':'multipart/form-data'
                  },
                withCredentials:true
             })
             setShow(true)
             setMessage(response.data.message)
             navigate('/admin-panel/plan',{state:response.data.data})

             console.log("member register successfully:", response.data.data.memberId)
        } catch (error) {
            setShow(true)
            setMessage(error.response.data.message)
            console.log("yaha se aa raha h",error)
        }
      }

  return (
    <>
    <ChakraProvider>
        <div className='register-member'>
            <div className='member-heading'>
                <h1>Become a Member!</h1>
                <h2>Register Here</h2>
            </div>
            <div >
                <form className='member-form' >
                    <label> Member Name</label>
                    <input 
                    type="text" 
                    name='fullname'
                    value={form.fullname}
                    onChange={handleEvent}
                    required
                    />
                    <label> Email Address</label>
                    <input 
                    type="email" 
                    name='email'
                    value={form.email}
                    onChange={handleEvent}
                    required
                     />
                    <label> Contact No.</label>
                    <input 
                    type="number" 
                    name='mobileNumber'
                    value={form.mobileNumber}
                    onChange={handleEvent}
                    required
                    />
                    <label>Member Photo</label>
                    <input style={{color:"black" }}
                    type="file"
                    name='photo'
                    onChange={handleEvent}
                    required
                    />
                    <div>
                      <button onClick={handleSubmit} className='avail-button'>Avail Membership</button>
                      <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                    </div>
                   {show?<p style={{color:"white"}}>{message?message:<Spinner colorScheme='white'/>}</p>:""}
                </form>
                
            </div>
        </div>
        </ChakraProvider>
    </>
  )
}

export default Register