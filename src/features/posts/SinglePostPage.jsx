import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddReaction from './AddReaction';
import { selectAllAuthors } from '../authors/authorSlice';

function SinglePostPage() {

    const selectPostById = (state, postId) =>
        state.posts.posts.find(post => post.id === postId)

    const { postid } = useParams()
    const post = useSelector(state => selectPostById(state, Number(postid)))

    const allUsers = useSelector(selectAllAuthors)
    const userName = allUsers.find((user) => {
        return user.id == post.userId
    })

    if (!post) {
        
        return (
            <h1>Post Not Found</h1>
        )
    } else {
        return <section className='singlepost'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>{userName ? ` -by ${userName.name}` : "-by unknown"}</p>
            <AddReaction post={post} />
        </section>
    }
}

export default SinglePostPage