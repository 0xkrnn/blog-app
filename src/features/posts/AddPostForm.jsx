import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postSlice';
import { selectAllAuthors } from '../authors/authorSlice';
import { useNavigate } from 'react-router-dom';


function AddPostForm() {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")

    const dispatch = useDispatch()

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setBody(e.target.value)

    const [status, setStatus] = useState("idle")
    const navigate = useNavigate()

    const canSave = [title, body, author].every(Boolean) && status === "idle"

    const postAdded = () => {

        if (canSave) {
            try {
                setStatus("pending")
                dispatch(addNewPost({ title, body, author }))
                setTitle("")
                setBody("")
                setAuthor("")
                navigate("/")
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setStatus("idle")
            }
        }
    }

    const authors = useSelector(selectAllAuthors)

    const users = authors.map((user) => {
        return <option
            value={user.id}
            key={user.id}
        >
            {user.name}
        </option>
    })

    return (
        <div className='container'>
            <form action="post">

                <label htmlFor="topic">
                    Topic :
                </label>

                <textarea
                    type="text"
                    value={title}
                    onChange={onTitleChange}
                />

                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value={null}></option>
                    {users}
                </select>

                <label htmlFor="content">
                    Content :
                </label>

                <textarea
                    type="text"
                    value={body}
                    onChange={onContentChange}
                />

                <button
                    type='button'
                    className='btn'
                    onClick={postAdded}
                    disabled={!canSave}
                >
                    Add Post
                </button>

            </form>
        </div>
    );
}

export default AddPostForm;