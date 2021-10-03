import React, {useState} from 'react'

const Blog = ({blog, updateLikes}) => {
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
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    console.log("OLD BLOG : ", blog)
    console.log("NEW BLOG : ", newBlog)

    updateLikes(id, newBlog)
  }

  if(!open) {
    return(
      <div style={blogStyle}>
        {blog.title}
        <button onClick={toggleOpen}>view</button>
      </div>
    )
  }
  
  return(
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>
        likes: 
        {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div>{blog.url}</div>
      <button onClick={toggleOpen}>hide</button>
    </div>
  )
}    

export default Blog