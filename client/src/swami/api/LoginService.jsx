import Api from './Api'

class LoginService {

  constructor() {
    this.api = new Api()
  }

  login = (email, password) => {
    return this.api.post('/login', {email, password})
  }

}

export default LoginService