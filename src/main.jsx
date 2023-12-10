import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/authors/authorSlice.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fetchPosts } from './features/posts/postSlice.js'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
)
