import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ user, blog, addLike, removeBlog }, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /*useImperativeHandle(ref, () => {
    return {
      toggleVisibility    
    }
  })*/

  if (visible) {
    return(
      <div style={blogStyle} onClick={toggleVisibility}>
        {blog.title} {blog.author}
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button type="submit" onClick={addLike(blog)}>like</button></p>
        <p>added by {blog.user.name}</p>
        {
          (user.username === blog.user.username) ? <button type="submit" onClick={removeBlog(blog)}>remove</button> : null
        }
      </div>
    )
  } else {
    return(
      <div syle={blogStyle} onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </div>
    )
  }

})

export default Blog