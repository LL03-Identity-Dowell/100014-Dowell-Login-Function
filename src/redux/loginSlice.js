import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = "https://100014.pythonanywhere.com/api/mobilelogin/";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({
    username,
    password,
    time,
    ip,
    os,
    device,
    location,
    timezone,
    language,
    browser,
  }) => {
    try {
      const response = await axios.post(api_url, {
        username,
        password,
        time,
        ip,
        os,
        device,
        location,
        timezone,
        language,
        browser,
      });
      console.log("response", response?.data);
      // return response?.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

// Create the authentication slice
const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
