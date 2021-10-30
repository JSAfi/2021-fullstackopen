export const updateFilter = (filterText) => {
    return {
        type: 'UPDATEFILTER',
        data: { filterText }
    }
}

const filterReducer = (state = null, action) => {
    console.log(action)
    switch(action.type) {
        case 'UPDATEFILTER':
            console.log('UPDATEFILTER: ', action.data.filterText)
            return action.data.filterText
        default: 
            return state
    }
}

export default filterReducer