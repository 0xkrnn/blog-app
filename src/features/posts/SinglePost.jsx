import React from 'react';
import AddReaction from './AddReaction';
import { useSelector } from 'react-redux';
import { selectAllAuthors } from '../authors/authorSlice';
import { Link } from 'react-router-dom';

function SinglePost({ post }) {

    const allUsers = useSelector(selectAllAuthors)
    const userName = allUsers.find((user) => {
        return user.id == post.userId
    })


    return (
        <>
            <h2>{post.title}</h2>
            <Link to={`/post/edit/${post.id}`} >Edit post</Link>
            <p>{post.body}</p>
            <p>{userName ? ` -by ${userName.name}` : "-by unknown"}</p>
            <Link to={`/post/${post.id}`}>View Post</Link>
            <AddReaction post={post} />
        </>
    );
}

export default SinglePost;