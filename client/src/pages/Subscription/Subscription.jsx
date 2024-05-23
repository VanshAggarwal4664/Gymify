import React, { useState } from 'react'
import './Subscription.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


const Subscription = () => {
  const location = useLocation()
  const { memberId } = location.state || {memberId:"0000000"}
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")

  const [form, setForm] = useState({
    memberId: memberId,
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
      try {
        event.preventDefault()
        console.log(form.Durationmonths,"1")
        const endDate = calculateEndDate(form.startDate,form.Durationmonths)
        const formDataToSend= {...form,endDate:endDate}
        const response = await axios.post("http://localhost:2000/api/v1/plan/subscription", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        })
        setShow(true)
        setMessage(response.data.message)
        console.log(response.data.message, "active")
      } catch (error) {
        setShow(true)
        setMessage(error.response.data.message);
        console.log(error)

      }
    }

  
  return (
    <>
      <div className='member-subscription'>
        <div className='subscription-heading'>
          <h1>Add Subscription</h1>
        </div>
        <div>
          <form className='subscription-form'>
            <label>Member Id</label>
            <input
              type="text"
              value={form.memberId}
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
            <button onClick={handleSubmit} className='avail-button'>Avail Membership</button>
            {show?<p style={{color:"white"}}>{message}</p>:""}
          </form>
        </div>
      </div>
    </>
  )
}

export default Subscription