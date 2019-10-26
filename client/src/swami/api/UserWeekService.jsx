import Api from './Api'

class UserWeekService {

  api

  constructor() {
    this.api = new Api()
  }

  list = (week) => {
    return this.api.get(`/userweeks/${week}`)
  }

  watch = (selectionId) => {
    return this.api.post(`/userweeks/watched`, {selection: selectionId})
  }

  removeWatch = (selectionId) => {
    return this.api.delete(`/userweeks/watched`, {selection: selectionId})
  }

  select = (selectionId) => {
    return this.api.post(`/userweeks/selected`, {selection: selectionId})
  }

  removeSelection = (selectionId) => {
    return this.api.delete(`/userweeks/selected`, {selection: selectionId})
  }
}

export default UserWeekService