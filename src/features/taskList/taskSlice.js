import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    isUpdating: true,
    task: {},
    tasks: [],
    eror: "",
    currentPage: 1,
    perPage: 2,
    totalPage: 0,
    url: "https://rocky-temple-83495.herokuapp.com/tasks",
};




export const fetchTasks = createAsyncThunk("task/fetch", async (url) => {
    return axios
        .get(url)
        .then(resp => resp.data)
});

export const taskCount = createAsyncThunk("taskCount/fetch", async (url) => {
    return axios
        .get(url)
        .then(resp => resp.data)
})
export const deleteTask = createAsyncThunk("deletesds/task", async (id) => {
   return await axios.delete(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`)
});
export const addTask = createAsyncThunk("post/task", async (body) => {
    const response = await axios.post("https://rocky-temple-83495.herokuapp.com/tasks", body)
    return response.data
})

export const updateTasks = createAsyncThunk("update/tasks", async ({id, body}) => {
    const res = await axios.put(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`, body, {
        headers: {
            "Content-Type": "application/json "
        }
    })
    return res.data
});

export const getTasks = createAsyncThunk("get/tasks", async (id) => {
    const res = await axios.get(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`);
    return res.data
});
const tasksSlice = createSlice({
    name: "tasksLists",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setPerPage: (state, action) => {
            state.perPage = action.payload
        },
        deleteTaskData: (state, action) => {
            state.employees = state.tasks.filter(el => el.id != action.payload);

        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false
            state.isUpdating = false
            state.tasks = action.payload
            state.eror = ""
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false
            state.tasks = []
            state.eror = action.error.message
        });
        builder.addCase(taskCount.fulfilled, (state, action) => {
            state.totalPage = action.payload.length
        })
        builder.addCase(addTask.fulfilled,(state)=>{
            state.isUpdating = true;
        })
        builder.addCase(deleteTask.fulfilled, (state, aciiton) => {
            state.isUpdating = true;
        })
        builder.addCase(updateTasks.fulfilled,(state)=>{
            state.isUpdating = true;
        })
        builder.addCase(getTasks.fulfilled,(state,aciiton)=>{
            state.task = aciiton.payload
        })
    }
});

export default tasksSlice.reducer;
export const {setCurrentPage, deleteTaskData} = tasksSlice.actions;
