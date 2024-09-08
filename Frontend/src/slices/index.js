import {configureStore} from '@reduxjs/toolkit';
import userNavigate from '../slices/userSlice';


export const site = configureStore({
  reducer: {
    user: userNavigate,
  }
});
