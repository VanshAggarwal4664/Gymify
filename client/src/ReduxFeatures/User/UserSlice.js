import { createSlice } from "@reduxjs/toolkit";

const initialState={
   
    username:"",
    email:"",
    logo:""
  
}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
     setUser: (state,action)=>{
         const {username,email,logo}= action.payload
         state.username=username
         state.email= email
         state.logo=logo
     },
     updateUser:(state,action)=>{
        const {username,email,logo}= action.payload
        if(username) state.username=username
        if(email)state.email=email
        if(logo)state.logo=logo
     }
    }
})

export const {setUser,updateUser} = userSlice.actions

export default userSlice.reducer