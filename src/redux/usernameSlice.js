import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiBaseUrl = "https://100014.pythonanywhere.com/api/forgot_username/";

export const userSendOTP = createAsyncThunk(
  "username/userSendOTP",
  async ({ email }) => {
    try {
      const response = await axios.post(apiBaseUrl, { email });
      if (response.data.msg === "success") {
        return response?.data?.info;
      } else {
        throw new Error(response?.data?.info);
      }
    } catch (error) {
      throw new Error(error?.response?.data?.info);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "username/verifyOTP",
  async ({ email, otp }) => {
    try {
      const response = await axios.post(apiBaseUrl, {
        email,
        otp,
      });
      if (response.data.msg === "success") {
        return response?.data?.info;
      } else {
        throw new Error(response?.data?.info);
      }
    } catch (error) {
      throw new Error(error?.response?.data?.info);
    }
  }
);

const usernameSlice = createSlice({
  name: "username",
  initialState: {
    usernameList: "",
    otpSent: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(userSendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = action.payload; // Update otpSent with the received value
      })
      .addCase(userSendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.usernameList = "";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.usernameList = action.payload; // Update usernameList with the received value
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usernameSlice.reducer;
