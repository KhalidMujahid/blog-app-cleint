import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import postSlice from "./post";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
});

export default store;
