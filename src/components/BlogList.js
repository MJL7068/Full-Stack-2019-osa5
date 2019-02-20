import React from 'react'
import Blog from '../components/Blog'
import Notification from './Notification'

const blogList = ({blogs, user, handleLogout, message, addBlogForm, addLike, ref}) => (
  <div>
    <h2>blogs</h2>
    <Notification message={message}/>
    <p>{user.name} logged in</p>
    <button type="submit" onClick={handleLogout}>logout</button>
    
    <h2>create new</h2>
    {addBlogForm()}
    
    {blogs.map(blog =>
      <Blog 
        key={blog.id} 
        blog={blog} 
        addLike={addLike}
        ref={ref}
      />
    )}
  </div>
)

export default blogList