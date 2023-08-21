import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "./instance";

// Async thunk function to handle the email OTP request.
export const sendEmailOTP = createAsyncThunk(
  "registration/sendEmailOTP",
  async ({ Username, Email, usage }) => {
    const response = await postData("/api/emailotp/", {
      Username,
      Email,
      usage,
    });
    // console.log("OTP response", response);
    return response;
  }
);

// Async thunk function to handle the mobile OTP request
export const sendMobileOTP = createAsyncThunk(
  "registration/sendMobileOTP",
  async ({ phonecode, Phone }) => {
    const response = await postData("/api/register/", { phonecode, Phone });
    // console.log("Phone response", response);
    return response;
  }
);

// Async thunk to handle registration API call
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async ({
    Firstname,
    Lastname,
    Username,
    user_type,
    Email,
    Password,
    confirm_Password,
    user_country,
    phonecode,
    Phone,
    otp,
    sms,
    Profile_Image,
    policy_status,
    newsletter,
  }) => {
    const response = await postData("/api/register/", {
      Firstname,
      Lastname,
      Username,
      user_type,
      Email,
      Password,
      confirm_Password,
      user_country,
      phonecode,
      Phone,
      otp,
      sms,
      Profile_Image,
      policy_status,
      newsletter,
    });
    // console.log("Registration response", response);
    return response;
  }
);

// Create the registration slice
const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    registered: null,
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
        state.registered = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;
