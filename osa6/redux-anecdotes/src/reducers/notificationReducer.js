const notificationAtStart = 'Initial notification to begin with!'

export const setNotification = (notificationText) => {
    return {
        type: 'SETNOTE',
        data: { notificationText }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEARNOTE',
        data: null
    }
}

const notificationReducer = (state = null, action) => {
    console.log(action)
    switch(action.type) {
        case 'SETNOTE':
            console.log('action type case')
            return action.data.notificationText
        case 'CLEARNOTE':
            console.log('clearing note')
            return null
        default: 
            return state
    }
}

export default notificationReducer