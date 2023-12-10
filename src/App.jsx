import { Navigate, Route, Routes } from "react-router-dom"
import AddPostForm from "./features/posts/AddPostForm"
import Posts from "./features/posts/Posts"
import Layout from "./components/Layout"
import SinglePostPage from "./features/posts/SinglePostPage"
import EditPostForm from "./features/posts/EditPostForm"
import Authors from "./features/authors/Authors"
import SingleAuthorPosts from "./features/authors/SingleAuthorPosts"

function App() {

  return (
    <>
      <Layout />
      <Routes>
        <Route index element={<Posts />} />

        <Route path="/post">
          <Route index element={<AddPostForm />} />
          <Route path="edit/:postid" element={<EditPostForm />} />
          <Route path=":postid" element={<SinglePostPage />} />
        </Route>

        <Route path="/authors"  >
          <Route index element={<Authors />} />
          <Route path=":authorId" element={<SingleAuthorPosts />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  )
}

export default App
