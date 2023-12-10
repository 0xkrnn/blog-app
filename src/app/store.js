import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice"
import authorReducer from "../features/authors/authorSlice"

export const store = configureStore({
    reducer: {
        posts: postReducer,
        author: authorReducer,
    }
})