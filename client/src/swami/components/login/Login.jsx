import {connect} from 'react-redux'
import LoginView from "./LoginView";
import {push} from 'connected-react-router'
import {LoginService} from '../../api'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  const loginService = new LoginService()
  return {
    login: (user) => {
      return loginService.login(user.email, user.password).then((data) => {
        window.localStorage.setItem('auth-token', data.token)
        // dispatch(updateUser(data))
        dispatch(push('/teams'))
      }).catch( (e) => {
        console.log('there was an error logging in', e)
      })
    }
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView)

export default Login