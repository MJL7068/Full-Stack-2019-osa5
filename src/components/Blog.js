import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog, addLike, removeBlog }, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  
  //const hideWhenVisible = { display: visible ? 'none' : '' }
  //const showWhenVisible = { display: visible ? '' : 'none' }

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
        <button type="submit" onClick={removeBlog(blog)}>remove</button>
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