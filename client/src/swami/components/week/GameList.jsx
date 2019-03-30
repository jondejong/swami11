import React from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import FontIcon from 'material-ui/FontIcon'
import NewGame from './NewGame'

class GameList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addNewTeamRow: false,
      newGame: {
        spread: 0
      }
    }
  }

  iconStyle = {
    cursor: 'pointer'
  }

  rowIconStyle = {
    verticalAlign: 'middle',
    marginRight: '5px'
  }

  addNewTeamRow = () => {
    this.setState({addNewTeamRow: true})
  }

  save = (game) => {
    this.props.save(game)
    this.setState({addNewTeamRow: false})
  }

  cancel = () => {
    this.setState({addNewTeamRow: false})
  }

  teamName = (team) => {
    return `${team.name} ${team.nickName}`
  }

  render() {
    const {games, week, teams} = this.props

    const rows = games.length === 0 ?
      '' :
      games.map(game => {

        const favoriteHome = game.favoriteIsHome ? (<FontIcon className="material-icons" style={this.rowIconStyle}>home</FontIcon>) : ''
        const underDogHome = game.underdogIsHome ? <FontIcon className="material-icons" style={this.rowIconStyle}>home</FontIcon> : ''

        return (
          <TableRow key={game.id} style={this.inputStyle}>
            <TableRowColumn>
              <FontIcon className="material-icons" style={this.iconStyle}>mode_edit</FontIcon>
            </TableRowColumn>
            <TableRowColumn>{favoriteHome} {game.favoriteName} {game.favoriteNickName}</TableRowColumn>
            <TableRowColumn>{game.spread}</TableRowColumn>
            <TableRowColumn>{underDogHome} {game.underdogName} {game.underdogNickName}</TableRowColumn>
          </TableRow>
        )
    })

    const newGame = this.state.addNewTeamRow ?
      <NewGame
        teams={teams}
        teamName={this.teamName}
        save={this.save}
        cancel={this.cancel}
        week={week}
        />
      : ''

    const newGameButton = this.state.addNewTeamRow ? '' :
      <FontIcon
        onClick={this.addNewTeamRow}
        className="material-icons"
        style={this.iconStyle}>
        add
      </FontIcon>

    return (
      <div>
        <h3>Games for {week}</h3>
        {newGame}
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>{newGameButton}</TableHeaderColumn>
              <TableHeaderColumn>Favorite</TableHeaderColumn>
              <TableHeaderColumn>Spread</TableHeaderColumn>
              <TableHeaderColumn>Underdog</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default GameList