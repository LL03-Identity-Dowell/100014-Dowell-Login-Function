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
    builder.addCase(fetchUsernameByOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export default userSlice.reducer;
