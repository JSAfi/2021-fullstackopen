const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('test48 first test', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('test49 id field is named correctly', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})