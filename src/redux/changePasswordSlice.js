import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../lib/instance";

// Async thunk to change the password
export const changePasswordAsync = createAsyncThunk(
  "password/changePassword",
  async ({ username, old_password, new_password }) => {
    try {
      const response = await instance.post("/api/password_change/", {
        username,
        old_password,
        new_password,
      });

      if (response.data.msg === "success") {
        console.log("success", response?.data.info);
        // return response?.data.info;
      } else {
        console.log("error", response?.data.info);
        // throw new Error(response?.data.info);
      }
    } catch (error) {
      console.log("error", error.response?.data.info);
      // throw new Error(error.response?.data.info);
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    loading: false,
    error: null,
    changePassword: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.changePassword = action.payload;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default passwordSlice.reducer;
