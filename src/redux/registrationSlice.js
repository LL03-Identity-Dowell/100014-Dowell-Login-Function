import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://100014.pythonanywhere.com/api/registration/";

export const sendOTP = createAsyncThunk(
  "registration/sendOTP",
  async ({ email, phone }) => {
    try {
      const response = await axios.post(API_URL, { email, phone });
      if (response.data === 200) {
        console.log("response", response?.data);
        // return response?.data;
      } else {
        throw new Error(response?.data);
      }
    } catch (error) {
      throw new Error(error?.response?.data);
    }
  }
);

// Async thunk to handle registration API call
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async ({
    first_name,
    last_name,
    username,
    user_type,
    email,
    password,
    confirm_password,
    user_country,
    phone_code,
    phone,
    otp,
  }) => {
    try {
      const response = await axios.post(API_URL, {
        first_name,
        last_name,
        username,
        user_type,
        email,
        password,
        confirm_password,
        user_country,
        phone_code,
        phone,
        otp,
      });
      if (response.data === 200) {
        return response?.data;
      } else {
        throw new Error(response?.data);
      }
    } catch (error) {
      throw new Error(error?.response?.data);
    }
  }
);

// Create the registration slice
const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    registered: false,
    otpSent: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = action.payload;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registered = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;
