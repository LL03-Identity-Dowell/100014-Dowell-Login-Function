import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

export const resetPassword = createAsyncThunk(
  "password/reset",
  async (data, { rejectWithValue }) => {
    try {
      const endpoint = data.otp ? "verify_otp" : "send_otp";
      const response = await api.post(`/api/forgot_password/${endpoint}`, {
        username: data.username,
        email: data.email,
        otp: data.otp,
        new_password: data.newPassword,
      });
      const responseData = response.data;
      return {
        step: data.otp ? 2 : 1,
        message:
          responseData.msg === "success"
            ? data.otp
              ? "Password reset successfully"
              : "OTP sent successfully"
            : responseData.info,
      };
    } catch (error) {
      return rejectWithValue("An error occurred");
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
