import React, {useState} from 'react'
const Blog = ({blog}) => {
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
        <button>like</button>
      </div>
      <div>{blog.url}</div>
      <button onClick={toggleOpen}>hide</button>
    </div>
  )
}    

export default Blog