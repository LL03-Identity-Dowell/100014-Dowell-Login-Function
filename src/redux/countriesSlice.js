import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await api.get("/countries/johnDoe123/haikalsb1234/100074");
    return response.data;
  }
);

// countries slice
const countriesSlice = createSlice({
  name: "countries",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default countriesSlice.reducer;
