import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

const initialState = [

]

export const fetchUsers = createAsyncThunk("author/fetchUsers", async () => {
    const result = await axios.get(USERS_URL)
    return result.data
})

export const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const selectAllAuthors = (state) => state.author
export default authorSlice.reducer