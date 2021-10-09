/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, delBlog, user }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()

    const id = blog.id

    const newBlog = {
      user: blog.user.id === undefined ? blog.user : blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    console.log('OLD BLOG : ', blog)
    console.log('NEW BLOG : ', newBlog)

    updateLikes(id, newBlog)
  }

  const removeBlog = (event) => {
    event.preventDefault()

    window.confirm(`Are you sure you want to delete ${blog.title} ?`)

    console.log('DELETING ', blog.id)

    delBlog(blog.id)
  }

  if(!open) {
    return(
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleOpen}>view</button>
      </div>
    )
  }

  const showDeleteButton = user.name === null
    ? ''
    : user.name === blog.user.name

  return(
    <div style={blogStyle} className='blog'>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>
        likes:
        {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div>{blog.url}</div>
      <div><button onClick={toggleOpen}>hide</button></div>
      {showDeleteButton && (
        <div><button onClick={removeBlog}>remove</button></div>
      )
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  delBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog