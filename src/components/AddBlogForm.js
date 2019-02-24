import React from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ title, author, url, addBlog }) => {
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title} />
          <br/>
        </div>
        <div>
          author:
          <input {...author} />
          <br/>
        </div>
        <div>
          url:
          <input {...url} />
          <br/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default AddBlogForm