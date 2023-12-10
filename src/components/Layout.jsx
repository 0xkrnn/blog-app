import React from 'react';
import { Link } from 'react-router-dom';

function Layout() {
    return (
        <div className='layout'>
            <h1>Blog App</h1>
            <ul>
                <li> <Link to="/"> Home</Link></li>
                <li>< Link to='/post'> Post </Link></li>
                <li>< Link to='/authors'> Authors </Link></li>
            </ul>
        </div>
    );
}

export default Layout;