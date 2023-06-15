import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    data: null,
    loading: false,
    error: null,
    body:null
}
export const changeData= createAsyncThunk("dataCount/fetch", async({id,body}) => {
    const res = await axios.put(`https://rocky-temple-83495.herokuapp.com/employees/${id}`,body,{
        headers:{
            "Content-Type":"application/json "
        }
    })
    return res.data
  
  });
  export const getData= createAsyncThunk("data/fetch", async(id) => {
    const res = await axios.get(`https://rocky-temple-83495.herokuapp.com/employees/${id}`);
    return res.data
  });
const personSlice = createSlice({
    name:"personSlice",
    initialState,
    reducers:{
        pushBody: (state,action)=>{
            state.body =action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(changeData.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(changeData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(changeData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
})

export default personSlice.reducer
export const{pushBody} = personSlice.actions