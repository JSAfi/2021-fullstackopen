const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {...initialState, good: initialState.good + 1}
      return newState
    case 'OK':
      const newOkState = {...initialState, ok: initialState.ok + 1}
      return newOkState
    case 'BAD':
      const newBadState = {...initialState, bad: initialState.bad +1}
      return newBadState
    case 'ZERO':
      return 0
    default: return state
  }
  
}

export default counterReducer