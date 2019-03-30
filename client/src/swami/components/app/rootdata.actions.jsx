const LOAD_LOGGED_IN_USER = 'LOAD_LOGGED_IN_USER'
const LOAD_CURRENT_WEEK = 'LOAD_CURRENT_WEEK'

const loadLoggedInUser = (user) => {
  return {
    type: LOAD_LOGGED_IN_USER,
    user: user
  }
}

const loadCurrentWeek = (week) => {
  return {
    type: LOAD_CURRENT_WEEK,
    week: week
  }
}

export {
  LOAD_CURRENT_WEEK, LOAD_LOGGED_IN_USER,
  loadCurrentWeek, loadLoggedInUser
}