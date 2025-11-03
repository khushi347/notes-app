import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './pasteSlice'; // your slice file

const store = configureStore({
  reducer: {
    paste: pasteReducer ,
  },
});

export default store;
