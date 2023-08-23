import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "./instance";

export const userSendOTP = createAsyncThunk(
  "username/userSendOTP",
  async ({ email, usage }) => {
    const response = await postData("/api/emailotp/", {
      email,
      usage,
    });

    return response;
  }
);

export const verifyOTP = createAsyncThunk(
  "username/verifyOTP",
  async ({ email, otp }) => {
    const response = await postData("/api/forgot_username/", {
      email,
      otp,
    });
    return response;
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
