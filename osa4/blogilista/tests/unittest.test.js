const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
}) 

describe('total likes', () => {
    const listWithSomeBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f0',
          title: 'Honkytonk Badonkadonks',
          author: 'Dorkydork Dingledong',
          url: 'http://www.google.com/finance',
          likes: 55,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 55,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 0,
            __v: 0
          }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithSomeBlogs)
        expect(result).toBe(115)
    })
})

describe('favorite blog', () => {
    const listWithSomeBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f0',
          title: 'Honkytonk Badonkadonks',
          author: 'Dorkydork Dingledong',
          url: 'http://www.google.com/finance',
          likes: 55,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 155,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 0,
            __v: 0
          },
          {
            _id: '5b422bb71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 235,
            __v: 0
          }
    ]

    test('return the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithSomeBlogs)
        const expected = {
            _id: '5b422bb71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 235,
            __v: 0
          }

        expect(result).toEqual(expected)
    })
})

describe('author with most blogs', () => {
    const listWithSomeBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f1',
          title: 'Honkytonk Badonkadonks',
          author: 'Dorkydork Dingledong',
          url: 'http://www.google.com/finance',
          likes: 55,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 155,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Honkytonk Badonkadonks',
            author: 'Dorkydork Dingledong',
            url: 'http://www.google.com/finance',
            likes: 0,
            __v: 0
          },
          {
            _id: '5b422bb71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'KingKong PingPong',
            url: 'http://www.google.com/finance',
            likes: 235,
            __v: 0
          },
          {
            _id: '5b422bb71b54a676234d17f0',
            title: 'Honkytonk Badonkadonks',
            author: 'RamaLama DingDong',
            url: 'http://www.google.com/finance',
            likes: 2,
            __v: 0
          }
    ]

    test('return the author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithSomeBlogs)
        const expected = {
            author: 'Dorkydork Dingledong',
            blogs: 3
          }

        expect(result).toEqual(expected)
    })
})