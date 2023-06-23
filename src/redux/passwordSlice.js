import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint URL
const API_URL = "https://100014.pythonanywhere.com/api/forgot_password/";

// Async thunk for sending the POST request and getting OTP
export const sendOTP = createAsyncThunk(
  "password/sendOTP",
  async ({ username, email }) => {
    try {
      const response = await axios.post(API_URL, { username, email });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.info);
      }
    } catch (error) {
      throw new Error(error.response.data.info);
    }
  }
);

// Async thunk for submitting OTP and new password
export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async ({ otp, new_password }) => {
    try {
      const response = await axios.post(API_URL, { otp, new_password });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.info);
      }
    } catch (error) {
      throw new Error(error.response.data.info);
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    loading: false,
    error: null,
    otpSent: false,
    passwordReset: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordReset = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordReset = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default passwordSlice.reducer;
