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
/*     const blog = new Blog(request.body)
  
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
    "likes": body.likes
  })

  if(!blog.likes) {
    console.log("postissa blogilla tykkäyksiä:: ", blog.likes)
    blog.likes = 0
  }

  console.log("nyt blogahdus on: ", blog)

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

module.exports = blogsRouter
