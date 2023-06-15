import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
   
}
export const postData = createAsyncThunk("post/fetch",async(body)=>{
        axios.post("https://rocky-temple-83495.herokuapp.com/employees",body)
})
const formRegisterSlice = createSlice({
    name:"formSlice",
    initialState,
    reducers:{
        changeFlag:(state)=>{
            state.changeFlag = false
        }
    },
    extraReducers: (builder) => {
       builder.addCase(postData.fulfilled,(state)=>{
            alert("success")
       })
      
    }
})

export default formRegisterSlice.reducer
export const {changeFlag} = formRegisterSlice.actions
