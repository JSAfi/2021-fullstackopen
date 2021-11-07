export const setNotification = (notificationText, time) => {
    return async dispatch => {
        const timeoutID = setTimeout(() => dispatch(clearNotification()), time*1000)
        dispatch({
            type: 'SETNOTE',
            data: { 
                notificationText,
                timeoutID
             }   
        })
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEARNOTE',
        data: null
    }
}

const initialState = {notificationText: "", timeoutID: -1}

const notificationReducer = (state = initialState, action) => {
    console.log("notificationReducer action ", action)
    console.log('notificationReducer state ', state)
    switch(action.type) {
        case 'SETNOTE':
            console.log('clearing timeout ', state.timeoutID)
            clearTimeout(state.timeoutID)
            console.log('action type case')
            return ({ notificationText: action.data.notificationText, timeoutID: action.data.timeoutID })
        case 'CLEARNOTE':
            return initialState
        default: 
            return state
    }
}

export default notificationReducer