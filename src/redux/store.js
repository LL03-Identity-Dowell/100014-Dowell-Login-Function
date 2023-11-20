import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import usernameReducer from "./usernameSlice";
import loginReducer from "./loginSlice";
import registrationReducer from "./registrationSlice";
import logoutReducer from "./logoutSlice";
import changePasswordReducer from "./changePasswordSlice";
import initSliceReducer from "./initSlice";
import forgotPasswordReducer from "./forgotPasswordSlice";
import validateUsernameReducer from "./validateUsernameSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    forgotPassword: forgotPasswordReducer,
    username: usernameReducer,
    login: loginReducer,
    registration: registrationReducer,
    logout: logoutReducer,
    changePassword: changePasswordReducer,
    init: initSliceReducer,
    validateUsername: validateUsernameReducer,
  },
});

export default store;
