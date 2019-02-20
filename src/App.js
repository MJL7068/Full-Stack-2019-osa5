import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  //const [addBlogVisible, setAddBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject).then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage(`a new blog ${title} by ${author} added`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')

      setUser(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  const addLike = (blog) => {
    return () => {
      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      blogService
        .update(blog._id, blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.map(b => b._id !== blog._id ? b : returnedBlog))
        })
    }
  }

  const addBlogForm = () => {
    /*const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          <AddBlogForm
            title={title} setTitle={setTitle} 
            author={author} setAuthor={setAuthor} 
            url={url} setUrl={setUrl} 
            addBlog={addBlog}
          />
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )*/
    return(
      <div>
        <Togglable buttonLabel="new blog" >
          <AddBlogForm
            title={title} setTitle={setTitle} 
            author={author} setAuthor={setAuthor} 
            url={url} setUrl={setUrl} 
            addBlog={addBlog}
          />
         </Togglable>    
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} message={message} /> :
        
        <BlogList 
          blogs={blogs} user={user} handleLogout={handleLogout} 
          message={message}
          addBlogForm={addBlogForm}
          addLike={addLike}
        />
      }
    </div>
  )
}

export default App