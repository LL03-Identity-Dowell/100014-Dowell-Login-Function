import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import passwordReducer from "./passwordSlice";
import usernameReducer from "./usernameSlice";
import loginReducer from "./loginSlice";
import registrationReducer from "./registrationSlice";
import logoutReducer from "./logoutSlice";
import sessionReducer from "./sessionSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    password: passwordReducer,
    username: usernameReducer,
    login: loginReducer,
    registration: registrationReducer,
    logout: logoutReducer,
    session: sessionReducer,
  },
});

export default store;
