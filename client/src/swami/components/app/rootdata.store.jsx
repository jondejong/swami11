import {
  LOAD_LOGGED_IN_USER,
  LOAD_CURRENT_WEEK
} from './rootdata.actions'

const initialState = {
  week: {
    number: 0,
    started: false,
    locked: false,
    completed: false
  }

}

function rootDataStore(state =  initialState, action) {
  let newState = {...state}

  switch (action.type) {
    case LOAD_CURRENT_WEEK:
      newState.week = action.week
      break

    case LOAD_LOGGED_IN_USER:
      newState.loggedInUser = action.user
      break

    default:
      break
  }

  return newState
}

export default rootDataStore