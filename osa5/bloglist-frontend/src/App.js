import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
  const addBlog = (blogObject) => {
    try {
      blogService
                .create(blogObject)
                .then(returnedBlog => {
                  setBlogs(blogs.concat(returnedBlog))
                })
      setMessage('Blogi lisätty!')
      setTimeout(() => {
        setMessage(null)
      }, 10000) 
    } catch(exception) {
      console.log("Poikkeus blogin lisäämisessä!")
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in" cancelButtonLabel="cancel">
        <LoginForm
          username={username}
          password = {password}
          handleUsernameChange = {({target}) => setUsername(target.value)}
          handlePasswordChange = {({target}) => setPassword(target.value)}
          handleSubmit = {handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create a new blog" cancelButtonLabel="cancel">
        <BlogForm         
          createBlog={addBlog}
        />
      </Togglable>
    )
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
          {blogForm()}
        </div>
      }
      <h2>blogs</h2>
      <ul>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default App