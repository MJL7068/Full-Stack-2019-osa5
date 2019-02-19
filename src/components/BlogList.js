import React from 'react'
import Blog from '../components/Blog'

const blogList = ({blogs, user, handleLogout}) => (
  <div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    <button type="submit" onClick={handleLogout}>logout</button>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default blogList