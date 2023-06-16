import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  tasks: [],
  eror: "",
  currentPage:1,
  perPage:2 ,
  totalPage:0,
  url:"https://rocky-temple-83495.herokuapp.com/tasks",
};

export const fetchTasks = createAsyncThunk("task/fetch", async(url) => {
  return axios
    .get(url)
    .then(resp => resp.data)
});

export const taskCount = createAsyncThunk("taskCount/fetch", async(url) => {
  return axios
    .get(url)
    .then(resp => resp.data)
})
export const deleteTask = createAsyncThunk("deletesds/task", async(id) => {
   axios.delete(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`)
});

const tasksSlice = createSlice({
  name: "tasksLists",
  initialState,
  reducers:{
    setCurrentPage:(state,action)=>{
      state.currentPage = action.payload
    },
    setPerPage:(state,action)=>{
      state.perPage = action.payload
    },
    deleteTaskData:(state,action)=>{
      state.employees = state.tasks.filter(el=>el.id != action.payload);
      
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true;
    })
     builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false
      state.tasks = action.payload 
      state.eror = ""
    })
     builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false 
      state.tasks = []
      state.eror =action.error.message
    });
    builder.addCase(taskCount.fulfilled,(state,action)=>{
      state.totalPage = action.payload.length
    })
    builder.addCase(deleteTask.fulfilled,(state,aciiton)=>{
      state.tasks = state.tasks.filter(el=>el.id  != aciiton.payload);
      alert("deleted");
      window.location.reload(false)
    })
  
  }
});

export default tasksSlice.reducer;
export const{setCurrentPage,setPerPage,setTotalPage,deleteTaskData} = tasksSlice.actions;
