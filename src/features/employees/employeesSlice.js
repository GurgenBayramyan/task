import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    isUpdating: true,
    person: {},
    employees: [],
    eror: "",
    currentPage: 1,
    perPage: 4,
    totalPage: 0,
    modal:[],
    url: "https://rocky-temple-83495.herokuapp.com/employees",
};

export const fetchEmployess = createAsyncThunk("employess/fetch", async (url) => {
    const data =  await axios.get(url).then(resp => resp.data);
    return data
    
});

export const dataCount = createAsyncThunk("dataCount/fetch", async (url) => {
    return axios
        .get(url)
        .then(resp => resp.data.filter(user => user.name))
});

export const deletePerson = createAsyncThunk("delete/fetch", async (id) => {
    return await axios.delete(`https://rocky-temple-83495.herokuapp.com/employees/${id}`)
});

export const addEmployee = createAsyncThunk("post/fetch", async (body) => {
    const response = await axios.post("https://rocky-temple-83495.herokuapp.com/employees", body)
    return response.data
})

export const updateEmployee = createAsyncThunk("update/fetch", async ({id, body}) => {
    const res = await axios.put(`https://rocky-temple-83495.herokuapp.com/employees/${id}`, body, {
        headers: {
            "Content-Type": "application/json "
        }
    })
    return res.data
});

export const getEmployee = createAsyncThunk("data/fetch", async (id) => {
    const res = await axios.get(`https://rocky-temple-83495.herokuapp.com/employees/${id}`);
    return res.data
});
export const getEmployTask = createAsyncThunk("employee/getTask",async(id)=>{
    const res = await axios.get(`https://rocky-temple-83495.herokuapp.com/tasks?employeeId=${id}`);
    return res.data
})

const empoloyeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.isUpdating = true
            state.currentPage = action.payload
        },
        setPerPage: (state, action) => {
            state.isUpdating = true
            state.perPage = action.payload
        },
       

    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployess.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchEmployess.fulfilled, (state, action) => {
            state.loading = false
            state.isUpdating = false
            state.employees = action.payload
            state.eror = ""
        });
        builder.addCase(fetchEmployess.rejected, (state, action) => {
            state.loading = false
            state.employees = []
            state.eror = action.error.message
        });
        builder.addCase(dataCount.fulfilled, (state, action) => {
            state.totalPage = action.payload.length
        });
        builder.addCase(addEmployee.pending,(state)=>{
            state.isUpdating = false
        })
        builder.addCase(addEmployee.fulfilled, (state) => {
            state.isUpdating = true;
        });
        builder.addCase(deletePerson.fulfilled, (state) => {
            state.isUpdating = true;
            if(state.employees.length === 1){
                state.currentPage = state.currentPage - 1
            }
        });
        builder.addCase(updateEmployee.fulfilled, (state) => {
            state.isUpdating = true;
        });
        builder.addCase(getEmployee.fulfilled, (state, {payload}) => {
            state.person = payload;
        });
        builder.addCase(getEmployTask.pending,(state)=>{
            state.modal = []
        })
        builder.addCase(getEmployTask.fulfilled,(state,{payload})=>{
            state.loading = false
            if(payload.length){
                state.modal = payload
            }else{
                state.modal.push("there is no Task")
            }
            
        })
    }
});

export default empoloyeesSlice.reducer;
export const {setCurrentPage,deletePersons} = empoloyeesSlice.actions;

