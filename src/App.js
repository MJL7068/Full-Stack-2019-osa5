import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const username = useField('text')
  const password = useField('password')

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService
      .create(blogObject).then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        title.reset()
        author.reset()
        url.reset()
        setMessage(`a new blog ${title.value} by ${author.value} added`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
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
      //blogRef.current.toggleVisibility(blog)

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
          setBlogs(blogs.map(b => b._id !== blog._id ? b : returnedBlog).sort((a, b) => b.likes - a.likes))
        })
    }
  }

  const removeBlog = (blog) => {
    return () => {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
        blogService
          .remove(blog._id)
          .then(() => {
            setBlogs(blogs.filter(b => b._id !== blog._id).sort((a, b) => b.likes - a.likes))

            setMessage(`${blog.title} removed`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }
  }

  /*const blogRef = React.createRef()*/

  const addBlogForm = () => {
    return(
      <div>
        <Togglable buttonLabel="new blog" >
          <AddBlogForm
            title={title}
            author={author}
            url={url}
            addBlog={addBlog}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div className='mainpage'>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          message={message}
        /> :

        <BlogList
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          message={message}
          addBlogForm={addBlogForm}
          addLike={addLike}
          removeBlog={removeBlog}
          /*ref={blogRef}*/
        />
      }
    </div>
  )
}

export default App