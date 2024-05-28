import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../ReduxFeatures/User/UserSlice';

export const store = configureStore({
  reducer:{
    user:userReducer
  }
});

