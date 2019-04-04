import { GET_BODY_DATA_SUCCESS } from './action'

const initialState = {
  value: ''
}

const bodyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BODY_DATA_SUCCESS: {
      return {
        ...state,
        value: action.value
      }
    }
    default:
      return state
  }
}

export default bodyReducer