const config = require('./utils/config')

const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login')
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


// siirretään routeihin
//app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app