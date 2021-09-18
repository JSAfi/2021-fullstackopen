const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
  })

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

blogsRouter.post('/', async (request, response, next) => {
/*  
* Tämä jätetty muistutuksena vanhasta tavasta !   
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
//        console.log(result.map(blog => blog.toJSON()))
        response.status(201).json(result)
      })
  */
  const body = request.body

  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes | 0
  })

  console.log("nyt blogahdus on: ", blog)

  if(!blog.url | !blog.title) {
    response.status(400).send()
  } else {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {$set: request.body}, {new: true})
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
