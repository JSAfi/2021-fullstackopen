const notificationAtStart = ['Initial notification to begin with!']

const notificationReducer = (state = 'INIT', action) => {
    console.log(action)
    switch(action.type) {
        case 'INIT':
            console.log('action type case')
            return notificationAtStart[0]
        default: 
            return  notificationAtStart[0]
    }
}

export default notificationReducer