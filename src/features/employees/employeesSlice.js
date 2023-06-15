import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  employees: [],
  eror: "",
  currentPage:1,
  perPage:10 ,
  totalPage:0,
  url:"https://rocky-temple-83495.herokuapp.com/employees",
};

export const fetchEmployess = createAsyncThunk("employess/fetch", (url) => {
  return axios
    .get(url)
    .then(resp => resp.data.filter(user=>user.name))
});
export const dataCount = createAsyncThunk("dataCount/fetch", (url) => {
  return axios
    .get(url)
    .then(resp => resp.data.filter(user=>user.name))
});
export const deletePerson = createAsyncThunk("dataCount/fetch", (url) => {
  return axios
    .get(url)
    .then(resp => resp.data.filter(user=>user.name))
});


const empoloyeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers:{
    setCurrentPage:(state,action)=>{
      state.currentPage = action.payload
    },
    setPerPage:(state,action)=>{
      state.perPage = action.payload
    },
    
  },
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
    builder.addCase(dataCount.fulfilled,(state,action)=>{
      state.totalPage = action.payload.length
    })
  }
});

export default empoloyeesSlice.reducer;
export const{setCurrentPage,setPerPage,setTotalPage} = empoloyeesSlice.actions;
