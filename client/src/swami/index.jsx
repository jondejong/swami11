import { combineReducers } from 'redux'
import {messageStore, teamStore, weekStore, userWeekStore, rootDataStore} from './components'

const swamiApp = combineReducers({
  rootDataStore,
  teamStore,
  messageStore,
  weekStore,
  userWeekStore
})

export default swamiApp
export * from './components'