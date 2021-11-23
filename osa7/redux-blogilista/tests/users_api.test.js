const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
    {
        "username": "Mr Lova Lova",
        "user": "PeePee",
        "password": "tosisekretti"
    },
    {
        "username": "Shaggy Boombastic",
        "user": "shaggs",
        "password": "hoopo"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
})

describe('test Users post', () => {
    test('post wont add user with too short username', async () => {
        const newUser = {
            "username": "Sh",
            "user": "shaggs",
            "password": "hoopo"
        }
        await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(initialUsers.length)
    })
    test('post wont add if name already in db', async () => {
        const newUser = {
            "username": "Shaggy Boombastic",
            "name": "joulupukki mayne",
            "password": "hail satan"
        }
        await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(initialUsers.length)                
    })
})

describe('test Users get', () => {
    test('user get all', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(2)
    })
})

afterAll(() => {
    mongoose.connection.close()
})