import React from "react";
import {connect} from "react-redux";
import {loadCurrentWeek, loadLoggedInUser} from "./rootdata.actions"
import {AppService, WeekService} from './../../api'
import {handleError} from "../message";

const appService = new AppService()
const weekService = new WeekService()

class RootData extends React.Component {
  componentDidMount = () => {
    console.log('RootData Mounted')
    this.props.loadLoggedInUser()
    // this.props.loadCurrentWeek()
  }

  render() {
    return <div/>
  }

}

RootData = connect(
  () => {
    return {}
  },
  (dispatch) => {
    return {
      loadCurrentWeek: () => {
        weekService.currentWeek().then(week => {
          dispatch(loadCurrentWeek(week))
        }).catch((error) => {
          dispatch(handleError(error))
        })
      },
      loadLoggedInUser: () => {
        appService.loggedInUser().then(user => {
          console.log('dispatching logged in user')
          dispatch(loadLoggedInUser(user))
        }).catch((error) => {
          console.log('handling error getting logged in user')
          dispatch(handleError(error))
        })
      }
    }
  }

)(RootData)

export default RootData