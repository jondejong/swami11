import {connect} from 'react-redux'
import WeekSelectorView from './WeekSelectorView'
import {TeamService, WeekService} from '../../api'
import {loadWeeks, loadGames} from './week.actions'
import {handleError} from '../message'
import {loadTeams} from '../team/team.actions'

const weekService = new WeekService()
const teamService = new TeamService()

const mapStateToProps = (state) => {
  return {
    teams: state.swamiApp.teamStore.teams,
    weeks: state.swamiApp.weekStore.weeks,
    weeksLoaded: state.swamiApp.weekStore.weeksLoaded,
    games: state.swamiApp.weekStore.games,
    gamesLoaded: state.swamiApp.weekStore.gamesLoaded
  }
}

const loadGamesForWeek = (dispatch) => {
  return (week) => {
    weekService.loadGames(week).then((games) => {
      dispatch(loadGames(games))
    }).catch((error) => {
      dispatch(loadGames([]))
      dispatch(handleError(error))
    })
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    loadWeeks: () => {
      weekService.list().then((weeks) => {
        dispatch(loadWeeks(weeks))
      }).catch( (error) => {
        dispatch(loadWeeks([]))
        dispatch(handleError(error))
      })
    },

    loadGames: loadGamesForWeek(dispatch),

    loadTeams: () => {
      teamService.list().then((data) => {
        dispatch(loadTeams(data))
      }).catch( (error) => {
        dispatch(loadTeams([]))
        dispatch(handleError(error))
      })
    },

    saveGame: (game) => {
      weekService.saveGame(game).then(() => {
        loadGamesForWeek(dispatch)(game.week)
      }).catch( (error) => {
        dispatch(handleError(error))
      })
    }
  }
}

const WeekSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekSelectorView)

export default WeekSelector