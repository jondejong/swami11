import React from 'react'

import FontIcon from 'material-ui/FontIcon'

import PanoramaFishEye from 'material-ui/svg-icons/image/panorama-fish-eye'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'

import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

import {GridList, GridTile} from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'

class PickListView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      week: -1,
      filterWatched: false,
      filterSelected: false,
      filterText: ''
    }
  }

  changeWeek = (week) => {
    this.setState({week: week})
    this.props.loadUserWeek(week)
  }

  // componentDidUpdate = () => {
  //   //Use current week if a week has not been asked for yet
  //   if(this.state.week === -1) {
  //     const week = this.props.week.number
  //     if(this.state.week !== week &&  week > 0) {
  //       this.changeWeek(week)
  //     }
  //   }
  // }

  styles = {
    icon: {
      cursor: 'pointer'
    },
    checkbox: {
      // marginBottom: 16
    },
    filterCheckbox: {
      marginTop: 16
    },
    filterInput: {
      maxWidth: 350,
      minWidth: 220
      // paddingTop: 48
      // marginBottom: 24
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    gridList: {
      width: 600,
      height: 450,
      padding: '6px'
    },
    header: {
      fontSize: 11,
      textAlign: 'left',
      overflow: 'auto',
      whiteSpace: 'normal',
    },
    box: {
      outline: 'solid'
    },
    rowIconStyle: {
      verticalAlign: 'middle',
      marginRight: '5px'
    },
    content: {
      fontSize: 12
    },
    inline: {
      display: 'inline'
    },
    row: {
      display: 'flex',
      flexDirection: 'row'
    }
  }

  toggleWatch = (gameId, favorite) => {
    this.props.toggleWatchedGame(gameId, favorite, this.props.userWeek.games)
  }

  toggleSelection = (gameId, favorite) => {
    this.props.toggleSelectedGame(gameId, favorite, this.props.userWeek.games)
  }

  toggleWatchFilter = () => {
    this.setState({
      filterWatched: !this.state.filterWatched
    })
  }

  toggleSelectedFilter = () => {
    this.setState({
      filterSelected: !this.state.filterSelected
    })
  }

  updateFilterText = (e) => {
    this.setState({
      filterText: e.target.value
    })
  }

  render() {
    const {loaded, userWeek} = this.props
    const {filterWatched, filterSelected, filterText} = this.state

    const loadingDiv = <div>Loading...</div>

    if(!loaded) {
      return loadingDiv
    }

    // Apply all filters
    const viewableGames = userWeek.games.filter((game) => {
      let show = true

      if(filterWatched) {
        show = game.favoriteIsWatched || game.underdogIsWatched
      }

      if(filterSelected) {
        show = show && (game.favoriteIsSelected || game.underdogIsSelected)
      }

      if(filterText) {
        const key = `${game.favoriteName} ${game.favoriteNickName} ${game.underdogName} ${game.underdogNickName} ${game.spread}`.toUpperCase()
        show = show && key.includes(filterText.toUpperCase())
      }

      return show
    })

    const tiles = viewableGames.map(game => {
      const home = game.favoriteIsHome ?
        `${game.favoriteName} ${game.favoriteNickName}` :
        `${game.underdogName} ${game.underdogNickName}`

      const away = game.underdogIsHome ?
        `${game.favoriteName} ${game.favoriteNickName}` :
        `${game.underdogName} ${game.underdogNickName}`

      const fav = game.favoriteIsHome ? 'underdog' : `favorite`

      const title = `${away} is a ${game.spread} point ${fav} at ${home}`
      const titleNode = <div style={this.styles.header}>{title}</div>

      const favoriteHome = game.favoriteIsHome ? (<FontIcon className="material-icons" style={this.styles.rowIconStyle}>home</FontIcon>) : ''
      const underDogHome = game.underdogIsHome ? <FontIcon className="material-icons" style={this.styles.rowIconStyle}>home</FontIcon> : ''

      const content =
        <div style={this.styles.content}>
          <div style={this.styles.row}>
            <Checkbox
              checkedIcon={<RemoveRedEye />}
              uncheckedIcon={<PanoramaFishEye />}
              label='Watch'
              checked={game.favoriteIsWatched}
              style={this.styles.checkbox}
              onCheck={() => this.toggleWatch(game.id, true)}
            />
            <Checkbox
              label='Select'
              checked={game.favoriteIsSelected}
              style={this.styles.checkbox}
              onCheck={() => this.toggleSelection(game.id, true)}
            />
          </div>
          {game.favoriteName} {game.favoriteNickName} {favoriteHome}
          <br/>
          {game.spread} Points
          <br/>
          {game.underdogName} {game.underdogNickName} {underDogHome}
          <div style={this.styles.row}>
            <Checkbox
              checkedIcon={<RemoveRedEye />}
              uncheckedIcon={<PanoramaFishEye />}
              label='Watch'
              checked={game.underdogIsWatched}
              style={this.styles.checkbox}
              onCheck={() => this.toggleWatch(game.id, false)}
            />
            <Checkbox
              checked={game.underdogIsSelected}
              label='Select'
              style={this.styles.checkbox}
              onCheck={() => this.toggleSelection(game.id, false)}
            />
          </div>
        </div>

      return (
        <GridTile
          style={this.styles.box}
          key={game.id}
          title={titleNode}
        >
          {content}
        </GridTile>
      )
    })

    return (
      <div style={this.styles.root}>
        <div style={this.styles.row}>
          <Checkbox
            style={this.styles.filterCheckbox}
            label='Watched'
            checked={this.state.filterWatched}
            onCheck={this.toggleWatchFilter}
          />
          <Checkbox
            style={this.styles.filterCheckbox}
            label='Selected'
            checked={this.state.filterSelected}
            onCheck={this.toggleSelectedFilter}
          />
          <TextField
            inputStyle={this.styles.filterInput}
            hintText='Filter'
            onChange={this.updateFilterText}
          />
        </div>
        <GridList
          cellHeight={180}
          style={this.styles.gridList}
        >
          <Subheader>Week {userWeek.week}</Subheader>
        {tiles}
        </GridList>
      </div>
    )
  }
}

export default PickListView