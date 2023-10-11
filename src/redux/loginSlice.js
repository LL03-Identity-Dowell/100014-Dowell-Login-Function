import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = "https://100014.pythonanywhere.com/api/main_login/";

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
    mainparams,
    randomSession,
    redirectUrl,
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
        mainparams,
        randomSession,
        redirectUrl,
      });

      if (response?.data.msg === "success") {
        return response?.data;
      }
    } catch (error) {
      throw new Error(error.response?.data.info);
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
