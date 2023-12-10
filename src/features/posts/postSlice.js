import { createSlice, nanoid, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'


const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    status: "idle", // idle , succeeded , failed , loading
    error: null
}



export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const result = await axios.get(POSTS_URL)
    return result.data
})

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
    const result = await axios.post(POSTS_URL, initialPost)
    return result.data
})

export const editPost = createAsyncThunk("posts/editPost", async (initialPost) => {
    const { postid } = initialPost
    const result = await axios.put(`${POSTS_URL}/${postid}`, initialPost)
    return result.data
})

export const deletePost = createAsyncThunk("posts/deletePost", async (initialPost) => {
    const { postid } = initialPost
    const result = await axios.delete(`${POSTS_URL}/${postid}`)
    return initialPost
})

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.unshift(action.payload)
            },
            prepare(title, body, author) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        author,
                        reactions: {
                            thumpsup: 0,
                            like: 0,
                            angry: 0
                        }
                    }
                }
            }
        },
        addReactions: (state, action) => {
            const { postid, reaction } = action.payload
            const selectedPost = state.posts.find((post) => {
                return postid === post.id
            })
            selectedPost.reactions[reaction]++
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "success"
                let renderedPost = action.payload.map((post) => {
                    post.reactions = {
                        thumpsup: 0,
                        like: 0,
                        angry: 0
                    }
                    return post
                })

                state.posts = state.posts.concat(renderedPost)

            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

            .addCase(addNewPost.fulfilled, (state, action) => {
                const sortedPosts = state.posts.sort((a, b) => {
                    return a - b
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1
                action.payload.reactions = {
                    thumpsup: 0,
                    like: 0,
                    angry: 0
                }
                action.payload.userId = Number(action.payload.author)
                console.log(action.payload);
                state.posts.unshift(action.payload)
            })

            .addCase(editPost.fulfilled, (state, action) => {
                const { postid, userId } = action.payload
                action.payload.reactions = {
                    thumpsup: 0,
                    like: 0,
                    angry: 0
                }
                action.payload.userId = userId
                const posts = current(state.posts).filter((post) => postid != post.id)
                state.posts = [...posts, action.payload]
            })

            .addCase(deletePost.fulfilled, (state, action) => {
                const { postid } = action.payload
                const posts = current(state.posts).filter((post) => post.id != postid)
                state.posts = [...posts]
            })

    }

})

export default postSlice.reducer
export const selectAllPosts = (state) => state.posts.posts
export const getError = (state) => state.posts.error
export const getStatus = (state) => state.posts.status
export const { addPost, addReactions } = postSlice.actions