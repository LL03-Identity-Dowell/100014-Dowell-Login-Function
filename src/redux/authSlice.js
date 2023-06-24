import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotUsername = createAsyncThunk(
  "auth/forgotUsername",
  async ({ email, otp }) => {
    try {
      const response = await axios.post(
        "https://100014.pythonanywhere.com/api/forgot_username/",
        { email, otp }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    usernameList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.usernameList = null;
      })
      .addCase(forgotUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.usernameList = action.payload;
      })
      .addCase(forgotUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
