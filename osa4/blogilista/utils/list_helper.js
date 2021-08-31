const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const lkm = blogs.reduce((acc, curr) => {
        return acc + curr['likes']
    }, 0)

    return lkm
}

module.exports = {
    dummy,
    totalLikes
}