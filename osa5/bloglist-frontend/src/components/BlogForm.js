import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
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
              <input
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
             <input
                    value = {author}
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
              <input
                value = {url}
                onChange={handleUrlChange} 
              />
            </div>
            <div>
              <button type="submit">create</button>
            </div>
          </form>
      </div>
    )
}

export default BlogForm