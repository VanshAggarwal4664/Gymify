import React, { useState } from 'react'
import './Subscription.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'





const Subscription = () => {
  const navigate=useNavigate();
  const location = useLocation()
  // yaha do jagoh se redirect aa raha h 
  //1. pehla register se member id and is edit false kyuki new subscription h to hume save karni h to hume member id chahiye hmare model ke hisab se
  //2. dusra view member se subscription id and edit true kyuki hume subscription  ko update karni h member already register h 
  const { Id,isEdit } = location.state || {Id:"0000000" ,isEdit:false}
  console.log(Id)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const[loader,setLoader]=useState(false)

  const [form, setForm] = useState({
    Id: Id, // yeh kabhi member id jaise act karega or kabhi subscription id jaise work karega
    startDate: '',
    Durationmonths:1,
    price: 700
  })

  const calculateEndDate=(startDate,Durationmonths)=>{
      const parseduration= parseInt(Durationmonths,10)
       const endDate= new Date(startDate);
       const endmonth= endDate.getMonth()+ parseduration
       endDate.setMonth(endmonth)
       return endDate
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const handelDuration = (event) => {
    const duration = event.target.value
    let price

    switch (duration) {
      case "1":
        price = 700
        break;
      case "3":
        price = 1500
        break;

      case "6":
        price = 2800
        break;

      case "12":
        price = 5000
        break;

      default:
        price = 500
        break;
    }
    setForm({
      ...form,
      Durationmonths: duration,
      price: price
    })
  }

   const handleSubmit = async (event) => {
    setLoader(true);
      
        event.preventDefault()
        // console.log(form.Durationmonths,"1")
        if(!isEdit){
          const endDate = calculateEndDate(form.startDate,form.Durationmonths)
          const formDataToSend= {...form,memberId:form.Id  ,endDate:endDate}
           await axios.post("http://localhost:2000/api/v1/plan/subscription", formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true
          }).then((response)=>{
            setMessage(response.data.message)
            setLoader(false)
            setShow(true)
            setTimeout(() => {
            navigate('/admin-panel/view-members')
            }, 2000);
          }).catch((error)=>{
            setShow(true)
            setLoader(false)
            setMessage(error.response.data.message);
            console.log(error)
          })
        
        }
        else
        {
          const endDate = calculateEndDate(form.startDate,form.Durationmonths)
          const formDataToSend= {...form,subscriptionId:form.Id ,endDate:endDate}
           await axios.put("http://localhost:2000/api/v1/plan/subscription-update", formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true
          }).then((response)=>{
            setMessage(response.data.message)
            setLoader(false)
            setShow(true)
            setTimeout(() => {
            navigate('/admin-panel/view-members')
            }, 2000);
          }).catch((error)=>{
            setShow(true)
            setLoader(false)
          setMessage(error.response.data.message);
          console.log(error)
          })
          
         
        }
    }

  return (
    <>
      <div className='member-subscription'>
        <div className='subscription-heading'>
          <h1>{!isEdit?"Add Subscription": "Update Subscription"}</h1>
        </div>
        <div>
          <form className='subscription-form'>
            <label>{!isEdit?"Member Id":"Subscription Id"}</label>
            <input
            style={{color:"black"}}
              type="text"
              value={form.Id}
              readOnly />
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <label>Validity</label>
            <select  value={form.Durationmonths} required onChange={handelDuration}>
              <option  value="1">1 Months</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
            <label>Plan amount</label>
            <input type="number" value={form.price} readOnly />
            <button onClick={handleSubmit} className='avail-button'>
            {!isEdit?"Avail Membership":"Update Membership"}
            {loader?<Spinner boxSize="16px" padding="0px 1px"/>:""}
            </button>
            {show?<p style={{color:"white"}}>{message}</p>:""}
          </form>
        </div>
      </div>
    </>
  )
}

export default Subscription