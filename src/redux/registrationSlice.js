import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://100014.pythonanywhere.com";

export const validateUsernameAsync = createAsyncThunk(
  "registration/validateUsernameAsync",
  async (username) => {
    try {
      const response = await axios.post(`${base_url}/api/validate_username/`, {
        username,
      });
      console.log("object", response.data);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Async thunk function to handle the email OTP request.
export const sendEmailOTP = createAsyncThunk(
  "registration/sendEmailOTP",
  async ({ username, email, usage }) => {
    try {
      const response = await axios.post(`${base_url}/api/emailotp/`, {
        username,
        email,
        usage,
      });
      if (response.data.msg === "success") {
        return response.data.info;
      }
    } catch (error) {
      throw new Error(error.response.data.info);
    }
  }
);

// Async thunk function to handle the mobile OTP request
export const sendMobileOTP = createAsyncThunk(
  "registration/sendMobileOTP",
  async ({ phonecode, Phone }) => {
    try {
      const response = await axios.post(`${base_url}/api/register/`, {
        phonecode,
        Phone,
      });
      if (response.data.msg === "success") {
        return response.data.info;
      }
    } catch (error) {
      throw new Error(error.response.data.info);
    }
  }
);

// Async thunk to handle registration API call
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async ({
    Firstname,
    Lastname,
    Username,
    user_type,
    Email,
    Password,
    confirm_Password,
    user_country,
    phonecode,
    Phone,
    otp,
    sms,
    Profile_Image,
    policy_status,
    newsletter,
  }) => {
    try {
      const response = await axios.post(`${base_url}/api/register/`, {
        Firstname,
        Lastname,
        Username,
        user_type,
        Email,
        Password,
        confirm_Password,
        user_country,
        phonecode,
        Phone,
        otp,
        sms,
        Profile_Image,
        policy_status,
        newsletter,
      });
      if (response?.data.msg === "success") {
        return response?.data.info;
      }
    } catch (error) {
      throw new Error(error.response?.data.info);
    }
  }
);

// Create the registration slice
const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    registered: false,
    otpSent: false,
    smsSent: false,
    error: null,
    isUsernameAvailable: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = action.payload;
      })
      .addCase(sendEmailOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMobileOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMobileOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.smsSent = action.payload;
      })
      .addCase(sendMobileOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(validateUsernameAsync.pending, (state) => {
        state.loading = true;
        state.isUsernameAvailable = null;
      })
      .addCase(validateUsernameAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isUsernameAvailable = action.payload;
      })
      .addCase(validateUsernameAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;
