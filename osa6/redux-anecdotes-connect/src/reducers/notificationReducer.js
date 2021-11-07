export const setNotification = (notificationText, time) => {
    return async dispatch => {
        dispatch({
            type: 'SETNOTE',
            data: { notificationText }   
        })
        setTimeout(() => dispatch(clearNotification()), time*1000)
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