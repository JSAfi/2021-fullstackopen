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
    return ""
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}