const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const lkm = blogs.reduce((acc, curr) => {
        return acc + curr['likes']
    }, 0)

    return lkm
}

const favoriteBlog = (blogs) => {
    let maxLikes = -1
    let storedIndex = 0
    let i = 0
    for(const index of blogs.values()) {
//        console.log('now at ', i, ' where there are ', index.likes, ' likes')
        if (index.likes > maxLikes) {
            maxLikes = index.likes
            storedIndex = i
        }
        i++
//        console.log('i\'ve got max likes at ', storedIndex, ' with ', maxLikes, ' likes')
    }
    return blogs[storedIndex]
}

const mostBlogs = (blogs) => {
    
    const counts = lodash.countBy(blogs, "author")

    const orderedList = lodash.orderBy(lodash.toPairs(counts), 1, 'desc')

    const topBlogger = orderedList[0]

    const result = {
        "author": topBlogger[0],
        "blogs": topBlogger[1]
    }

//    console.log(orderedList)
//    console.log('so the top blogger is ', topBlogger[0], ' who has ', topBlogger[1], ' blogs')

    return result
}

const mostLikes = (blogs) => {

    const groups = lodash.groupBy(blogs, "author")

    const sum = lodash(groups).map((obj, key) => ({
        'author': key,
        'likes': lodash.sumBy(obj, 'likes')
    }))
    .value()

    const orderedList = lodash.orderBy(sum, 'likes', 'desc')

    console.log(orderedList)

    const returnValue = {
        "author": orderedList[0].author,
        "likes": orderedList[0].likes
    }
    return returnValue
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}