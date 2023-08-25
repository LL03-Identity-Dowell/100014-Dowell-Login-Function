import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "./instance";

// Async thunk function to handle the email OTP request.
export const sendEmailOTP = createAsyncThunk(
  "registration/sendEmailOTP",
  async ({ username, email, usage }) => {
    try {
      const response = await postData("/api/emailotp/", {
        username,
        email,
        usage,
      });
      if (response.data.msg === "success") {
        // console.log("signup-succ", response?.data.info);
        return response.data.info;
      } else {
        // console.log("signup-Error", response?.data.info);
        throw new Error(response.data.info);
      }
    } catch (error) {
      // console.log("signup-Error", error.response?.data.info);
      throw new Error(error.response.data.info);
    }
  }
);

// Async thunk function to handle the mobile OTP request
export const sendMobileOTP = createAsyncThunk(
  "registration/sendMobileOTP",
  async ({ phonecode, Phone }) => {
    try {
      const response = await postData("/api/register/", { phonecode, Phone });
      if (response.data.msg === "success") {
        // console.log("mob-succ", response?.data.info);
        return response.data.info;
      }
    } catch (error) {
      // console.log("mobi-Error", error.response?.data.info);
      throw new Error(error.response.data.info);
    }
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
    try {
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
      if (response?.data.msg === "success") {
        // console.log("regi-succ", response?.data.info);
        return response?.data.info;
      }
    } catch (error) {
      // console.log("Regi-Error", error.response?.data.info);
      throw new Error(error.response?.data.info);
    }
  }
);

// Create the registration slice
const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    registered: false,
    otpSent: false,
    smsSent: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
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
