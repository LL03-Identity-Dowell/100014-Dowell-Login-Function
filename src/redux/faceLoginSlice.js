import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://100014.pythonanywhere.com";

export const uploadPhoto = createAsyncThunk(
  "faceLogin/uploadPhoto",
  async (data) => {
    const {
      formData,
      time,
      os,
      device,
      timezone,
      userLanguage,
      browser,
      location,
      randomSession,
      mainparams,
      redirectUrl,
    } = data;
    try {
      const response = await axios.post(
        `${base_url}/api/face_login_api/`,
        formData,
        {
          headers: {
            // If needed, add any headers here
          },
          params: {
            time,
            os,
            device,
            timezone,
            userLanguage,
            browser,
            location,
            randomSession,
            mainparams,
            redirectUrl,
          },
        }
      );

      console.log("Pic", response.data);
      return response.data;
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
    upload: false,
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
