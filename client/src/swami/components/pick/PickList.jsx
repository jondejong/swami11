import {connect} from 'react-redux'
import PickListView from './PickListView'
import UserWeekService from '../../api/UserWeekService'
import {handleError} from '../message'
import {
  loadUserWeek,
  toggleWatchForGame,
  unwatchGame,
  toggleSelectionForGame,
  unselectGame
} from './pick.actions'

const userWeekService = new UserWeekService()

const mapStateToProps = (state) => {
  return {
    week: state.swamiApp.rootDataStore.week,
    userWeek: state.swamiApp.userWeekStore.userWeek,
    loaded: state.swamiApp.userWeekStore.loaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserWeek: (week) => {
      userWeekService.list(week).then((userWeek) => {
        dispatch(loadUserWeek(userWeek))
      }).catch((error) => {
        dispatch(handleError(error))
      })
    },

    toggleWatchedGame: (gameId, favorite, games) => {
      const game = games.find(g => g.id === gameId)
      if(favorite) {
        if(game.favoriteIsWatched) {
          dispatch(unwatchGame(gameId, favorite))
          userWeekService.removeWatch(game.favoriteId)
        } else {
          dispatch(toggleWatchForGame(gameId, favorite))
          userWeekService.watch(game.favoriteId)
          userWeekService.removeWatch(game.underdogId)
        }
      } else {
        if(game.underdogIsWatched) {
          dispatch(unwatchGame(gameId, favorite))
          userWeekService.removeWatch(game.underdogId)
        } else {
          dispatch(toggleWatchForGame(gameId, favorite))
          userWeekService.watch(game.underdogId)
          userWeekService.removeWatch(game.favoriteId)
        }
      }
    },

    toggleSelectedGame: (gameId, favorite, games) => {
      const game = games.find(g => g.id === gameId)
      if(favorite) {
        if(game.favoriteIsSelected) {
          dispatch(unselectGame(gameId, favorite))
          userWeekService.removeSelection(game.favoriteId)
        } else {
          dispatch(toggleSelectionForGame(gameId, favorite))
          userWeekService.select(game.favoriteId)
          userWeekService.removeSelection(game.underdogId)
        }
      } else {
        if(game.underdogIsSelected) {
          dispatch(unselectGame(gameId, favorite))
          userWeekService.removeSelection(game.underdogId)
        } else {
          dispatch(toggleSelectionForGame(gameId, favorite))
          userWeekService.select(game.underdogId)
          userWeekService.removeSelection(game.favoriteId)
        }
      }
    }

  }
}

const PickList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PickListView)

export default PickList