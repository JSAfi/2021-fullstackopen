import React, {useState} from 'react'
import blogService from '../services/blogs'

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

  const addLike = (props) => {
    /*
    * Tästä laukaistaan blogServiceen tehtävä PUT -kutsu blogin tiedoilla, joissa likejä on kasvatettu yhdellä
    */
    console.log("LIKING : ", blog)

    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    }

    console.log("WILL UPDATE : ", newBlog)

    const id = blog.id

    blogService.update(id, newBlog)
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