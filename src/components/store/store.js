import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from "../slices/loaderSlice.js"
import dataUser from "../slices/userSlice.js"

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user:dataUser
  },
});

export default store;
