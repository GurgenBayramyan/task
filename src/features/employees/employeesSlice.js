import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  employees: [],
  eror: ""
};

export const fetchEmployess = createAsyncThunk("employess/fetch", (url) => {
  return axios
    .get(url)
    .then(resp => resp.data.filter(user=>user.name))
});

const empoloyeesSlice = createSlice({
  name: "employees",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEmployess.pending, state => {
      state.loading = true;
    })
     builder.addCase(fetchEmployess.fulfilled, (state, action) => {
      state.loading = false
      state.employees = action.payload 
      state.eror = ""
    })
     builder.addCase(fetchEmployess.rejected, (state, action) => {
      state.loading = false 
      state.employees = []
      state.eror =action.error.message
    });
  }
});

export default empoloyeesSlice.reducer;
