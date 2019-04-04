import { SET_HEADER_TEXT } from './action'

const initialState = {
  name: ''
}

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER_TEXT:
    return {
      ...state,
      name: action.name
    }
    default:
      return state
  }
}

export default headerReducer
