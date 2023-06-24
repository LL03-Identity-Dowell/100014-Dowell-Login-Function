import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiBaseUrl = "https://100014.pythonanywhere.com/api/forgot_username/";

export const sendOTP = createAsyncThunk("auth/sendOTP", async ({ email }) => {
  try {
    const response = await axios.post(apiBaseUrl, { email });
    if (response.data.msg === "success") {
      return response.data.info;
    } else {
      throw new Error(response.data.info);
    }
  } catch (error) {
    throw new Error(error.response.data.info);
  }
});

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }) => {
    try {
      const response = await axios.post(apiBaseUrl, { email, otp });
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usernameList: [],
    success: false,
    loading: false,
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
        state.success = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.usernameList = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
