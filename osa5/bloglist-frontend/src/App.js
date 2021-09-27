import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try{
      const user  = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('KIRJAUTUNUT USER ', user)
    } catch(exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000) 
      console.log('wrong credentials try-catch block!')
    } 
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = async (event) => {
    try {
      const blogObject = {
        title: newBlog,
        author: author,
        url: url
      }
      const response = blogService.create(blogObject)
      console.log(response)

      setNewBlog('')
      setAuthor('')
      setUrl('')
      setMessage('Blogi lisätty!')
      setTimeout(() => {
        setMessage(null)
      }, 10000) 
    } catch (exception) {
      console.log('poikkeus blogin lisäämisessä!')
    }
  } 

  const handleAuthorChange = event => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const handleBlogChange = event => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
  }
  const handleUrlChange = event => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={message} />
      { user === null ? 
        loginForm() :
        <div>
            <p>{user.name} logged in</p>
            <form onSubmit={addBlog}>
        <div>
        <input
          value={newBlog}
          onChange={handleBlogChange}
        />
        </div>
        <div>
        <input
          value={author}
          onChange={handleAuthorChange}
        />
        </div>
        <div>
        <input
          value = {url}
          onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
    </form> 
        <h2>blogs</h2>
        <ul>
          {blogs.map(blog =>
            <li key={blog.id}>
              <Blog key={blog.id} blog={blog} />
            </li>
          )}
        </ul>
        </div>
      }
    </div>
)
}


export default App