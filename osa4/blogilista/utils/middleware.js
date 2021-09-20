const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}
  
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
}
  
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = (request, response, next) => {

  const token = request.token

  console.log("TOKEN", token)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  console.log("DECODED TOKEN", decodedToken)

  request.user = decodedToken.id.toString()

  next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}