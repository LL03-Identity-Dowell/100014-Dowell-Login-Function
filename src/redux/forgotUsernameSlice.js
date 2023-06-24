import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://100014.pythonanywhere.com/api/forgot_username/";

export const submitOTP = createAsyncThunk(
  "forgotUsername/submitOTP",
  async ({ email, otp }) => {
    try {
      const response = await axios.post(API_URL, { email, otp });
      if (response.data.msg === "success") {
        return response.data.info;
      } else {
        throw new Error(response.data.info);
      }
    } catch (error) {
      throw new Error(error.response.data.info);
    }
  }
);

const forgotUsernameSlice = createSlice({
  name: "forgotUsername",
  initialState: {
    loading: false,
    error: null,
    otpSent: false,
    usernameList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.usernameList = [];
      })
      .addCase(submitOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.usernameList = action.payload;
      })
      .addCase(submitOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default forgotUsernameSlice.reducer;
