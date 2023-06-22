import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

export const resetPassword = createAsyncThunk(
  "password/reset",
  async (data) => {
    const response = await api.post("/api/forgot_password", {
      username: data.username,
      email: data.email,
      opt: data.otp,
      new_password: data.password,
    });
    return response.data;
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
