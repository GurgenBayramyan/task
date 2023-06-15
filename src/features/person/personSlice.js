import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
   person:{}
}
export const changeData= createAsyncThunk("dataCount/fetch", async(id,body) => {
    const res = await axios.put(`https://rocky-temple-83495.herokuapp.com/employees/${id}`,body);
  
  });
  export const getData= createAsyncThunk("dataCount/fetch", async(id,body) => {
    const res = await axios.get(`https://rocky-temple-83495.herokuapp.com/employees/${id}`);
    return res.data
  });
const personSlice = createSlice({
    name:"personSlice",
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled,(state,action)=>{
            state.person = action.payload
        })
        builder.addCase(changeData.fulfilled,(state,action)=>{
            alert("success")
            window.location.reload(false)
        })
    }
})

export default personSlice.reducer
