const LOAD_TEAMS = 'LOAD_TEAMS'

const loadTeams = (teams) => {
  return {type: LOAD_TEAMS, teams: teams}
}

export {
  LOAD_TEAMS,
  loadTeams
}
