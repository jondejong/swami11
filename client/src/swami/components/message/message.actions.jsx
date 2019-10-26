const SET_MESSAGE = 'SET_MESSAGE'
const HANDLE_ERROR = 'HANDLE_ERROR'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

const MESSAGE_TYPES = {
  MESSAGE: 'MESSAGE',
  ERROR: 'ERROR',
  FATAL_ERROR: 'FATAL_ERROR'
}

const handleError = (error) => {
  return {
    type: SET_MESSAGE,
    message: {
      message: error.message,
      type: error.isAuth ? MESSAGE_TYPES.ERROR : MESSAGE_TYPES.FATAL_ERROR
    }
  }
}

const setMessage = (message, type) => {
  return {
    type: SET_MESSAGE,
    message: {
      message: message,
      type: type
    }
  }
}

const clearMessage = () => {
  return {type: CLEAR_MESSAGE}
}

export {
  MESSAGE_TYPES,
  SET_MESSAGE, HANDLE_ERROR, CLEAR_MESSAGE,
  setMessage, handleError, clearMessage

}