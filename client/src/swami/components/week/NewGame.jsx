import React from "react";

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'

import Checkbox from 'material-ui/Checkbox'
import ActionHome from 'material-ui/svg-icons/action/home'

const FAVORITE = 'FAVORITE'
const UNDERDOG = 'UNDERDOG'

class NewGame extends React.Component {

  blankGame = {
    spread: 0,
    week: this.props.week,
    day: 'TUESDAY',
    "favoriteId" : null,
    "favoriteIsHome" : true,
    "underdogId" : null,
    "underdogIsHome" : false
  }

  styles = {
    block: {
      paddingLeft: 25,
      maxWidth: 250,
      textAlign: 'left'
    },
    checkbox: {
      marginBottom: 16
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      newGame: this.blankGame
    }
  }

  handleHomeClick = (event, team) => {
    this.setState({
      ...this.state,
      newGame: {
        ...this.state.newGame,
        favoriteIsHome: team === FAVORITE,
        underdogIsHome: team === UNDERDOG
      }
    })
  }

  handleSpreadChange = (event) => {
    this.setState({
      ...this.state,
      newGame: {
        ...this.state.newGame,
        spread: event.target.value
      }
    })
  }

  handleFavoriteSelection = (text, array, p) => {
    if(p.source === 'click') {
      const favorites = this.props.teams.filter( team => {
        return this.props.teamName(team) === text
      })
      const newGame = {
        ...this.state.newGame,
        favoriteId: favorites[0].id
      }
      this.setState({newGame: newGame})
    }
  }

  handleUnderdogSelection = (text, array, p) => {
    if(p.source === 'click') {
      const underdogs = this.props.teams.filter( team => {
        return this.props.teamName(team) === text
      })
      const newGame = {
        ...this.state.newGame,
        underdogId: underdogs[0].id
      }
      this.setState({newGame: newGame})
    }
  }

  save = () => {
    this.props.save(this.state.newGame)
  }

  cancel = () => {
    this.setState({newGame: this.blankGame})
    this.props.cancel()
  }

  render () {
    const {teams, teamName, cancel} = this.props

    const teamNames = teams.map( team => teamName(team))

    return (
      <div style={this.styles.block}>
        <AutoComplete
          floatingLabelText="Favorite"
          filter={AutoComplete.fuzzyFilter}
          dataSource={teamNames}
          maxSearchResults={5}
          onUpdateInput={this.handleFavoriteSelection}
        />

        <Checkbox
          checkedIcon={<ActionHome />}
          label="Home?"
          labelPosition="left"
          checked={this.state.newGame.favoriteIsHome}
          style={this.styles.checkbox}
          onCheck={(e) => this.handleHomeClick(e, FAVORITE)}
        />

        <br/>
        <TextField
          hintText="Spread"
          floatingLabelText="Spread"
          type='number'
          value={this.state.newGame.spread}
          onChange={this.handleSpreadChange}
        />
        <br/>
        <AutoComplete
          floatingLabelText="Underdog"
          filter={AutoComplete.fuzzyFilter}
          dataSource={teamNames}
          maxSearchResults={5}
          onUpdateInput={this.handleUnderdogSelection}
        />
        <Checkbox
          checkedIcon={<ActionHome />}
          label="Home?"
          labelPosition="left"
          checked={this.state.newGame.underdogIsHome}
          style={this.styles.checkbox}
          onCheck={(e) => this.handleHomeClick(e, UNDERDOG)}
        />
        <br/>
        <RaisedButton label="Cancel" primary={false} onClick={cancel}/>
        <RaisedButton label="Save" primary={true} onClick={this.save}/>
      </div>
    )
  }

}

export default NewGame