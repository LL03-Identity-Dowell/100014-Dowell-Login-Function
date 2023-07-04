import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://100014.pythonanywhere.com/api/register/";

// Async thunk function to handle the email OTP request.
export const sendEmailOTP = createAsyncThunk(
  "register/sendEmailOTP",
  async ({ email }) => {
    try {
      const response = await axios.post(API_URL, { email });
      if (response.data.msg === "success") {
        console.log("response", response?.data?.info);
        // return response?.data?.info;
      } else {
        throw new Error(response?.data?.info);
      }
    } catch (error) {
      throw new Error(error?.response?.data?.info);
    }
  }
);

// Async thunk function to handle the mobile OTP request
export const sendMobileOTP = createAsyncThunk(
  "register/sendMobileOTP",
  async ({ phone }) => {
    try {
      const response = await axios.post(API_URL, { phone });
      if (response.data.msg === "success") {
        console.log("response", response?.data?.info);
        // return response?.data?.info;
      } else {
        throw new Error(response?.data?.info);
      }
    } catch (error) {
      throw new Error(error?.response?.data?.info);
    }
  }
);

// Async thunk to handle registration API call
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({
    first_name,
    last_name,
    username,
    user_type,
    email,
    password,
    confirm_password,
    user_country,
    phone_code,
    phone,
    otp,
    sms,
  }) => {
    try {
      const response = await axios.post(API_URL, {
        first_name,
        last_name,
        username,
        user_type,
        email,
        password,
        confirm_password,
        user_country,
        phone_code,
        phone,
        otp,
        sms,
      });
      if (response.data.msg === "success") {
        console.log("response", response?.data?.info);
        // return response?.data?.info;
      } else {
        throw new Error(response?.data?.info);
      }
    } catch (error) {
      throw new Error(error?.response?.data?.info);
    }
  }
);

// Create the registration slice
const registrationSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    register: false,
    otpSent: null,
    smsSent: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendEmailOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = action.payload;
      })
      .addCase(sendEmailOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMobileOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.smsSent = false;
      })
      .addCase(sendMobileOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.smsSent = action.payload;
      })
      .addCase(sendMobileOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.register = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;
