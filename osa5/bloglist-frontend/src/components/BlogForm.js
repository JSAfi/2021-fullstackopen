/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <input id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <input
            id='author'
            value = {author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <input
            id='url'
            value = {url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button id='submit' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm