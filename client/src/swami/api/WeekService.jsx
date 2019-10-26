import Api from './Api'

class WeekService {

  api

  constructor() {
    this.api = new Api()
  }

  currentWeek = () => {
    return this.api.get('/weeks/current')
  }

  list = () => {
    return this.api.get('/weeks')
  }

  loadGames = (id) => {
    return this.api.get(`/games/${id}`)
  }

  saveGame = (game)  => {
    return this.api.post('/games', game)
  }
}


export default WeekService