import Api from './Api'

class TeamService {

  api

  constructor() {
    this.api = new Api()
  }

  list = () => {
    return this.api.get('/teams')
  }

  load = (id) => {
    return this.api.get(`/team/${id}`)
  }
}


export default TeamService