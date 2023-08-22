import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "./instance";

// Async thunk for sending the POST request and getting emailOTP
export const sendOTP = createAsyncThunk(
  "password/sendOTP",
  async ({ username, email, usage }) => {
    const response = await postData("/api/emailotp/", {
      username,
      email,
      usage,
    });
    return response;
  }
);

// Async thunk for submitting OTP and new password
export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async ({ username, email, otp, new_password, confirm_password }) => {
    const response = await postData("/api/forgot_password/", {
      username,
      email,
      otp,
      new_password,
      confirm_password,
    });
    return response;
  }
);

const resetPasswordSlice = createSlice({
  name: "password",
  initialState: {
    loading: false,
    error: null,
    otpSent: null,
    passwordReset: false,
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
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordReset = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resetPasswordSlice.reducer;
