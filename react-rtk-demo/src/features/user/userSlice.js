import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    users: [],
    error: ''
}

// generated pending, fullfiled and rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
   return axios.get('https://api-mahasiswa.vercel.app/api/v1/mahasiswa')
    .then(response => response.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message
        })
    }
});

export default userSlice.reducer;