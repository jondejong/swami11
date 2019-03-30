import React from "react";
import GameList from './GameList'

class WeekSelectorView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {week: this.getWeekFromProps(props)}
  }

  componentDidMount = () => {
    this.props.loadWeeks()
    this.setState({week: this.getWeekFromProps(this.props)})
    this.props.loadGames(this.getWeekFromProps(this.props))
    this.props.loadTeams()
  }

  getWeekFromProps(props) {
    return props.match.params.week === 'current' ? 1 : props.match.params.week
  }

  getCurrentWeek = () => {
    // TODO: Figure this out
    return this.getWeekFromProps(this.props)
  }

  render() {
    const {games, teams, saveGame} = this.props
    return (
      <div>
        Hello Week Selector
        <GameList games={games} week={this.state.week} teams={teams} save={saveGame}/>
      </div>
    )
  }
}

export default WeekSelectorView