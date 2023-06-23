import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://100014.pythonanywhere.com/api/forgot_password/";

export const resetPassword = createAsyncThunk(
  "password/reset",
  async (data, { rejectWithValue }) => {
    try {
      let response;
      if (!data.otp) {
        // Step 1: Request OTP
        response = await axios.post(`${BASE_URL}`, {
          username: data.username,
          email: data.email,
        });
      } else {
        // Step 2: Reset Password
        response = await axios.post(`${BASE_URL}`, {
          username: data.username,
          email: data.email,
          otp: data.otp,
          new_password: data.newPassword,
        });
      }

      const responseData = response.data;
      if (responseData.msg === "success") {
        return {
          step: data.otp ? 2 : 1,
          message: data.otp
            ? "Password reset successfully"
            : "OTP sent successfully",
        };
      } else {
        return rejectWithValue(responseData.info);
      }
    } catch (error) {
      return rejectWithValue("An error occurred");
    }
  },
  {
    payload: {},
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    message: "",
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message =
          action.payload.msg === "success"
            ? "Password reset successfully"
            : "Wrong OTP";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default passwordSlice.reducer;
