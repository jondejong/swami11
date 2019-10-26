import 'whatwg-fetch'

class Api {

  urlRoot
  user

  constructor() {
    if(window.location.hostname.indexOf('localhost') >= 0) {
      this.urlRoot = `http://localhost:5050`
    } else {
      this.urlRoot = `https://api.eswami.net`
    }

    this.user = this._getUserFromStorage()
  }

  _getUserFromStorage = () => {
    return window.localStorage.getItem('auth-token')
  }

  _getUser = () => {
    return this.user || this._getUserFromStorage()
  }

  _checkForErrors = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)
      error.status = response.status
      throw error
    }
  }

  _handleError = (error) => {
    if (error.status === 401 || error.status === 403) {
      let e = new Error('You are not authorized to access this')
      e.isAuth = true
      throw e
    } else {
      console.log('we have an error we need to deal with', error)
      throw error
    }
  }

  get = (url) => {
    return fetch(`${this.urlRoot}${url}`, {
      headers: this.getHeaders()
    }).then(this._checkForErrors)
      .then((response) => response.json())
      .catch(this._handleError)
  }

  post = (url, body) => {
    body = body || {}
    return fetch(`${this.urlRoot}${url}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    }).then(this._checkForErrors)
      .then((response) => response.json())
      .catch(this._handleError)
  }

  delete = (url, body) => {
    body = body || {}
    return fetch(`${this.urlRoot}${url}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    }).then(this._checkForErrors)
      .then((response) => response.json())
      .catch(this._handleError)
  }

  isLoggedIn() {
    return !!this._getUser
  }

  getHeaders() {
    return {
      'X-Auth-Token': `${this._getUser()}`,
      'Content-Type': 'application/json'
    }
  }

}

export default Api