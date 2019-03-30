import { LOAD_TEAMS } from './team.actions'

const intialState = {
  teams: [],
  loaded: false
}

function teamStore(state = intialState, action) {
  let newState = {...state}
  switch (action.type) {

    case LOAD_TEAMS:
      newState = {
        ...state,
        teams: action.teams,
        loaded: true
      }
      break

    default:
      break

  }

  return newState
}

export default teamStore