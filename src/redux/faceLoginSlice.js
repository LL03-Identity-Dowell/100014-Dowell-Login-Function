import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://100014.pythonanywhere.com/api";

export const uploadPhoto = createAsyncThunk(
  "faceLogin/uploadPhoto",
  async ({ imageElement, ...additionalData }) => {
    try {
      const response = await axios.post(
        `${base_url}/face_login_api/`,
        imageElement,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          params: additionalData,
        }
      );

      console.log("Response", response.data);
      // return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const faceLoginSlice = createSlice({
  name: "faceLogin",
  initialState: {
    status: "idle",
    error: null,
    upload: null,
    picLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhoto.pending, (state) => {
        state.status = "loading";
        state.picLoading = true;
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.picLoading = false;
        state.upload = action.payload;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.picLoading = false;
        state.error = action.error.message;
      });
  },
});

export default faceLoginSlice.reducer;
