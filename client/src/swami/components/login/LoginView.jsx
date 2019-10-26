import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class LoginView extends React.Component {

  constructor(props) {
    super(props)
    this.emptyState = {
      user: {
        email: 'jonny@test.com',
        password: 'Password1'
      }
    }
    this.state = this.emptyState
  }

  save = ()=> {
    this.props.login(this.state.user)
  }

  handleChange = (event, objectName, field) => {
    let newObject = {...this.state[objectName]}
    newObject[field] = event.target.value

    let newState = {}
    newState[objectName] = newObject
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Email"
          floatingLabelText="Email"
          value={this.state.user.email}
          onChange={(e)=> this.handleChange(e, 'user', 'email')}
        /><br />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type='password'
          value={this.state.user.password}
          onChange={(e)=> this.handleChange(e, 'user', 'password')}
        /><br />
        <RaisedButton label="Login" primary={true} onClick={this.save}/>

      </div>
    )
  }
}

export default LoginView