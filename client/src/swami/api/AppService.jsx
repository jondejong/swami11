import Api from './Api'

class AppService {
  api

  constructor() {
    this.api = new Api()
  }

  loggedInUser = () => {
    console.log('fetching logged in user')
    return this.api.get(`/users/logged_in`)
  }

}

export default AppService