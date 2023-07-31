import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import usernameReducer from "./usernameSlice";
import loginReducer from "./loginSlice";
import registrationReducer from "./registrationSlice";
import logoutReducer from "./logoutSlice";
import sessionReducer from "./sessionSlice";
import resetPasswordReducer from "./resetPasswordSlice";
import changePasswordReducer from "./changePasswordSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    resetPassword: resetPasswordReducer,
    username: usernameReducer,
    login: loginReducer,
    registration: registrationReducer,
    logout: logoutReducer,
    session: sessionReducer,
    changePassword: changePasswordReducer,
  },
});

export default store;
