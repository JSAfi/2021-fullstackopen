const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const existingUsers = await User.find({})
    console.log(existingUsers.find(search => search.username === body.username))
 
    if(body.password.length<3) {
        response.status(400).end()
    } else if(body.username.length<3) {
        response.status(400).end()
    } else if(existingUsers.find(search => search.username === body.username)) {
        console.log('Username on jo kannassa!')
        response.status(400).end()
    } else {
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter