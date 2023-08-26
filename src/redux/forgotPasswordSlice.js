import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://100014.pythonanywhere.com";

export const sendOTP = createAsyncThunk(
  "forgotPassword/sendOTP",
  async ({ username, email, usage }) => {
    try {
      const response = await axios.post(`${base_url}/api/emailotp/`, {
        username,
        email,
        usage,
      });
      if (response.data.msg === "success") {
        console.log("pass-suc", response.data.info);
        return response.data.info;
      }
    } catch (error) {
      console.log("pass-err", error.response.data.info);
      throw new Error(error.response.data.info);
    }
  }
);

// Async thunk for submitting OTP and new password
export const forgotPasswordAsync = createAsyncThunk(
  "forgotPassword/forgotPassword",
  async ({ username, email, otp, new_password, confirm_password }) => {
    try {
      const response = await axios.post(`${base_url}/api/forgot_password/`, {
        username,
        email,
        otp,
        new_password,
        confirm_password,
      });
      if (response?.data.msg === "success") {
        return response.data.info;
      }
    } catch (error) {
      throw new Error(error.response.data.info);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    otpSent: false,
    passwordReset: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = action.payload;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordReset = action.payload;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
