import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(true)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle} onClick={toggleVisibility}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={addLike(blog)}>like</button></p>
        <p>added by {blog.user.name}</p>
      </div>
      <div syle={showWhenVisible}>
        {blog.title} {blog.author}
      </div>
    </div>
  )
}

export default Blog