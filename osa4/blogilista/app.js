const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to mongoDB')
    })

app.use(cors())
app.use(express.json())

// Käytän toistaiseksi mielummin morgania tässä
morgan.token('body', function getBody(req){
    return JSON.stringify(req.body)
  })
  
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))  

//app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app