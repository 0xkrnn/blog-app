import React from 'react';
import { useSelector } from 'react-redux';
import { getError, getStatus, selectAllPosts } from './postSlice';
import SinglePost from './SinglePost';




function Posts() {

    const posts = useSelector(selectAllPosts)
    const err = useSelector(getError)
    const status = useSelector(getStatus)


    let allPost;

    if (status === "success") {
        allPost = posts.map((post) => {
            return <section key={post.id} className='post-sec' >
                <SinglePost post={post} />
            </section>

        })
    } else if (status === "loading") {
        allPost = <p>Loading...</p>
    } else {
        allPost = <p>{err}</p>
    }

    return (
        <div className='container'>


            <h1>POSTS</h1>

            <section className='post-container'>
                {allPost}
            </section>
        </div>
    );
}

export default Posts;