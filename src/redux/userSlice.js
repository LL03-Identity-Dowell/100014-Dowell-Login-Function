import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://100014.pythonanywhere.com/api/forgot_username/";

export const fetchUsernameByOtp = createAsyncThunk(
  "user/fetchUsernameByOtp",
  async ({ email, otp }) => {
    try {
      const response = await axios.post(`${baseURL}`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Initial States
const initialState = {
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
  usernames: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsernameByOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsernameByOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { msg, info, usernames } = action.payload;
        if (msg === "success") {
          if (info === "OTP sent successfully") {
            state.otpSent = true;
          } else if (info === "Your username/s was sent to your mail") {
            state.otpVerified = true;
            state.usernames = usernames;
          }
        } else {
          state.error = info;
        }
      })
      .addCase(fetchUsernameByOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
