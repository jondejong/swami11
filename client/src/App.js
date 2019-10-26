import React, {Component} from 'react'
import './App.css';
import {TeamList} from './swami'
import {Route} from 'react-router'
import {Alert, RootData, Navigation, Login, WeekSelector, PickList} from './swami/components'
import Api from "./swami/api/Api";

class App extends Component {

  rootPath = () => {
    return `/${this.props.location.pathname.split('/')[1]}`
  }

  api = new Api()

  render() {

    console.log('rendering app')

    const rootData = this.api.isLoggedIn() ?
      <RootData/> :
      <div></div>

    return (
      <div className="App">
        {rootData}
        <Navigation path={this.rootPath()}/>
        <Alert/>
        <Route name="team" path="/teams" component={TeamList}/>
        <Route name="picks" path="/picks" component={PickList}/>
        <Route name="weeks" path="/weeks/:week" component={WeekSelector}/>
        <Route name="login" path="/login" component={Login}/>
      </div>
    )
  }
}

export default App;