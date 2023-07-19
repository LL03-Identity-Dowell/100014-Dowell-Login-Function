import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generateSessionID = createAsyncThunk(
  "chat/generateSessionID",
  async () => {
    try {
      const response = await axios.get(
        "https://100014.pythonanywhere.com/api/login_init_api/"
      );
      return response.data.qrid_login;
    } catch (error) {
      throw new Error("Error generating session ID:", error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sessionID: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateSessionID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateSessionID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sessionID = action.payload;
      })
      .addCase(generateSessionID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
