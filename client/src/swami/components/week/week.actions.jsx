const LOAD_WEEKS = 'LOAD_WEEKS'
const LOAD_GAMES = 'LOAD_GAMES'

const loadWeeks = (weeks) => {
  return {
    type: LOAD_WEEKS,
    weeks: weeks
  }
}

const loadGames = (games) => {
  return {
    type: LOAD_GAMES,
    games: games
  }
}

export {
  LOAD_WEEKS, LOAD_GAMES,
  loadWeeks, loadGames
}
