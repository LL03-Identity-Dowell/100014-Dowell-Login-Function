import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import passwordReducer from "./passwordSlice";
import forgotUsernameReducer from "./forgotUsernameSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    password: passwordReducer,
    forgetUsername: forgotUsernameReducer,
  },
});

export default store;
