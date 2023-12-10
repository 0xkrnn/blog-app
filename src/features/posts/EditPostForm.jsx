import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, editPost, selectAllPosts } from './postSlice';
import { selectAllAuthors } from '../authors/authorSlice';

function EditPostForm() {

    const { postid } = useParams()

    const allPost = useSelector(selectAllPosts)
    const post = allPost.find(post => post.id == postid)
    const allUsers = useSelector(selectAllAuthors)

    const authorName = allUsers.find(user => user.id === post.userId)
    console.log(authorName);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)
    const [author, setAuthor] = useState(authorName.name)

    const onTitleChange = (e) => setTitle(e.target.value)
    const onBodyChange = (e) => setBody(e.target.value)

    let userId;

    useEffect(() => {
        const user = allUsers.find((users) => users.name.toLowerCase() == author.toLowerCase())
        userId = user.id
    }, [author])

    const onSavePost = () => {
        dispatch(editPost({ title, body, postid, userId }))
        navigate(`/post/${postid}`)
        setTitle("")
        setBody("")
        setAuthor("")
    }

    const onDeletePost = () => {
        dispatch(deletePost({ postid }))
        navigate("/")
    }

    const users = allUsers.map(user => {
        return <option value={user.name} key={user.id}>
            {user.name}
        </option>
    })

    return (
        <div>
            <h1>Edit page of {postid}</h1>

            <form action="update">

                <label htmlFor="title">Topic</label>
                <textarea
                    type="text"
                    value={title}
                    onChange={onTitleChange}
                />

                <label htmlFor="author">Author</label>

                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    {users}
                </select>

                <label htmlFor="Content">Content</label>
                <textarea
                    type="text"
                    value={body}
                    onChange={onBodyChange}
                />

                <section className='btn-sec'>
                    <button
                        type='button'
                        className='btn'
                        onClick={onSavePost}
                    >
                        Save Post
                    </button>

                    <button
                        type='button'
                        className='btn'
                        onClick={onDeletePost}
                    >
                        Delete Post
                    </button>
                </section>

            </form>

        </div>
    );
}

export default EditPostForm;