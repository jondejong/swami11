import {connect} from 'react-redux'

import TeamListView from './TeamListView'
import {TeamService} from '../../api'
import {loadTeams} from './team.actions'
import {handleError} from '../message'

const mapStateToProps = (state) => {
  return {
    teams: state.swamiApp.teamStore.teams,
    loaded: state.swamiApp.teamStore.loaded
  }
}

const mapDispatchToProps = (dispatch) => {
  const teamService = new TeamService()
  return {
    loadTeams: () => {
      teamService.list().then((data) => {
        dispatch(loadTeams(data))
      }).catch( (error) => {
        dispatch(loadTeams([]))
        dispatch(handleError(error))
      })
    }
  }
}

const TeamList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamListView)

export default TeamList