import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generateRandomSessionID = createAsyncThunk(
  "policy/generateRandomSessionID",
  async () => {
    try {
      const response = await axios.get(
        "https://100014.pythonanywhere.com/api/login_init_api/"
      );
      console.log("response", response);
      // return response.data.random_session;
    } catch (error) {
      throw new Error("Error generating session ID:", error);
    }
  }
);

const policySlice = createSlice({
  name: "policy",
  initialState: {
    randomSession: "",
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateRandomSessionID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateRandomSessionID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessionID = action.payload;
      })
      .addCase(generateRandomSessionID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default policySlice.reducer;
