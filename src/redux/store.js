import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import passwordReducer from "./passwordSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    password: passwordReducer,
    username: authReducer,
  },
});

export default store;
