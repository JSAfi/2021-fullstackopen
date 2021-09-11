const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "Häpödi Skäpödi",
        "author": "Mr. Boombastic",
        "url": "www.kajaani.fi",
        "likes": 1000
    },
    {
        "title": "Hail Satan",
        "author": "Devil Herself",
        "url": "www.prkl.fi",
        "likes": 666
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('test48 first test', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('test49 id field is named correctly', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    expect(response.body[0].id).toBeDefined()
})

test('test410 adding blogs with http post works', async () => {
    const testBlog = {
        "title": "Greatest Calorie Bombs",
        "author": "Fatty BoomBatty",
        "url": "www.mantangrilli.fi",
        "likes": 100
    }

    await api 
        .post('/api/blogs')
        .send(testBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')    

    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})