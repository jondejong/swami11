import { SET_MESSAGE, CLEAR_MESSAGE } from './message.actions'

const initialState = {
  message: '',
  type: '',
  visible: false
}

function messageStore(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {

    case SET_MESSAGE:
      newState = {
        ...state,
        message: action.message.message,
        type: action.message.type,
        visible: true
      }
      break

    case CLEAR_MESSAGE:
      newState = {
        ...state,
        message: '',
        type: '',
        visible: false
      }
      break

    default:
      break

  }

  return newState
}

export default messageStore