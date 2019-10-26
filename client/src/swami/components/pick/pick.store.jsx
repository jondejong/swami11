import {
  LOAD_USER_WEEK,
  TOGGLE_WATCH_FOR_GAME,
  UNWATCH_GAME,
  TOGGLE_SELECTION_FOR_GAME,
  UNSELECT_GAME
} from './pick.actions'

const initialState = {
  userWeek: {
    games: []
  },
  loaded: false
}

function userWeekStore(state = initialState, action) {
  let newState = {...state}
  let userWeek
  let game

  switch (action.type) {
    case LOAD_USER_WEEK:
      newState = {
        ...state,
        userWeek: action.userWeek,
        loaded: true
      }
      break

    case TOGGLE_WATCH_FOR_GAME:
      userWeek = {
        ...state.userWeek
      }
      game = userWeek.games.find(g => g.id === action.gameId)
      if (action.favorite) {
        game.favoriteIsWatched = true
        game.underdogIsWatched = false
      } else {
        game.favoriteIsWatched = false
        game.underdogIsWatched = true
      }
      newState.userWeek = userWeek

      break

    case UNWATCH_GAME:
      userWeek = {
        ...state.userWeek
      }
      game = userWeek.games.find(g => g.id === action.gameId)
      if (action.favorite) {
        game.favoriteIsWatched = false
      } else {
        game.underdogIsWatched = false
      }
      newState.userWeek = userWeek
      break

    case TOGGLE_SELECTION_FOR_GAME:
      userWeek = {
        ...state.userWeek
      }
      game = userWeek.games.find(g => g.id === action.gameId)
      if (action.favorite) {
        game.favoriteIsSelected = true
        game.underdogIsSelected = false
      } else {
        game.favoriteIsSelected = false
        game.underdogIsSelected = true
      }
      newState.userWeek = userWeek
      break

    case UNSELECT_GAME:
      userWeek = {
        ...state.userWeek
      }
      game = userWeek.games.find(g => g.id === action.gameId)
      if (action.favorite) {
        game.favoriteIsSelected = false
      } else {
        game.underdogIsSelected = false
      }
      newState.userWeek = userWeek
      break

    default:
      break
  }

  return newState
}

export default userWeekStore
