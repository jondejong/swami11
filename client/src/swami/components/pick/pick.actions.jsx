const LOAD_USER_WEEK = 'LOAD_USER_WEEK'

// watches
const TOGGLE_WATCH_FOR_GAME = 'TOGGLE_WATCH_FOR_GAME'
const UNWATCH_GAME = 'UNWATCH_GAME'

// selections
const TOGGLE_SELECTION_FOR_GAME = 'TOGGLE_SELECTION_FOR_GAME'
const UNSELECT_GAME = 'UNSELECT_GAME'


const loadUserWeek = (userWeek) => {
  return {
    type: LOAD_USER_WEEK,
    userWeek: userWeek
  }
}

const toggleWatchForGame = (gameId, favorite) => {
  return {
    type: TOGGLE_WATCH_FOR_GAME,
    gameId: gameId,
    favorite: favorite
  }
}

const unwatchGame = (gameId, favorite) => {
  return {
    type: UNWATCH_GAME,
    gameId: gameId,
    favorite: favorite
  }
}

const toggleSelectionForGame = (gameId, favorite) => {
  return {
    type: TOGGLE_SELECTION_FOR_GAME,
    gameId: gameId,
    favorite: favorite
  }
}

const unselectGame = (gameId, favorite) => {
  return {
    type: UNSELECT_GAME,
    gameId: gameId,
    favorite: favorite
  }
}

export {
  LOAD_USER_WEEK, TOGGLE_WATCH_FOR_GAME, UNWATCH_GAME, TOGGLE_SELECTION_FOR_GAME, UNSELECT_GAME,
  loadUserWeek, toggleWatchForGame, unwatchGame, toggleSelectionForGame, unselectGame
}