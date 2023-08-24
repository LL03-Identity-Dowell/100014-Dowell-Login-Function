import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "./instance";
import axios from "axios";
// import axios from "axios";

// export const sendOTP = createAsyncThunk(
//   "password/sendOTP",
//   async ({ username, email, usage }) => {
//     const response = await postData("/api/emailotp/", {
//       username,
//       email,
//       usage,
//     });
//     return response;
//   }
// );

const api_url = "https://100014.pythonanywhere.com";

export const sendOTP = createAsyncThunk(
  "password/sendOTP",
  async ({ username, email, usage }) => {
    try {
      const response = await axios.post(`${api_url}/api/emailotp/`, {
        username,
        email,
        usage,
      });
      if (response?.data.msg === "success") {
        return response.data.info;
      }
    } catch (error) {
      throw new Error(error.response.data.info);
    }
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
