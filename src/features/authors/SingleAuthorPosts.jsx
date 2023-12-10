import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../posts/postSlice';
import { useParams } from 'react-router-dom';
import SinglePost from '../posts/SinglePost';
import { selectAllAuthors } from './authorSlice';

function SingleAuthorPosts() {

    const posts = useSelector(selectAllPosts)
    const authors = useSelector(selectAllAuthors)
    const { authorId } = useParams()

    let post;

    if (authorId) {
        post = posts.filter((post) => {
            return post.userId == authorId
        })
    }

    let author = authors.find((author) => {
        return author.id == authorId
    })

    const authorPost = post.map((item) => {
        return <section key={item.id} className='post-sec'>
            <SinglePost post={item} />
        </section>
    })


    return (
        <>
            <h1>Posts By {author.name}</h1>
            <section className='post-container'>
                {authorPost}
            </section>
        </>
    );
}

export default SingleAuthorPosts;