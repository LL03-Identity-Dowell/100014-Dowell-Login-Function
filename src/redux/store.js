import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import passwordReducer from "./passwordSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    password: passwordReducer,
  },
});

export default store;
