import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  searchData: [],
  error: '',
};

export const searchTask = createAsyncThunk('search/fetch', async (name) => {
  
    const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/tasks?name_like=${name}`);
    return response.data;
  
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTask.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(searchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.searchData = action.payload;
        state.error = '';
      })
      .addCase(searchTask.rejected, (state, action) => {
        state.loading = false;
        state.searchData = [];
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
