import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = "https://100014.pythonanywhere.com/api/login_init_api/";

// Async Thunks
export const generateRandomSessionID = createAsyncThunk(
  "session/generateRandomSessionID",
  async () => {
    try {
      const response = await axios.get(api_url);
      return response.data.random_session;
    } catch (error) {
      throw new Error("Error generating random session ID:", error);
    }
  }
);

export const generateSessionID = createAsyncThunk(
  "session/generateSessionID",
  async () => {
    try {
      const response = await axios.get(api_url);
      return response.data.qrid_login;
    } catch (error) {
      throw new Error("Error generating chat session ID:", error);
    }
  }
);

// Combined slice
const sessionSlice = createSlice({
  name: "session",
  initialState: {
    randomSession: "",
    chatSessionID: "",
    isLoading: false,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for generateRandomSessionID
      .addCase(generateRandomSessionID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateRandomSessionID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.randomSession = action.payload;
      })
      .addCase(generateRandomSessionID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Reducers for generateSessionID
      .addCase(generateSessionID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateSessionID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatSessionID = action.payload;
      })
      .addCase(generateSessionID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default sessionSlice.reducer;
