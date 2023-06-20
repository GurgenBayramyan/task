import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchEmployees = createAsyncThunk('tasks/fetchEmployees', async () => {
  const response = await axios.get('https://rocky-temple-83495.herokuapp.com/employees');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  const response = await axios.post('https://rocky-temple-83495.herokuapp.com/tasks', taskData);
  return response.data;
});



const taskFormSlice = createSlice({
  name: "tasks",
  initialState: {
    employees: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, state => {
        state.loading = false;
        window.location.reload(false)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
export default taskFormSlice.reducer;
