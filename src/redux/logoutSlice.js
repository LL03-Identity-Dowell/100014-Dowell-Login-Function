import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define the logout API endpoint
const logoutAPI = "https://100014.pythonanywhere.com/api/main_logout/";

// Create an async thunk for the logout API call
export const logoutUser = createAsyncThunk(
  "logout/logoutUser",
  async ({ session_id }) => {
    try {
      const response = await axios.post(logoutAPI, { session_id });
      if (response.data.msg === "error") {
        return response.data.info;
      } else {
        throw new Error(response.data.info);
      }
    } catch (error) {
      throw new Error(error?.response?.data?.info);
    }
  }
);

// Create the logout slice
const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    loading: false,
    error: null,
    loggedOut: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedOut = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;
