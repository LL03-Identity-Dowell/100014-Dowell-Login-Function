import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://100014.pythonanywhere.com/api/registration/";

// Async thunk to handle registration API call
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async ({ username, email, password }) => {
    try {
      const response = await axios.post(API_URL, {
        username,
        email,
        password,
      });
      if (response.data.msg === 200) {
        return response?.data;
      } else {
        throw new Error(response?.data);
      }
    } catch (error) {
      throw new Error(error?.response?.data);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    registered: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
