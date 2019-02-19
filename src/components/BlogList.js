import React from 'react'
import Blog from '../components/Blog'

const blogList = ({blogs, user, title, setTitle, author, setAuthor, url, setUrl, handleLogout, addBlog}) => (
  <div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    <button type="submit" onClick={handleLogout}>logout</button>
    
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          />
      </div>
      <button type="submit">create</button>
    </form>
    
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default blogList