const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const mongoose = require('mongoose')

//const Blog = require('./models/blog.js')

const morgan = require('morgan')

morgan.token('body', function getBody(req){
    return JSON.stringify(req.body)
  })
  
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))  

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to mongoDB')
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app