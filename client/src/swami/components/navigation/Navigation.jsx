import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'

import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import {Redirect} from 'react-router'

import {grey300} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import {connect} from 'react-redux'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false, path: ''}
  }

  logout = ()=> {
    window.localStorage.removeItem('auth-token')
    //TODO: navigate to login
  }

  handleToggle = ()=> {
    this.setState({open: !this.state.open})
    return true
  }

  go = (path) => {
    return () => {
      const newState = {
        ...this.state,
        open: false,
        path: path
      }
      this.setState(newState)
    }
  }

  styles = {
    navHeader: {
      backgroundColor: grey300,
      textAlign: 'left'
    },

    menuItemStyle: {
      textAlign: 'left'
    },

    iconStyle: {
      verticalAlign: 'middle',
      marginRight: '5px'
    },

    userInfo: {
      float: 'right',
      fontSize: 12
    },

    headerBar: {
      width: '100%'
    },

    titleText: {
      float: 'left'
    }
  }

  render() {
    let redirect = (<div/>)
    const {path, loggedInUser} = this.props

    if(path !== this.state.path && this.state.path !== '') {
      switch (this.state.path) {
        case '/teams':
          redirect = (<Redirect to='/teams'/>)
          break

        case '/weeks':
          redirect = (<Redirect to='/weeks/current'/>)
          break

        default:
          redirect = (<Redirect to={this.state.path}/>)
          break
      }
    }

    let userNode = loggedInUser ?
      <span style={this.styles.userInfo}>{loggedInUser.firstName} {loggedInUser.lastName}</span> :
      <span style={this.styles.userInfo}>Log in</span>

    const title = (
      <div style={this.styles.headerBar}><span style={this.styles.titleText}>eSwami</span> {userNode}</div>
    )

    return (
      <div>
        <AppBar
          onLeftIconButtonClick={this.handleToggle}
          title={title}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" onClick={this.logout}/>
            </IconMenu>
          }
        />
        <Drawer open={this.state.open}>
          <div style={this.styles.navHeader} onClick={this.handleToggle}>
            <IconButton>
              <FontIcon className="material-icons">cancel</FontIcon>
            </IconButton>
          </div>
          <div>
            <Paper style={this.paperStyle}>
              <Menu>
                  <MenuItem onClick={this.go('/teams')} style={this.styles.menuItemStyle}>
                    <FontIcon className="material-icons" style={this.styles.iconStyle}>view_list</FontIcon>
                    Teams
                  </MenuItem>
                <MenuItem onClick={this.go('/picks')} style={this.styles.menuItemStyle}>
                  <FontIcon className="material-icons" style={this.styles.iconStyle}>error_outline</FontIcon>
                  Games
                </MenuItem>
                <Divider />
                <MenuItem style={this.styles.menuItemStyle} onClick={this.go('/weeks')}>
                  <FontIcon className="material-icons" style={this.styles.iconStyle}>event_note</FontIcon>
                  Edit Week
                </MenuItem>
                <MenuItem style={this.styles.menuItemStyle} onClick={this.handleToggle}>
                <FontIcon className="material-icons" style={this.styles.iconStyle}>edit</FontIcon>
                  Edit Picks
                </MenuItem>
                <Divider />

                <MenuItem style={this.styles.menuItemStyle} onClick={this.handleToggle}>
                  <FontIcon className="material-icons" style={this.styles.iconStyle}>person</FontIcon>
                  My Profile
                </MenuItem>
                <Divider />
                <MenuItem style={this.styles.menuItemStyle} onClick={this.go('/admin')}>
                  <FontIcon className="material-icons" style={this.styles.iconStyle}>build</FontIcon>
                  Admin
                </MenuItem>

              </Menu>
            </Paper>
          </div>
        </Drawer>
        {redirect}
      </div>
    )
  }
}

Navigation = connect(
  (state) => {
    return {
      loggedInUser: state.swamiApp.rootDataStore.loggedInUser
    }
  },
  () => {return {}}
)(Navigation)

export default Navigation