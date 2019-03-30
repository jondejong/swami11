  import {LOAD_WEEKS, LOAD_GAMES} from './week.actions'

const initialState = {
  weeks: [],
  games: [],
  weeksLoaded: false,
  gamesLoaded: false
}

function weekStore(state = initialState, action) {
  let newState = {...state}

  switch (action.type) {

    case LOAD_WEEKS:
      newState = {
        ...state,
        weeks: action.weeks,
        weeksLoaded: true
      }
      break

    case LOAD_GAMES:
      newState = {
        ...state,
        games: action.games,
        gamesLoaded: true
      }
      break

    default:
      break
  }

  return newState
}

export default weekStore