const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
  if(blogs) {
    response.json(blogs.toJSON())
  } else {
    response.status(404).end()
  }
})


blogsRouter.post('/', [middleware.tokenExtractor, middleware.userExtractor], async (request, response, next) => {
  const body = request.body

  if(!request.token) {
    return response.status(401).json({error: 'token missing'})
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  console.log(request.token)

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes === undefined ? 0 : body.likes,
    "user": user._id
  })

  if(!blog.url | !blog.title) {
    response.status(400).send()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
  console.log("REQUEST USER: ", request.user)
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  console.log('poistettava blogi', blog)

  if(blog.user.toString() === user) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else
  {
    response.status(400).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
// ensimmäisellä updatella voi päivittää vain osan kohderesurssista -> pitäisi olla PATCHissa
  //  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {$set: request.body}, {new: true})

// korvataan kohderesurssi _kokonaan_ uudella
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  console.log("ID : ", request.params.id)
  console.log("BODY : ", request.body)
  response.json(updateBlog.toJSON())
})

module.exports = blogsRouter
