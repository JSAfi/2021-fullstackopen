const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
/*
blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
  })
*/
/*
blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if(blog) {
                response.json(blog.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
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
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes === undefined ? 0 : body.likes,
    "user": user._id
  })

/*  console.log("nyt blogahdus on: ", blog) */

  if(!blog.url | !blog.title) {
    response.status(400).send()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
// ensimmäisellä updatella voi päivittää vain osan kohderesurssista -> pitäisi olla PATCHissa
  //  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {$set: request.body}, {new: true})

// korvataan kohderesurssi _kokonaan_ uudella
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
