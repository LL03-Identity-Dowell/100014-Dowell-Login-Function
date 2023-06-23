import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://100014.pythonanywhere.com/api/forgot_password/";

export const resetPassword = createAsyncThunk(
  "password/reset",
  async ({ username, email, otp, new_password }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        username,
        email,
        otp,
        new_password,
      });

      const responseData = response.data;
      if (responseData.message === "success") {
        return {
          message: otp
            ? "Password reset successfully"
            : "OTP sent successfully",
        };
      } else {
        return {
          error: responseData.info,
        };
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
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
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default passwordSlice.reducer;
